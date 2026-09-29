-- =====================================================================
-- ColdNerd Blog CMS
-- Run this whole file once in Supabase: Dashboard → SQL Editor → New query.
-- It is safe to re-run (every statement is idempotent).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. CMS managers: only users listed here can create/edit/delete posts
-- ---------------------------------------------------------------------
create table if not exists public.cms_managers (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.cms_managers enable row level security;

drop policy if exists "Managers can see their own row" on public.cms_managers;
create policy "Managers can see their own row"
  on public.cms_managers for select
  to authenticated
  using (user_id = auth.uid());

-- Helper used by every policy below. SECURITY DEFINER so it can read
-- cms_managers regardless of the caller's own RLS visibility.
create or replace function public.is_cms_manager()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.cms_managers where user_id = auth.uid()
  );
$$;

grant execute on function public.is_cms_manager() to anon, authenticated;

-- ---------------------------------------------------------------------
-- 2. Blog posts
-- ---------------------------------------------------------------------
create table if not exists public.blog_posts (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique
                    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title             text not null,
  excerpt           text not null default '',
  content           text not null default '',          -- rich HTML from the editor
  cover_image_url   text,
  category          text not null default 'General',
  author_name       text not null default 'ColdNerd Team',
  read_time_minutes integer not null default 1,
  status            text not null default 'draft'
                    check (status in ('draft', 'published')),
  featured          boolean not null default false,    -- shown in "Learn, Grow & Automate" on the home page
  position          integer not null default 0,        -- manual ordering (lower = first)
  seo_title         text,
  seo_description   text,
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  created_by        uuid default auth.uid() references auth.users (id) on delete set null
);

create index if not exists blog_posts_listing_idx
  on public.blog_posts (status, position, published_at desc);

-- Keep updated_at fresh and stamp published_at the first time a post goes live.
create or replace function public.blog_posts_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists blog_posts_before_write on public.blog_posts;
create trigger blog_posts_before_write
  before insert or update on public.blog_posts
  for each row execute function public.blog_posts_before_write();

alter table public.blog_posts enable row level security;

grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;

-- Visitors see published posts whose publish date has arrived
-- (so a future published_at works as scheduled publishing).
-- Managers see everything, including drafts.
drop policy if exists "Public can read published posts" on public.blog_posts;
create policy "Public can read published posts"
  on public.blog_posts for select
  to anon, authenticated
  using (
    (status = 'published' and published_at <= now())
    or public.is_cms_manager()
  );

drop policy if exists "Managers can insert posts" on public.blog_posts;
create policy "Managers can insert posts"
  on public.blog_posts for insert
  to authenticated
  with check (public.is_cms_manager());

drop policy if exists "Managers can update posts" on public.blog_posts;
create policy "Managers can update posts"
  on public.blog_posts for update
  to authenticated
  using (public.is_cms_manager())
  with check (public.is_cms_manager());

drop policy if exists "Managers can delete posts" on public.blog_posts;
create policy "Managers can delete posts"
  on public.blog_posts for delete
  to authenticated
  using (public.is_cms_manager());

-- ---------------------------------------------------------------------
-- 3. Image storage (public bucket: anyone can view, only managers upload)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  10485760, -- 10 MB
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Listing files (for the CMS media library) is manager-only.
-- Viewing an image by its public URL needs no policy because the bucket is public.
drop policy if exists "Managers can list blog images" on storage.objects;
create policy "Managers can list blog images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'blog-images' and public.is_cms_manager());

drop policy if exists "Managers can upload blog images" on storage.objects;
create policy "Managers can upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images' and public.is_cms_manager());

drop policy if exists "Managers can update blog images" on storage.objects;
create policy "Managers can update blog images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images' and public.is_cms_manager());

drop policy if exists "Managers can delete blog images" on storage.objects;
create policy "Managers can delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and public.is_cms_manager());

