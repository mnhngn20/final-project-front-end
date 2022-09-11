import { QUIZ_SIDE_BAR_SECTIONS, Section } from './constant';

export const sum = (a: number, b: number) => a + b;

export const zeroPad = (num: number, places = 2) =>
  String(num).padStart(places, '0');

export const findSection = (key: string, sections: Section[]) =>
  sections?.find(section => section?.id === key);

export const getDefaultActiveKey = (sectionIds?: string) => {
  const ids = sectionIds?.split('&');

  const returnFoundKey: string[] = [];
  let returnFoundSection: Section | undefined;

  ids?.forEach(id => {
    if (!returnFoundSection) {
      const foundSection = findSection(id, QUIZ_SIDE_BAR_SECTIONS);
      if (!foundSection) {
        returnFoundSection = QUIZ_SIDE_BAR_SECTIONS?.[0];
        returnFoundKey.push(QUIZ_SIDE_BAR_SECTIONS?.[0]?.id);
      } else {
        returnFoundSection = foundSection;
        returnFoundKey.push(foundSection?.id);
      }
    } else if (returnFoundSection?.children) {
      const foundSection = findSection(id, returnFoundSection?.children);
      if (foundSection) {
        returnFoundSection = foundSection;
        returnFoundKey.push(foundSection?.id);
      }
    }
  });

  return {
    returnFoundKey,
    returnFoundSection: returnFoundSection ?? QUIZ_SIDE_BAR_SECTIONS?.[0],
  };
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
