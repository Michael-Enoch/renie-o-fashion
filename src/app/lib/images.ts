import type { SyntheticEvent } from "react";

const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDYwMCA4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJJbWFnZSB1bmF2YWlsYWJsZSI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNGMEVERTgiLz48cmVjdCB4PSIxMDAiIHk9IjE0MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI1MjAiIHJ4PSIxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzlBOTZFIiBzdHJva2Utd2lkdGg9IjYiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTE1MCA1ODAgMjYwIDQyMGw4MCAxMDBsNjAtNzAgNTAxMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0M5QTk2RSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIG9wYWNpdHk9Ii41Ii8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMjYwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzlBOTZFIiBzdHJva2Utd2lkdGg9IjYiIG9wYWNpdHk9Ii41Ii8+PHRleHQgeD0iMzAwIiB5PSI3MTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3QTc1NzAiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIyNCI+UmVuaWUgTyBGYXNoaW9uPC90ZXh0Pjwvc3ZnPg==";

export function imageUrl(src: string, params: string): string {
  if (src.startsWith("data:")) return src;
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}${params}`;
}

export function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = FALLBACK_IMAGE;
}
