import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';
import {
  Button,
  Modal,
  Toggle,
  FlexWrapper,
  TooltipWrapper,
} from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';
import { IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';
import { ColumnManager } from './ColumnManager';
import {
  IssFeedSettings,
  SolarVisualSettings,
  AuroraForecastSettings,
  DeepSpaceNetworkSettings,
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

const animationSpeedAdjustmentSelectCss = css`
  appearance: none;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 100px;
  border: 1px solid #fff;
  box-sizing: content-box;
  color: #fff;
  cursor: pointer;
  font-size: 0.75rem;
  height: 24px;
  padding: 0 2.5px;
  text-align: center;
  text-align-last: center;
  width: 40px;

  @media (hover: hover) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  &:focus-visible {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const animationSpeedAdjustmentSelectLabelDividerCss = css`
  flex-grow: 1;
  height: 1px;
  position: relative;

  &::after {
    background: hsl(
      var(--base-blue-hue),
      var(--base-blue-saturation),
      calc(var(--base-blue-lightness) - 5%)
    );
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

export const UserSettings: React.FC = () => {
  const { isUserSettingsOpen, setIsUserSettingsOpen } = useAppContext();
  const {
    settings: {
      reduceMotion,
      reduceTransparency,
      reduceButtonAnimation,
      enableLoadingAnimation,
      enableButtonAnimationAlways,
      disableButtonTooltips,
      lastUpdated,
      animationSpeedAdjustment,
    },
    defaultSettings,
    updateSettings,
  } = useSettingsContext();
  const modalContentWrapperRef = useRef<HTMLDivElement>(null);
  const [modalContentDirection, setModalContentDirection] = useState<
    'row' | 'column'
  >('row');

  const resetAllSettings = () => {
    updateSettings(defaultSettings);
  };

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
    <Modal
      isOpen={isUserSettingsOpen}
      setIsOpen={setIsUserSettingsOpen}
      isFullScreen={true}
    >
      <FlexWrapper
        gap={25}
        flexDirection={modalContentDirection}
        ref={modalContentWrapperRef}
      >
        {/* Start toggle wrapper */}
        <FlexWrapper
          gap={50}
          style={{ maxWidth: '440px', minWidth: '265px' }}
          className="settings-toggles-wrapper"
        >
          <FlexWrapper gap={28}>
            <h2 className={settingsSectionHeaderCss}>
              {'Motion & Accessibility'}
            </h2>
            <FlexWrapper>
              <Toggle
                label="Reduce transparency"
                tooltip="Reduces transparency of background colors and elements"
                checked={reduceTransparency}
                onChange={() =>
                  updateSettings({ reduceTransparency: !reduceTransparency })
                }
              />
              <Toggle
                label="Reduce motion"
                tooltip="Reduces panel, modal, and toggle animations (anything that animates smoothly). This can help with performance if your computer is having difficulties rendering panels and animations."
                checked={reduceMotion}
                onChange={() => updateSettings({ reduceMotion: !reduceMotion })}
              />
              <Toggle
                label="Dashboard loading animation"
                tooltip="Toggle the loading animation of the dashboard panels on page load"
                checked={enableLoadingAnimation}
                onChange={() =>
                  updateSettings({
                    enableLoadingAnimation: !enableLoadingAnimation,
                  })
                }
              />
              <FlexWrapper
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <TooltipWrapper
                  title="Adjusts the speed of animations by the selected adjustment value (lower = faster)"
                  delay={300}
                >
                  <IconInfoCircle color="#CCC" size={20} />
                </TooltipWrapper>
                <label>{'Animation speed adjustment: '}</label>
                <span
                  className={animationSpeedAdjustmentSelectLabelDividerCss}
                ></span>
                <select
                  className={animationSpeedAdjustmentSelectCss}
                  onChange={(e) =>
                    updateSettings({
                      animationSpeedAdjustment: Number(e.target.value),
                    })
                  }
                  value={animationSpeedAdjustment}
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </FlexWrapper>
              <Toggle
                label="Reduce button animation"
                tooltip="Reduces the corner animations on buttons when hovered"
                checked={reduceButtonAnimation}
                onChange={() =>
                  updateSettings({
                    reduceButtonAnimation: !reduceButtonAnimation,
                  })
                }
              />
              <FlexWrapper alignItems="center" flexDirection="row">
                <Toggle
                  label="Always render button animations"
                  tooltip="Always animates the corner animations on buttons, except when disabled"
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
              <h3>{'Livestream of Earth & Space'}</h3>
              <IssFeedSettings feedName="IssFeed1" />
            </FlexWrapper>

            <FlexWrapper>
              <h3>{'Live Video from the ISS'}</h3>
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

            <FlexWrapper>
              <h3>{'Deep Space Network'}</h3>
              <DeepSpaceNetworkSettings />
            </FlexWrapper>
          </FlexWrapper>

          <FlexWrapper gap={28}>
            <h2 className={settingsSectionHeaderCss}>
              {'Additional Settings'}
            </h2>
            <FlexWrapper>
              <Toggle
                label="Disable icon button tooltips"
                tooltip="Disables tooltips for any button that only renders an icon. This is not recommended but allows for fewer visual interruptions when using the dashboard."
                checked={disableButtonTooltips}
                onChange={() =>
                  updateSettings({
                    disableButtonTooltips: !disableButtonTooltips,
                  })
                }
              />
            </FlexWrapper>
          </FlexWrapper>

          <FlexWrapper marginBottom={30} gap={16}>
            <FlexWrapper gap={2}>
              <p>
                <strong>{'Settings last updated: '}</strong>
              </p>
              <p>
                {lastUpdated
                  ? `${format(new UTCDate(lastUpdated), 'd MMM yyyy @ HH:mm:ss')} (UTC)`
                  : '--'}
              </p>
            </FlexWrapper>
            <Button variantsList={['danger']} onClick={resetAllSettings}>
              {'Reset All Settings'}
            </Button>
          </FlexWrapper>
        </FlexWrapper>
        {/* End toggle wrapper */}

        <ColumnManager />
      </FlexWrapper>
    </Modal>
  );
};
