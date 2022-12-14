import { User } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import { InMemoryCache, makeVar } from '@apollo/client';

export const userVar = makeVar<DeepPartial<User>>({});
export const totalUnreadNotification = makeVar<number>(0);

export const cache: InMemoryCache = new InMemoryCache();
