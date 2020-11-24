// yyyy-mm-dd to dd-mm-yyyy
export const dateFormat = (date: string) => {
  let p = date.split(/\D/g);
  return [p[2], p[1], p[0]].join('-');
};
// dd-mm-yyyy to yyyy-mm-dd
export const reverseDateFormat = (date: string) => {
  return date.split('-').reverse().join('-');
};
