import { DeepPartial } from '#/shared/utils/type';
import { InMemoryCache, makeVar } from '@apollo/client';

export const userVar = makeVar<DeepPartial<Record<string, string>>>({});

export const cache: InMemoryCache = new InMemoryCache();
