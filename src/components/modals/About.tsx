import React from 'react';
import { Button, FlexWrapper, Modal } from 'src/components/base';
import { useAppContext } from 'src/hooks';

export const About: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen, setIsContactFormOpen } = useAppContext();

  return (
    <Modal isOpen={isAboutOpen} setIsOpen={setIsAboutOpen}>
      <div className="content-two-up">
        <FlexWrapper>
          <h2>{"Hello! I'm Caleb."}</h2>

          <p>
            {
              "I'm a Software Engineer, and I got bored one afternoon and made this site because I, like yourself, wanted as much space related data on my screen as possible. If you like this, great! I'm happy I can make an impact."
            }
          </p>

          <p>
            {
              'If you have any questions/suggestions/bug reports, let me know using the contact form.'
            }
          </p>

          <p>{'Thanks for visiting!'}</p>

          <Button
            onClick={() => {
              setIsAboutOpen(false);
              setIsContactFormOpen(true);
            }}
          >
            {'Contact me'}
          </Button>
        </FlexWrapper>

        <FlexWrapper>
          <p>{'<Info about how the settings data is saved>'}</p>
        </FlexWrapper>
      </div>
    </Modal>
  );
};
