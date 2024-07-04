import { createTimeAgoFormatter, createDurationFormatter } from '../src/dates';
import { describe, expect, test, vi } from 'vitest';

const locale = 'en-US';

describe('time ago formatter', () => {
  const timeAgoFormatter = createTimeAgoFormatter(locale);

  test('format seconds ago', () => {
    var now = new Date(2023, 11, 16, 12, 34, 16);
    var then = new Date(2023, 11, 16, 12, 34, 10);

    vi.setSystemTime(now);

    expect(timeAgoFormatter.format(then)).toBe('6 seconds ago');
  });

  test('format minutes ago', () => {
    var now = new Date(2023, 11, 16, 12, 49);
    var then = new Date(2023, 11, 16, 12, 34);

    vi.setSystemTime(now);

    expect(timeAgoFormatter.format(then)).toBe('15 minutes ago');
  });

  test('format hours ago', () => {
    var now = new Date(2023, 11, 16, 19);
    var then = new Date(2023, 11, 16, 12);

    vi.setSystemTime(now);

    expect(timeAgoFormatter.format(then)).toBe('7 hours ago');
  });

  test('format days ago', () => {
    var now = new Date(2023, 11, 16);
    var then = new Date(2023, 11, 13);

    vi.setSystemTime(now);

    expect(timeAgoFormatter.format(then)).toBe('3 days ago');
  });

  test('format weeks ago', () => {
    var now = new Date(2023, 11, 27);
    var then = new Date(2023, 11, 13);

    vi.setSystemTime(now);

    expect(timeAgoFormatter.format(then)).toBe('2 weeks ago');
  });

  test('format months ago', () => {
    var now = new Date(2024, 3);
    var then = new Date(2023, 11);

    vi.setSystemTime(now);

    expect(timeAgoFormatter.format(then)).toBe('4 months ago');
  });

  test('format years ago', () => {
    var now = new Date(2027, 3);
    var then = new Date(2023, 11);

    vi.setSystemTime(now);

    expect(timeAgoFormatter.format(then)).toBe('3 years ago');
  });
});

describe.concurrent('duration formatter', () => {
  const durationFormatter = createDurationFormatter(locale);
  const shortFormatter = createDurationFormatter(locale, {
    unitDisplay: 'short',
    listStyle: 'narrow'
  });
  const withMillisecondsFormatter = createDurationFormatter(locale, { showMilliseconds: true });

  test('format 1m', () => expect(durationFormatter.format(6e4)).toBe('1 minute'));

  test('format 1h40m', () => expect(durationFormatter.format(6e6)).toBe('1 hour and 40 minutes'));

  test('format 2h21m', () =>
    expect(durationFormatter.format(846e4)).toBe('2 hours and 21 minutes'));

  test('format 1d19h49s', () =>
    expect(durationFormatter.format(154849e3)).toBe('1 day, 19 hours, and 49 seconds'));

  test('format short 1h19m', () => expect(shortFormatter.format(846e4)).toBe('2 hr, 21 min'));

  test('format with milliseconds 5ms', () =>
    expect(withMillisecondsFormatter.format(5)).toBe('5 milliseconds'));
});
