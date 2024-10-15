import React from 'react';
import { css } from '@emotion/css';
import { Button, FlexWrapper, Modal } from 'src/components/base';
import { useAppContext } from 'src/hooks';
import {
  IconCoffee,
  IconAdjustments,
  IconExternalLink,
} from '@tabler/icons-react';

const sectionGap = 80;

const coffeeCss = css`
  position: relative;

  &::before,
  &::after {
    background-color: rgba(255, 255, 255, 0.15);
    content: '';
    height: 1px;
    max-width: 900px;
    position: absolute;
    top: -${sectionGap / 2}px;
    width: 100%;
  }

  &::after {
    bottom: -${sectionGap / 2}px;
    top: auto;
  }
`;

export const About: React.FC = () => {
  const {
    isAboutOpen,
    setIsAboutOpen,
    setIsContactFormOpen,
    setIsUserSettingsOpen,
  } = useAppContext();

  return (
    <Modal isOpen={isAboutOpen} setIsOpen={setIsAboutOpen} isFullScreen={true}>
      <FlexWrapper gap={sectionGap}>
        <FlexWrapper gap={20}>
          <h1>{'Welcome to the new Space Dashboard!'}</h1>
          <p>
            {
              "I'm Caleb, a Software Engineer, and Space Dashboard is something I originally built in 2016 to put as much space-related data in one place as possible. Now, it's been completely redesigned and rebuilt from the ground up, and I'm excited to share it with you."
            }
          </p>
          <p>
            {
              "Whether you're a returning visitor or checking it out for the first time, I hope you enjoy exploring the new features. If you have any questions, suggestions, or bug reports, feel free to reach out through the "
            }
            <a
              href="#"
              onClick={() => {
                setIsAboutOpen(false);
                setIsContactFormOpen(true);
              }}
            >
              {'contact form (or GitHub)'}
            </a>
            .
          </p>
          <p>
            {'Thanks so much for visiting, and I hope you love the update!'}
          </p>
        </FlexWrapper>

        <FlexWrapper gap={14} className={coffeeCss}>
          <FlexWrapper gap={4}>
            <h3>{'Enjoying SpaceDashboard?'}</h3>
            <p style={{ fontSize: '0.95rem' }}>
              {
                "If you'd like to support the site, you can fuel my next coding session with a coffee."
              }
            </p>
          </FlexWrapper>

          <Button
            Icon={IconCoffee}
            onClick={() => {
              window.open('https://ko-fi.com/spacedashboard', '_blank');
            }}
          >
            {'Buy me a coffee'}
            <IconExternalLink size={14} opacity={0.6} />
          </Button>
        </FlexWrapper>

        <FlexWrapper gap={20}>
          <h2 style={{ fontVariationSettings: "'wght' 450" }}>
            {'Your settings, your control'}
          </h2>
          <p>
            {
              "To make your experience better, Space Dashboard uses your browser's localStorage to save settings - preferences for what and how data is displayed and how the UI looks. Don't worry, no cookies are used."
            }
          </p>
          <p>{`With localStorage, the data is only accessible for this website (${window.location.host}), and it's not shared anywhere else. If you ever need to clear it, it's easy to do in your browser settings.`}</p>
          <Button
            Icon={IconAdjustments}
            variantsList={['secondary']}
            onClick={() => {
              setIsAboutOpen(false);
              setIsUserSettingsOpen(true);
            }}
          >
            {'Settings'}
          </Button>
        </FlexWrapper>
      </FlexWrapper>
    </Modal>
  );
};
