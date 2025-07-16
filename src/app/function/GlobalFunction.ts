export function openPopup(url: string, title: string): void {
  window.open(
    url,
    title,
    'width=1000,height=700,left=200,top=100,resizable=yes,scrollbars=yes'
  );
}

export function convertToAsianFormat(value: number | string): string {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  if (isNaN(value)) {
    return "Invalid number";
  }
  if (value === 0) {
    return "0";
  }

  const sign = value >= 0 ? "+" : "-";
  const absValue = Math.abs(value);
  const remainder = absValue % 1;
  const floor = Math.floor(absValue);

  const format = (num: number) =>
    Number.isInteger(num) ? `${num}` : num.toFixed(1);

  let result = "";

  if (remainder === 0) {
    result = format(absValue); // e.g. 1.0 → "1"
  } else if (Math.abs(remainder - 0.25) < 0.001) {
    result = `${format(floor)}/${format(floor + 0.5)}`; // 0.25 → "0/0.5"
  } else if (Math.abs(remainder - 0.75) < 0.001) {
    result = `${format(floor + 0.5)}/${format(floor + 1)}`; // 0.75 → "0.5/1"
  } else {
    result = format(absValue); // 0.5, 1.5 → "0.5", "1.5"
  }

  return sign + result;
}
