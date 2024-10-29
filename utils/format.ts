/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式化模板，默认：YYYY-MM-DD HH:mm:ss
 */
export const formatDate = (
  date: Date | number | string,
  format = "YYYY-MM-DD HH:mm:ss"
): string => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};
