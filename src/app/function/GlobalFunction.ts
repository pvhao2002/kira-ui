export function openPopup(url: string, title: string): void {
  window.open(
    url,
    title,
    'width=1000,height=700,left=200,top=100,resizable=yes,scrollbars=yes'
  );
}
