import { Component } from "react";
import LifeGrid from "./components/LifeGrid";
import { countEvents, loadConfig, loadLifeData } from "./lib/events";

function ConfigError({ message }) {
  return (
    <div className="min-h-screen bg-white px-6 py-16 text-neutral-800">
      <div className="mx-auto max-w-lg">
        <h1 className="text-xl text-neutral-900">Configuration error</h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{message}</p>
        <pre className="mt-6 overflow-x-auto rounded border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-700">
          {`# src/lib/events.js
const START_DATE = "2002-05-07";
const END_YEAR = 2030;

# content/life-in-weeks.yml
"2025-01-01":
  - name: Started StudyMEDIC
    desc: Joined as Backend Engineer.
    category: work`}
        </pre>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <ConfigError message={this.state.error.message} />;
    }
    return this.props.children;
  }
}

function AppContent() {
  const config = loadConfig();
  const eventData = loadLifeData();

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <div className="mx-auto max-w-none px-8 py-14 sm:px-12 sm:py-20">
        <header className="mb-12 w-full">
          <h1 className="text-3xl font-normal text-neutral-900 sm:text-4xl">
            Life
          </h1>
          <p className="mt-5 w-full max-w-none text-lg leading-relaxed text-neutral-600">
            Each box is a week of my life. Most are ordinary weeks. The labeled
            ones mark the moments that changed something, whether through good
            decisions, bad decisions, luck, timing, or pure chaos. Together,
            they tell the story better than memory ever could. Inspired by this{" "}
            <a
              href="https://waitbutwhy.com/2014/05/life-weeks.html"
              target="_blank"
              rel="noopener noreferrer"
              className="intro-link whitespace-nowrap"
            >
              post &#8599;
            </a>
          </p>
        </header>

        <main>
          <LifeGrid
            startDate={config.startDate}
            startYear={config.startYear}
            endYear={config.endYear}
            eventData={eventData}
          />
        </main>

        <footer className="mt-14 w-full text-sm text-neutral-400">
          {countEvents(eventData)} events · based on{" "}
          <a
            href="https://github.com/busterbenson/notes/blob/master/_layouts/life-in-weeks.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2"
          >
            Buster Benson&apos;s template
          </a>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
