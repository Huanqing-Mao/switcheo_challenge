export function getExchangedValue(data, amount, from, to) {
  const fromIndex = data.findIndex((item) => item.currency === from);
  const toIndex = data.findIndex((item) => item.currency === to);
  const rate = data[fromIndex].price / data[toIndex].price;
  // console.log(amount);
  return amount * rate;
}
