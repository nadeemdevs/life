import yaml from "js-yaml";
import { parseISO } from "./dates";

import lifeInWeeksRaw from "../../content/life-in-weeks.yml?raw";

const START_DATE = "2002-05-07";
const END_YEAR = 2030;

export function loadConfig() {
  const startYear = parseISO(START_DATE).getFullYear();

  return {
    startDate: START_DATE,
    startYear,
    endYear: END_YEAR,
  };
}

export function loadLifeData() {
  try {
    return yaml.load(lifeInWeeksRaw) ?? {};
  } catch (err) {
    throw new Error(
      `Failed to parse content/life-in-weeks.yml: ${err.message}`,
      { cause: err }
    );
  }
}

export function countEvents(eventData) {
  return Object.values(eventData).reduce(
    (total, events) => total + events.length,
    0
  );
}
