export const formatAmount = (price: string | number | undefined) => {
  if (price) {
    const str = price.toString().split(".");
    if (str[0].length >= 3) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (!str[1]) {
      str[1] = "00";
    }
    return str.join(".");
  }
};