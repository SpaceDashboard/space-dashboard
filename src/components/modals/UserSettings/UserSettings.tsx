import React from 'react';
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
import { ColumnUpdater } from './ColumnUpdater';

export const UserSettings: React.FC = () => {
  const { isUserSettingsOpen, setIsUserSettingsOpen } = useAppContext();
  const {
    settings: {
      reduceMotion,
      reduceTransparency,
      reduceButtonAnimation,
      enableButtonAnimationAlways,
    },
    updateSettings,
  } = useSettingsContext();

  return (
    <Modal isOpen={isUserSettingsOpen} setIsOpen={setIsUserSettingsOpen}>
      <FlexWrapper gap={42}>
        <FlexWrapper>
          <h2>Motion &amp; Accessibility</h2>

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
          </FlexWrapper>

          <FlexWrapper>
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
          </FlexWrapper>

          <FlexWrapper>
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
          </FlexWrapper>

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
                  "Reduce button animation" overrides this setting
                </small>
              </>
            )}
          </FlexWrapper>

          <FlexWrapper gap={4} marginBottom={12}>
            <h3>Example Buttons</h3>
            <FlexWrapper alignItems="flex-end" flexDirection="row">
              <Button variantsList={['small']}>{'Button'}</Button>
              <Button variantsList={['secondary', 'small']}>{'Button'}</Button>
              <Button variantsList={['secondary', 'small']} disabled={true}>
                {'Button'}
              </Button>
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>

        <ColumnUpdater />
      </FlexWrapper>
    </Modal>
  );
};
