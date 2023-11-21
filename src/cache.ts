import { createStorage, type Driver } from 'unstorage';
import ibb from 'unstorage/drivers/indexedb';

interface CacheItem<T> {
    value: T;
    expiration?: number;
}

interface CacheStorageOptions {
    driver?: Driver;
    base?: string;
}

export interface CacheStorage {
    get: <T>(id: string) => Promise<T | null>;
    set: <T>(id: string, value: T, secondsExpiration?: number) => Promise<void>;
    gset: <T>(id: string, getter: () => T | Promise<T>, secondsExpiration?: number) => Promise<T>;
}

export const createCacheStorage = ({
    driver,
    base = 'cache',
}: CacheStorageOptions = {}): CacheStorage => {
    const storage = createStorage({ driver: driver ?? ibb({ base }) });

    const get = async <T>(id: string) => {
        const item = await storage.getItem<CacheItem<T>>(id);
        if (!item) return null;

        if (typeof item.expiration === 'number' && item.expiration <= Date.now()) {
            await storage.removeItem(id);
            return null;
        }

        return item.value;
    };

    const set = async <T>(id: string, value: T, secondsExpiration?: number) => {
        secondsExpiration = secondsExpiration ?? 1800; // 30mins

        const expiration = Date.now() + secondsExpiration * 1000;

        const item: CacheItem<T> = { value, expiration };
        await storage.setItem(id, item);
    };

    const gset = async <T>(
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
