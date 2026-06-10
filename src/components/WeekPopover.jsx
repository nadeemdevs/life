import { useLayoutEffect, useRef, useState } from "react";
import { formatDisplayDate } from "../lib/dates";
import { getCategoryStyle } from "../lib/categories";

function PopoverEvent({ event }) {
  return (
    <article className="week-popover-event">
      <time className="week-popover-date">{formatDisplayDate(event.date)}</time>
      <h3 className="week-popover-name">
        {event.link ? (
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            {event.name}
          </a>
        ) : (
          event.name
        )}
      </h3>
      {event.desc && <p className="week-popover-desc">{event.desc}</p>}
    </article>
  );
}

export default function WeekPopover({ anchor, events }) {
  const popoverRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, placement: "above" });
  const { accent, tint } = getCategoryStyle(events[0]?.category);

  useLayoutEffect(() => {
    if (!anchor) return;

    const popoverEl = popoverRef.current;
    const popoverHeight = popoverEl?.offsetHeight ?? 120;
    const popoverWidth = popoverEl?.offsetWidth ?? 280;
    const gap = 10;
    const padding = 12;

    let top = anchor.top - popoverHeight - gap;
    let placement = "above";

    if (top < padding) {
      top = anchor.bottom + gap;
      placement = "below";
    }

    let left = anchor.left + anchor.width / 2 - popoverWidth / 2;
    left = Math.max(padding, Math.min(left, window.innerWidth - popoverWidth - padding));

    setPosition({ top, left, placement });
  }, [anchor, events]);

  if (!anchor || events.length === 0) return null;

  const describedEvents = events.filter((event) => event.desc);
  if (describedEvents.length === 0) return null;

  return (
    <div
      ref={popoverRef}
      className={`week-popover week-popover--${position.placement}`}
      style={{
        top: position.top,
        left: position.left,
        "--popover-accent": accent,
        "--popover-tint": tint,
      }}
      role="tooltip"
    >
      <div className="week-popover-glow" aria-hidden="true" />
      <div className="week-popover-body">
        {describedEvents.map((event, index) => (
          <PopoverEvent key={`${event.date}-${event.name}-${index}`} event={event} />
        ))}
      </div>
    </div>
  );
}
