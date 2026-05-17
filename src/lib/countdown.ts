export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownState {
  expired: boolean;
  parts: CountdownParts;
}

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

const EMPTY_PARTS: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function getCountdownState(endAt: string, now: Date = new Date()): CountdownState {
  const endTime = new Date(endAt).getTime();
  const currentTime = now.getTime();
  const remainingMs = endTime - currentTime;

  if (!Number.isFinite(endTime) || remainingMs <= 0) {
    return {
      expired: true,
      parts: { ...EMPTY_PARTS },
    };
  }

  const days = Math.floor(remainingMs / MS_PER_DAY);
  const hours = Math.floor((remainingMs % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((remainingMs % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((remainingMs % MS_PER_MINUTE) / MS_PER_SECOND);

  return {
    expired: false,
    parts: {
      days,
      hours,
      minutes,
      seconds,
    },
  };
}
