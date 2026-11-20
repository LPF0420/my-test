/** 轻量类名拼接，避免为几个条件类引入 clsx 依赖 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
