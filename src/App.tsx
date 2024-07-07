import React, { useEffect } from 'react';
import { NavBar } from 'src/components/NavBar';
import {
  IssFeed1,
  IssFeed2,
  IssTracker,
  AuroraForecast,
  SolarVisual,
} from './components/panels';
// import { ContactForm } from 'src/components/ContactForm';

export const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove('initial-load');
      document.body.removeAttribute('style');
    }, 300);
  }, []);

  return (
    <>
      <NavBar />
      {/* <ContactForm /> */}
      <main className="container">
        <div className="container-column">
          <IssFeed1 index={0} />
          <IssFeed2 index={1} />
        </div>
        <div className="container-column">
          <IssTracker index={2} />
          <SolarVisual index={3} />
        </div>
        <div className="container-column">
          <AuroraForecast index={4} />
          <AuroraForecast index={5} />
        </div>
      </main>
    </>
  );
};
