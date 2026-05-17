import assert from 'node:assert/strict';
import test from 'node:test';
import { getCountdownState } from '../src/lib/countdown.ts';

test('returns remaining countdown parts before the campaign ends', () => {
  const state = getCountdownState(
    '2026-05-31T23:59:59+08:00',
    new Date('2026-05-30T23:59:58+08:00'),
  );

  assert.equal(state.expired, false);
  assert.deepEqual(state.parts, {
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 1,
  });
});

test('marks the countdown expired after the campaign end time', () => {
  const state = getCountdownState(
    '2026-05-31T23:59:59+08:00',
    new Date('2026-06-01T00:00:00+08:00'),
  );

  assert.equal(state.expired, true);
  assert.deepEqual(state.parts, {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
});
