import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useRef, useState } from "react";

/**
 * Editor view for images: click to select, drag the corner handles to resize,
 * drag the image itself to move it within the article.
 */
export function ImageView({ node, updateAttributes, selected, editor }: NodeViewProps) {
  const { src, alt, title, width, align } = node.attrs as {
    src: string;
    alt?: string;
    title?: string;
    width: string;
    align: string;
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [liveWidth, setLiveWidth] = useState<string | null>(null);

  const startResize = (e: React.PointerEvent, direction: 1 | -1) => {
    e.preventDefault();
    e.stopPropagation();
    const wrapper = wrapperRef.current;
    const column = editor.view.dom as HTMLElement;
    if (!wrapper) return;
    const columnWidth = column.clientWidth;
    const startX = e.clientX;
    const startWidth = wrapper.getBoundingClientRect().width;
    let pct = Math.round((startWidth / columnWidth) * 100);

    const onMove = (ev: PointerEvent) => {
      const next = startWidth + direction * (ev.clientX - startX);
      pct = Math.min(100, Math.max(10, Math.round((next / columnWidth) * 100)));
      setLiveWidth(`${pct}%`);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setLiveWidth(null);
      updateAttributes({ width: `${pct}%` });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const editable = editor.isEditable;

  return (
    <NodeViewWrapper
      ref={wrapperRef}
      className={`cn-image${selected ? " is-selected" : ""}`}
      data-align={align}
      style={{ width: liveWidth ?? width }}
      data-drag-handle
    >
      <img src={src} alt={alt ?? ""} title={title ?? undefined} draggable={false} />
      {editable && selected && (
        <>
          <span className="cn-image-handle left" onPointerDown={(e) => startResize(e, -1)} />
          <span className="cn-image-handle right" onPointerDown={(e) => startResize(e, 1)} />
          <span className="cn-image-badge">{liveWidth ?? width}</span>
        </>
      )}
    </NodeViewWrapper>
  );
}
