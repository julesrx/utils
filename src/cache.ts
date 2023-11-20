import { createStorage, type StorageValue } from 'unstorage';
import ibb from 'unstorage/drivers/indexedb';

interface CacheItem<T> {
    value: T;
    expiration?: number;
}

export const createCacheStorage = (base: string = 'cache') => {
    const storage = createStorage({ driver: ibb({ base }) });

    const get = async <T>(id: string) => {
        const item = await storage.getItem<CacheItem<T>>(id);
        if (!item) return null;

        if (item.expiration && item.expiration <= Date.now()) {
            await storage.removeItem(id);
            return null;
        }

        return item.value;
    };

    const set = async <T>(id: string, value: T, secondsExpiration?: number) => {
        secondsExpiration = secondsExpiration ?? 60 * 30;

        const now = Date.now();
        const expiration = now + secondsExpiration * 1000;

        const item: CacheItem<T> = { value, expiration };
        await storage.setItem(id, item);
    };

    const gset = async <T extends StorageValue>(
        id: string,
        getter: () => T | Promise<T>,
        secondsExpiration?: number
    ) => {
        const cached = await get<T>(id);
        if (cached) return cached;

        const res = await getter();

        await set(id, res, secondsExpiration);
        return res;
    };

    return { get, set, gset };
};
