export function ensureTime(value) {
  if (typeof value === 'string') {
    return parseTimeString(value);
  }
  return new Date(value);
}

export function parseTimeString(string) {
  const time = new Date();
  if (string !== '') {
    // Matches strings like: hh:mm
    const hours = string.match(/([\d]{2}):([\d]{2})/);
    time.setHours(hours[1], hours[2]);
  }
  return time;
}

export function getEarliestDate(...dates) {
  return new Date(Math.min.apply(null, dates));
}

export function combineDateTime(date, time) {
  const newDate = new Date(date);
  newDate.setHours(time.getHours(), time.getMinutes());
  return newDate;
}
