import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  Code,
  Columns3,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  Rows3,
  Strikethrough,
  Table as TableIcon,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
  Youtube,
} from "lucide-react";
import { EDITOR_FONTS } from "../../lib/blog";
import type { ImageAlign } from "./extensions";

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "40px", "48px", "56px", "64px"];
const LINE_HEIGHTS = ["1", "1.25", "1.5", "1.8", "2", "2.5"];
const TEXT_COLORS = [
  "#0d0d0d", "#334155", "#64748b", "#94a3b8", "#ffffff",
  "#2a6ff3", "#1e40af", "#7c3aed", "#db2777", "#dc2626",
  "#ea580c", "#ca8a04", "#16a34a", "#0d9488", "#0891b2",
];
const HIGHLIGHT_COLORS = ["#fef08a", "#bbf7d0", "#bfdbfe", "#e9d5ff", "#fbcfe8", "#fed7aa", "#e2e8f0"];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // keep editor selection
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`h-8 min-w-8 px-1.5 inline-flex items-center justify-center rounded-md text-sm transition-colors disabled:opacity-30 ${
        active ? "bg-[#2a6ff3] text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="w-px h-6 bg-gray-200 mx-1 shrink-0" />;

function Select({
  value,
  onChange,
  title,
  className = "",
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      title={title}
      aria-label={title}
      className={`h-8 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-700 hover:border-gray-300 focus:outline-none focus:border-[#2a6ff3] ${className}`}
    >
      {children}
    </select>
  );
}

function Popover({
  trigger,
  title,
  active,
  children,
}: {
  trigger: React.ReactNode;
  title: string;
  active?: boolean;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <Btn onClick={() => setOpen((o) => !o)} active={active || open} title={title}>
        {trigger}
      </Btn>
      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-3 min-w-[220px]">
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function ColorGrid({
  colors,
  onPick,
  onClear,
  clearLabel,
}: {
  colors: string[];
  onPick: (c: string) => void;
  onClear: () => void;
  clearLabel: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(c)}
            className="w-8 h-8 rounded-md border border-gray-200 hover:scale-110 transition-transform"
            style={{ background: c }}
            title={c}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
          <input type="color" onChange={(e) => onPick(e.target.value)} className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer" />
          Custom
        </label>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onClear}
          className="ml-auto text-xs font-medium text-gray-500 hover:text-red-600"
        >
          {clearLabel}
        </button>
      </div>
    </div>
  );
}

function UrlForm({
  initial = "",
  placeholder,
  submitLabel,
  onSubmit,
}: {
  initial?: string;
  placeholder: string;
  submitLabel: string;
  onSubmit: (url: string) => void;
}) {
  const [value, setValue] = useState(initial);
  return (
    <form
      className="flex gap-2 w-[320px]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value.trim());
      }}
    >
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#2a6ff3]"
      />
      <button type="submit" className="px-3 py-2 rounded-lg bg-[#2a6ff3] text-white text-sm font-semibold">
        {submitLabel}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

