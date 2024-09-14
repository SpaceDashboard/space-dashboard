import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  Toggle,
  FlexWrapper,
  TooltipWrapper,
} from 'src/components/base';
import { useAppContext } from 'src/hooks';
import { useSettingsContext } from 'src/hooks';
import { IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';
import { ColumnManager } from './ColumnManager';
import {
  IssFeedSettings,
  SolarVisualSettings,
  AuroraForecastSettings,
} from './panel-settings';
import { css } from '@emotion/css';

const settingsSectionHeaderCss = css`
  position: relative;
  width: 90%;

  &::before {
    border-bottom: 1px solid #333;
    bottom: -6px;
    content: '';
    display: block;
    position: absolute;
    width: 100%;
  }
`;

export const UserSettings: React.FC = () => {
  const { isUserSettingsOpen, setIsUserSettingsOpen } = useAppContext();
  const {
    settings: {
      reduceMotion,
      reduceTransparency,
      reduceButtonAnimation,
      enableButtonAnimationAlways,
      disableButtonTooltips,
    },
    updateSettings,
  } = useSettingsContext();
  const modalContentWrapperRef = useRef<HTMLDivElement>(null);
  const [modalContentDirection, setModalContentDirection] = useState<
    'row' | 'column'
  >('row');

  useEffect(() => {
    const handleResize = () => {
      if (!modalContentWrapperRef.current) return;
      setModalContentDirection(
        modalContentWrapperRef.current.offsetWidth < 1080 ? 'column' : 'row',
      );
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Modal isOpen={isUserSettingsOpen} setIsOpen={setIsUserSettingsOpen}>
      <FlexWrapper
        gap={25}
        flexDirection={modalContentDirection}
        ref={modalContentWrapperRef}
      >
        {/* Start toggle wrapper */}
        <FlexWrapper gap={50} style={{ maxWidth: '440px', minWidth: '265px' }}>
          <FlexWrapper gap={28}>
            <h2 className={settingsSectionHeaderCss}>
              {'Motion & Accessibility'}
            </h2>
            <FlexWrapper>
              <Toggle
                label={
                  <>
                    {'Reduce transparency'}
                    <TooltipWrapper
                      title="Reduces transparency of background colors and elements"
                      delay={300}
                    >
                      <IconInfoCircle color="#CCC" size={20} />
                    </TooltipWrapper>
                  </>
                }
                checked={reduceTransparency}
                onChange={() =>
                  updateSettings({ reduceTransparency: !reduceTransparency })
                }
              />
              <Toggle
                label={
                  <>
                    {'Reduce motion'}
                    <TooltipWrapper
                      title="Reduces panel, modal, and toggle animations (anything that animates smoothly)"
                      delay={300}
                    >
                      <IconInfoCircle color="#CCC" size={20} />
                    </TooltipWrapper>
                  </>
                }
                checked={reduceMotion}
                onChange={() => updateSettings({ reduceMotion: !reduceMotion })}
              />
              <Toggle
                label={
                  <>
                    {'Reduce button animation'}
                    <TooltipWrapper
                      title="Reduces the corner animations on buttons when hovered"
                      delay={300}
                    >
                      <IconInfoCircle color="#CCC" size={20} />
                    </TooltipWrapper>
                  </>
                }
                checked={reduceButtonAnimation}
                onChange={() =>
                  updateSettings({
                    reduceButtonAnimation: !reduceButtonAnimation,
                  })
                }
              />
              <FlexWrapper alignItems="center" flexDirection="row">
                <Toggle
                  label={
                    <>
                      {'Always render button animations'}
                      <TooltipWrapper
                        title="Always animates the corner animations on buttons, except when disabled"
                        delay={300}
                      >
                        <IconInfoCircle color="#CCC" size={20} />
                      </TooltipWrapper>
                    </>
                  }
                  checked={enableButtonAnimationAlways}
                  onChange={() =>
                    updateSettings({
                      enableButtonAnimationAlways: !enableButtonAnimationAlways,
                    })
                  }
                  isDisabled={reduceButtonAnimation}
                />
                {reduceButtonAnimation && (
                  <>
                    <IconAlertTriangle color="#CA8300" size={20} />
                    <small style={{ color: '#e9c27b' }}>
                      {'"Reduce button animation" overrides this setting'}
                    </small>
                  </>
                )}
              </FlexWrapper>
              <FlexWrapper gap={4} marginTop={8}>
                <h3>{'Example Buttons'}</h3>
                <FlexWrapper alignItems="flex-end" flexDirection="row">
                  <Button variantsList={['small']}>{'Button'}</Button>
                  <Button variantsList={['secondary', 'small']}>
                    {'Button'}
                  </Button>
                  <Button variantsList={['secondary', 'small']} disabled={true}>
                    {'Button'}
                  </Button>
                </FlexWrapper>
              </FlexWrapper>
            </FlexWrapper>
          </FlexWrapper>

          <FlexWrapper gap={28}>
            <h2 className={settingsSectionHeaderCss}>
              {'Panel Specific Settings'}
            </h2>
            <FlexWrapper>
              <h3>{'Live Video from the ISS'}</h3>
              <IssFeedSettings feedName="IssFeed1" />
            </FlexWrapper>

            <FlexWrapper>
              <h3>{'Live HD Views from the ISS'}</h3>
              <IssFeedSettings feedName="IssFeed2" />
            </FlexWrapper>

            <FlexWrapper>
              <h3>{'The Sun Now'}</h3>
              <SolarVisualSettings />
            </FlexWrapper>

            <FlexWrapper>
              <h3>{'Aurora Forecast'}</h3>
              <AuroraForecastSettings />
            </FlexWrapper>
          </FlexWrapper>

          <FlexWrapper gap={28}>
            <h2 className={settingsSectionHeaderCss}>
              {'Additional Settings'}
            </h2>
            <FlexWrapper>
              <Toggle
                label={
                  <>
                    {'Disable icon button tooltips'}
                    <TooltipWrapper
                      title="Disables tooltips for any button that only renders an icon. This is not recommended but allows for fewer visual interruptions when using the dashboard."
                      delay={300}
                    >
                      <IconInfoCircle color="#CCC" size={20} />
                    </TooltipWrapper>
                  </>
                }
                checked={disableButtonTooltips}
                onChange={() =>
                  updateSettings({
                    disableButtonTooltips: !disableButtonTooltips,
                  })
                }
              />
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>
        {/* End toggle wrapper */}

        <ColumnManager />
      </FlexWrapper>
    </Modal>
  );
};
