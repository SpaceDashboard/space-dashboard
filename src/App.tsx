import React, { useEffect } from 'react';
import { NavBar } from 'src/components/NavBar';
import { Test } from './components/panels';
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
          <Test />
        </div>
      </main>
    </>
  );
};
