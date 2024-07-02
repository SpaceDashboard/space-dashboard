import React, { useEffect } from 'react';
import { NavBar } from 'src/components/NavBar';
import { AuroraForecast } from './components/panels';
// import { ContactForm } from 'src/components/ContactForm';
// import { useAppContext } from 'src/hooks/useAppContext';

export const App: React.FC = () => {
  // const { isContactFormOpen, setIsContactFormOpen } = useAppContext();

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
          <AuroraForecast index={0} />
          <AuroraForecast index={1} />
        </div>
        <div className="container-column">
          <AuroraForecast index={2} />
          <AuroraForecast index={3} />
        </div>
        <div className="container-column">
          <AuroraForecast index={4} />
          <AuroraForecast index={5} />
        </div>
      </main>
    </>
  );
};
