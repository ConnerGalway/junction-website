import { SHOW_PLACEHOLDERS } from "./flags";

/** True for a placeholder label like "[ $ ]", "[ x HRS ]" or "[ Month Year ]". */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !!value && /^\s*\[.*\]\s*$/.test(value);
}

/**
 * The value, or undefined when it's a placeholder label and SHOW_PLACEHOLDERS
 * is off. Use it where the rest of the element still works without the label.
 */
export function shown(value: string | undefined): string | undefined {
  return isPlaceholder(value) && !SHOW_PLACEHOLDERS ? undefined : value;
}
