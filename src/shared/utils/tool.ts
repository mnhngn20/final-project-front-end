export const sum = (a: number, b: number) => a + b;

export const zeroPad = (num: number, places = 2) =>
  String(num).padStart(places, '0');

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const getPopupContainer = (
  node: HTMLElement | undefined,
  queries = ['.ant-modal', '.ant-drawer'],
) => {
  const parent = document.querySelector(
    queries?.find(e => document.querySelector(e)) as string,
  );
  if (node && parent?.contains(node)) return node?.parentNode as HTMLElement;
  return document.body;
};
