export const diffDays = (d1 : string, d2 : string )  => {
  let dt1 = new Date(d1);
  let dt2 = new Date(d2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}