export function Toolbar({ editor, onInsertImage, onReplaceImage }: {
  editor: Editor;
  onInsertImage: () => void;
  onReplaceImage: () => void;
}) {
  const blockType = editor.isActive("heading", { level: 1 })
    ? "h1"
    : editor.isActive("heading", { level: 2 })
      ? "h2"
      : editor.isActive("heading", { level: 3 })
        ? "h3"
        : editor.isActive("heading", { level: 4 })
          ? "h4"
          : editor.isActive("codeBlock")
            ? "code"
            : "p";

  const setBlockType = (v: string) => {
    const chain = editor.chain().focus();
    if (v === "p") chain.setParagraph().run();
    else if (v === "code") chain.toggleCodeBlock().run();
    else chain.setHeading({ level: Number(v.slice(1)) as 1 | 2 | 3 | 4 }).run();
  };

  const textStyle = editor.getAttributes("textStyle");
  const fontFamily = (textStyle.fontFamily as string) ?? "";
  const fontSize = (textStyle.fontSize as string) ?? "";
  const lineHeight =
    (editor.getAttributes("paragraph").lineHeight as string) ?? (editor.getAttributes("heading").lineHeight as string) ?? "";
  const currentColor = (textStyle.color as string) || "#0d0d0d";

  const imageSelected = editor.isActive("image");
  const tableSelected = editor.isActive("table");
  const linkActive = editor.isActive("link");

  return (
    <div className="sticky top-[128px] z-20 bg-white/95 backdrop-blur border border-gray-200 rounded-2xl shadow-sm">
      <div className="flex flex-wrap items-center gap-0.5 p-2">
        <Btn title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo2 className="w-4 h-4" />
        </Btn>
        <Btn title="Redo (Ctrl+Shift+Z)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo2 className="w-4 h-4" />
        </Btn>
        <Divider />

        <Select value={blockType} onChange={setBlockType} title="Text style" className="w-[130px]">
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="code">Code block</option>
        </Select>

        <Select
          value={fontFamily}
          title="Font"
          className="w-[140px] ml-1"
          onChange={(v) =>
            v ? editor.chain().focus().setFontFamily(v).run() : editor.chain().focus().unsetFontFamily().run()
          }
        >
          {EDITOR_FONTS.map((f) => (
            <option key={f.label} value={f.value} style={{ fontFamily: f.value || "Inter" }}>
              {f.label}
            </option>
          ))}
        </Select>

        <Select
          value={fontSize}
          title="Font size"
          className="w-[84px] ml-1"
          onChange={(v) => (v ? editor.chain().focus().setFontSize(v).run() : editor.chain().focus().unsetFontSize().run())}
        >
          <option value="">Size</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s.replace("px", "")}
            </option>
          ))}
        </Select>

        <Select
          value={lineHeight}
          title="Line spacing"
          className="w-[92px] ml-1"
          onChange={(v) => (v ? editor.chain().focus().setLineHeight(v).run() : editor.chain().focus().unsetLineHeight().run())}
        >
          <option value="">Spacing</option>
          {LINE_HEIGHTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <Divider />

        <Btn title="Bold (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </Btn>
        <Btn title="Italic (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </Btn>
        <Btn title="Underline (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="w-4 h-4" />
        </Btn>
        <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="w-4 h-4" />
        </Btn>
        <Btn title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code className="w-4 h-4" />
        </Btn>

        <Popover
          title="Text colour"
          trigger={
            <span className="flex flex-col items-center">
              <Baseline className="w-4 h-4" />
              <span className="w-4 h-1 rounded-sm -mt-0.5" style={{ background: currentColor }} />
            </span>
          }
        >
          {(close) => (
            <ColorGrid
              colors={TEXT_COLORS}
              clearLabel="Default colour"
              onPick={(c) => editor.chain().focus().setColor(c).run()}
              onClear={() => {
                editor.chain().focus().unsetColor().run();
                close();
              }}
            />
          )}
        </Popover>

        <Popover title="Highlight" active={editor.isActive("highlight")} trigger={<Highlighter className="w-4 h-4" />}>
          {(close) => (
            <ColorGrid
              colors={HIGHLIGHT_COLORS}
              clearLabel="No highlight"
              onPick={(c) => editor.chain().focus().setHighlight({ color: c }).run()}
              onClear={() => {
                editor.chain().focus().unsetHighlight().run();
                close();
              }}
            />
          )}
        </Popover>
        <Divider />

        <Btn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="w-4 h-4" />
        </Btn>
        <Btn title="Align centre" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="w-4 h-4" />
        </Btn>
        <Btn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="w-4 h-4" />
        </Btn>
        <Btn title="Justify" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <AlignJustify className="w-4 h-4" />
        </Btn>
        <Divider />

        <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </Btn>
        <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </Btn>
        <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-4 h-4" />
        </Btn>
        <Btn title="Divider line" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="w-4 h-4" />
        </Btn>
        <Divider />

        <Popover title="Link" active={linkActive} trigger={<Link2 className="w-4 h-4" />}>
          {(close) => (
            <UrlForm
              initial={(editor.getAttributes("link").href as string) ?? ""}
              placeholder="https://example.com"
              submitLabel="Apply"
              onSubmit={(href) => {
                if (!href) editor.chain().focus().extendMarkRange("link").unsetLink().run();
                else {
                  const safe = /^(https?:|mailto:|tel:|\/|#)/i.test(href) ? href : `https://${href}`;
                  editor.chain().focus().extendMarkRange("link").setLink({ href: safe }).run();
                }
                close();
              }}
            />
          )}
        </Popover>
        {linkActive && (
          <Btn title="Remove link" onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}>
            <Unlink className="w-4 h-4" />
          </Btn>
        )}
        <Btn title="Insert image" onClick={onInsertImage}>
          <ImagePlus className="w-4 h-4" />
        </Btn>
        <Btn
          title="Insert table"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <TableIcon className="w-4 h-4" />
        </Btn>
        <Popover title="Embed YouTube video" trigger={<Youtube className="w-4 h-4" />}>
          {(close) => (
            <UrlForm
              placeholder="https://youtube.com/watch?v=…"
              submitLabel="Embed"
              onSubmit={(src) => {
                if (src) editor.chain().focus().setYoutubeVideo({ src }).run();
                close();
              }}
            />
          )}
        </Popover>
        <Divider />
        <Btn title="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          <RemoveFormatting className="w-4 h-4" />
        </Btn>
      </div>

      {imageSelected && <ImageSettings editor={editor} onReplace={onReplaceImage} />}
      {tableSelected && !imageSelected && <TableSettings editor={editor} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Context panels
// ---------------------------------------------------------------------------

const ALIGN_OPTIONS: { value: ImageAlign; label: string }[] = [
  { value: "left", label: "Left" },
  { value: "center", label: "Centre" },
  { value: "right", label: "Right" },
  { value: "float-left", label: "Wrap text right" },
  { value: "float-right", label: "Wrap text left" },
];

function ImageSettings({ editor, onReplace }: { editor: Editor; onReplace: () => void }) {
  const attrs = editor.getAttributes("image") as { width?: string; align?: ImageAlign; alt?: string };
  const widthNum = parseInt(attrs.width ?? "100", 10) || 100;
  // No focus() here: refocusing the editor mid-drag would interrupt the width slider.
  const set = (patch: Record<string, unknown>) => editor.chain().updateAttributes("image", patch).run();

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2 border-t border-gray-100 bg-[#f5f8ff] rounded-b-2xl text-sm">
      <span className="font-semibold text-[#2a6ff3]">Image</span>

      <div className="flex items-center gap-2">
        <span className="text-gray-500">Size</span>
        {[25, 33, 50, 75, 100].map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => set({ width: `${w}%` })}
            className={`px-2 h-7 rounded-md text-xs font-medium ${
              widthNum === w ? "bg-[#2a6ff3] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#2a6ff3]"
            }`}
          >
            {w}%
          </button>
        ))}
        <input
          type="range"
          min={10}
          max={100}
          value={widthNum}
          onChange={(e) => set({ width: `${e.target.value}%` })}
          className="w-24 accent-[#2a6ff3]"
          aria-label="Image width"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-500">Position</span>
        <select
          value={attrs.align ?? "center"}
          onChange={(e) => set({ align: e.target.value })}
          className="h-7 rounded-md border border-gray-200 bg-white px-2 text-xs"
        >
          {ALIGN_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
        <span className="text-gray-500">Alt</span>
        <input
          key={attrs.alt ?? ""}
          defaultValue={attrs.alt ?? ""}
          onBlur={(e) => set({ alt: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
          placeholder="Describe the image"
          className="flex-1 h-7 px-2 rounded-md border border-gray-200 text-xs focus:outline-none focus:border-[#2a6ff3]"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <button type="button" onClick={onReplace} className="px-2.5 h-7 rounded-md bg-white border border-gray-200 text-xs font-medium hover:border-[#2a6ff3]">
          Replace
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteSelection().run()}
          className="px-2.5 h-7 rounded-md bg-white border border-gray-200 text-xs font-medium text-red-600 hover:border-red-400 inline-flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Remove
        </button>
      </div>
      <span className="basis-full text-xs text-gray-400">Tip: drag the blue handles to resize, or drag the image to move it.</span>
    </div>
  );
}

function TableSettings({ editor }: { editor: Editor }) {
  const cmd = (fn: (c: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>) => fn(editor.chain().focus()).run();
  const btn = "px-2.5 h-7 rounded-md bg-white border border-gray-200 text-xs font-medium hover:border-[#2a6ff3]";
  return (
    <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-t border-gray-100 bg-[#f5f8ff] rounded-b-2xl text-sm">
      <span className="font-semibold text-[#2a6ff3]">Table</span>
      <Rows3 className="w-4 h-4 text-gray-400" />
      <button type="button" className={btn} onClick={() => cmd((c) => c.addRowBefore())}>+ Row above</button>
      <button type="button" className={btn} onClick={() => cmd((c) => c.addRowAfter())}>+ Row below</button>
      <button type="button" className={btn} onClick={() => cmd((c) => c.deleteRow())}>Delete row</button>
      <Columns3 className="w-4 h-4 text-gray-400 ml-2" />
      <button type="button" className={btn} onClick={() => cmd((c) => c.addColumnBefore())}>+ Column left</button>
      <button type="button" className={btn} onClick={() => cmd((c) => c.addColumnAfter())}>+ Column right</button>
      <button type="button" className={btn} onClick={() => cmd((c) => c.deleteColumn())}>Delete column</button>
      <button type="button" className={btn} onClick={() => cmd((c) => c.toggleHeaderRow())}>Toggle header</button>
      <button
        type="button"
        className="ml-auto px-2.5 h-7 rounded-md bg-white border border-gray-200 text-xs font-medium text-red-600 hover:border-red-400"
        onClick={() => cmd((c) => c.deleteTable())}
      >
        Delete table
      </button>
    </div>
  );
}
