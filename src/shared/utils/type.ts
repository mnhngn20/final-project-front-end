import { TranslationKeys } from '#/generated/translationKeys';

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export interface NavItem {
  title: TranslationKeys;
  href?: string;
  activeHrefs: string[];
  subItems?: DeepPartial<NavItem>[];
  icon?: JSX.Element;
}

export enum Platform {
  Admin = 'admin',
  Client = 'client',
}

export type DeepPartial<T> = T extends Primitive
  ? T
  : { [P in keyof T]?: DeepPartial<T[P]> };

export type Dictionary<T> = Record<string, T>;
