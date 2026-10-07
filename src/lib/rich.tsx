import { Fragment, type ReactNode } from "react";

/**
 * Renders text with *italic* segments into React nodes.
 * Used for the serif display headings.
 */
export function rich(text: string): ReactNode[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <em key={index} className="italic">
          {part.slice(1, -1)}
        </em>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    );
}
