export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall back to legacy copy
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const copied = document.execCommand("copy");
    document.body.removeChild(textArea);
    return copied;
  } catch {
    return false;
  }
}

export function showClipboardFeedback(message: string, type: "success" | "error" = "success") {
  const existing = document.getElementById("clipboard-feedback");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = "clipboard-feedback";
  popup.textContent = message;
  popup.setAttribute("role", "status");
  popup.setAttribute("aria-live", "polite");

  Object.assign(popup.style, {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    zIndex: "9999",
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1px solid hsl(var(--border))`,
    background: type === "success" ? "hsl(var(--card))" : "hsl(var(--destructive) / 0.12)",
    color: "hsl(var(--foreground))",
    boxShadow: "0 12px 32px hsl(var(--foreground) / 0.08)",
    fontSize: "13px",
    fontWeight: "600",
    opacity: "0",
    transform: "translateY(6px)",
    transition: "opacity 180ms ease, transform 180ms ease",
    pointerEvents: "none",
  } as CSSStyleDeclaration);

  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    popup.style.opacity = "1";
    popup.style.transform = "translateY(0)";
  });

  window.setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.transform = "translateY(6px)";
    window.setTimeout(() => popup.remove(), 180);
  }, 2000);
}
