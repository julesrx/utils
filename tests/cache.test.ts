import { beforeEach, describe, expect, test, vi } from 'vitest';
import memory from 'unstorage/drivers/memory';

import { createCacheStorage, type CacheStorage } from '../src/cache';

describe('cache', () => {
    let cache: CacheStorage;
    beforeEach(() => {
        cache = createCacheStorage({ driver: memory() });
    });

    test('get and set cache item', async () => {
        const value = 'this is my value';
        await cache.set('some id', value);

        const cached = await cache.get('some id');
        expect(cached).toBe(value);
    });

    test('set cache item with expiration', async () => {
        const key = 'my cached value with expiration';

        vi.setSystemTime(new Date(2023, 1, 4, 15, 46, 17));

        const value = 'this is my value';
        await cache.set(key, value, 30);

        let cached = await cache.get(key);
        expect(cached).toBe(value);

        vi.setSystemTime(new Date(2023, 1, 4, 15, 46, 27));

        cached = await cache.get(key);
        expect(cached).toBe(value);

        vi.setSystemTime(new Date(2023, 1, 4, 15, 46, 56));

        cached = await cache.get(key);
        expect(cached).toBeNull();
    });

    test('get cache item and set if not exists', async () => {
        const key = 'my key';
        let count = 0;
        const getValue = () => {
            count++;
            return 'this is my value';
        };

        let cached = await cache.gset(key, () => getValue());
        expect(cached).toBe('this is my value');
        expect(count).toBe(1);

        cached = await cache.gset(key, () => getValue());
        expect(cached).toBe('this is my value');
        expect(count).toBe(1);
    });
});
