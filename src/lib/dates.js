export function toDateString(value) {
  if (value instanceof Date) {
    return formatISO(value);
  }
  return value;
}

export function formatISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseISO(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDisplayDate(isoDate) {
  return parseISO(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getBirthdayInYear(year, startDate) {
  const birth = parseISO(startDate);
  return new Date(year, birth.getMonth(), birth.getDate());
}

export function getWeekEvents(weekStartDate, nextYearDate, eventData) {
  const events = [];

  for (let day = 0; day < 7; day++) {
    const specificDate = addDays(weekStartDate, day);
    if (specificDate < nextYearDate) {
      const key = formatISO(specificDate);
      const dayEvents = eventData[key];
      if (dayEvents) {
        for (const event of dayEvents) {
          events.push({ ...event, date: key });
        }
      }
    }
  }

  return events;
}

export function isFutureWeek(weekStartDate, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today < weekStartDate;
}
