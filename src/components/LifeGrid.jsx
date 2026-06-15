import { useCallback, useState } from "react";
import {
  addDays,
  formatISO,
  getBirthdayInYear,
  getWeekEvents,
  isFutureWeek,
} from "../lib/dates";
import WeekPopover from "./WeekPopover";

const WEEKS_PER_AGE_YEAR = 54;

function AgeLabel({ age, year }) {
  return (
    <div className="life-in-weeks-age border-secondary float-left text-truncate">
      {age} in {year}
    </div>
  );
}

function WeekBox({ id, weekStartDate, nextYearDate, eventData, isHovered, onHover, onLeave }) {
  const weekDate = formatISO(weekStartDate);
  const events = getWeekEvents(weekStartDate, nextYearDate, eventData);
  const eventsWithDesc = events.filter((event) => event.desc || event.image);
  const isFuture = isFutureWeek(weekStartDate);
  const hasEvents = events.length > 0;
  const isInteractive = eventsWithDesc.length > 0;

  function handleMouseEnter(event) {
    if (!isInteractive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    onHover({
      id,
      rect,
      events: eventsWithDesc,
    });
  }

  const className = [
    "week",
    "border-tertiary",
    "float-left",
    "text-truncate",
    isFuture ? "future-date" : "",
    isHovered && isInteractive ? "week--hovered" : "",
    isInteractive ? "week--has-events" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-date={weekDate}
      className={className}
      onMouseEnter={isInteractive ? handleMouseEnter : undefined}
      onMouseLeave={isInteractive ? onLeave : undefined}
    >
      {hasEvents && (
        <span className="week-label">
          {events.map((event, index) => {
            if (event.link) {
              return (
                <a
                  key={`${event.date}-${event.name}-${index}`}
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {index > 0 ? " " : ""}
                  {event.name}
                </a>
              );
            }

            return (
              <span key={`${event.date}-${event.name}-${index}`}>
                {index > 0 ? " " : ""}
                {event.name}
              </span>
            );
          })}
        </span>
      )}
    </div>
  );
}

export default function LifeGrid({ startDate, startYear, endYear, eventData }) {
  const [hover, setHover] = useState(null);

  const clearHover = useCallback(() => setHover(null), []);

  const blocks = [];

  for (let year = startYear; year <= endYear; year++) {
    const age = year - startYear;
    const thisYearDate = getBirthdayInYear(year, startDate);
    const nextYearDate = getBirthdayInYear(year + 1, startDate);

    blocks.push(<AgeLabel key={`age-${year}`} age={age} year={year} />);

    for (let week = 0; week <= WEEKS_PER_AGE_YEAR - 1; week++) {
      const weekStartDate = addDays(thisYearDate, week * 7);
      const id = `${year}-${week}`;

      blocks.push(
        <WeekBox
          key={id}
          id={id}
          weekStartDate={weekStartDate}
          nextYearDate={nextYearDate}
          eventData={eventData}
          isHovered={hover?.id === id}
          onHover={setHover}
          onLeave={clearHover}
        />
      );
    }
  }

  return (
    <section className="life-in-weeks">
      <div className="life-in-weeks-grid">{blocks}</div>
      <div className="life-in-weeks-clear" aria-hidden="true" />
      <WeekPopover
        anchor={hover?.rect ?? null}
        events={hover?.events ?? []}
      />
    </section>
  );
}
