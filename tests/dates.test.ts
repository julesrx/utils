import { formatTimeAgo } from '../src/dates';
import { expect, test, vi } from 'vitest';

const timeAgo = (date: Date) => formatTimeAgo(date, 'en-US');

test('format seconds', () => {
    var now = new Date(2023, 11, 16, 12, 34, 16);
    var then = new Date(2023, 11, 16, 12, 34, 10);

    vi.setSystemTime(now);

    expect(timeAgo(then)).toBe('6 seconds ago');
});

test('format minutes', () => {
    var now = new Date(2023, 11, 16, 12, 49);
    var then = new Date(2023, 11, 16, 12, 34);

    vi.setSystemTime(now);

    expect(timeAgo(then)).toBe('15 minutes ago');
});

test('format hours', () => {
    var now = new Date(2023, 11, 16, 19);
    var then = new Date(2023, 11, 16, 12);

    vi.setSystemTime(now);

    expect(timeAgo(then)).toBe('7 hours ago');
});

test('format days', () => {
    var now = new Date(2023, 11, 16);
    var then = new Date(2023, 11, 13);

    vi.setSystemTime(now);

    expect(timeAgo(then)).toBe('3 days ago');
});

test('format weeks', () => {
    var now = new Date(2023, 11, 27);
    var then = new Date(2023, 11, 13);

    vi.setSystemTime(now);

    expect(timeAgo(then)).toBe('2 weeks ago');
});

test('format months', () => {
    var now = new Date(2024, 3);
    var then = new Date(2023, 11);

    vi.setSystemTime(now);

    expect(timeAgo(then)).toBe('4 months ago');
});

test('format years', () => {
    var now = new Date(2027, 3);
    var then = new Date(2023, 11);

    vi.setSystemTime(now);

    expect(timeAgo(then)).toBe('3 years ago');
});
