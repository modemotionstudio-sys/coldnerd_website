import DOMPurify from "dompurify";

// Separate from blog.ts so DOMPurify is only downloaded with the article page, not the homepage.

const ALLOWED_IFRAME_SRC = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com)\/embed\//;

DOMPurify.addHook("uponSanitizeElement", (node, data) => {
  if (data.tagName === "iframe") {
    const src = (node as Element).getAttribute?.("src") ?? "";
    if (!ALLOWED_IFRAME_SRC.test(src)) node.parentNode?.removeChild(node);
  }
});

/** Sanitises editor HTML before rendering it on the public site. Only YouTube iframes survive. */
export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["target", "rel", "allow", "allowfullscreen", "frameborder"],
  });
}
