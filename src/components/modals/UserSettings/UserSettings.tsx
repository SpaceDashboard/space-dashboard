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
import { useForm } from 'react-hook-form';
import { ColumnManager } from './ColumnManager';

interface FormFields {
  issFeed1IdOverride?: string;
  issFeed2IdOverride?: string;
}

export const UserSettings: React.FC = () => {
  const {
    isUserSettingsOpen,
    setIsUserSettingsOpen,
    issLiveFeedVideoId1,
    issLiveFeedVideoId2,
  } = useAppContext();
  const {
    settings: {
      reduceMotion,
      reduceTransparency,
      reduceButtonAnimation,
      enableButtonAnimationAlways,
      panelConfigs,
    },
    updateSettings,
    updatePanelConfigs,
  } = useSettingsContext();
  const { register, setValue, watch } = useForm<FormFields>();

  return (
    <Modal isOpen={isUserSettingsOpen} setIsOpen={setIsUserSettingsOpen}>
      <FlexWrapper gap={50}>
        <FlexWrapper>
          <h2>{'Motion & Accessibility'}</h2>
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
              <Button variantsList={['secondary', 'small']}>{'Button'}</Button>
              <Button variantsList={['secondary', 'small']} disabled={true}>
                {'Button'}
              </Button>
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>

        <FlexWrapper gap={28}>
          <h2>{'Panel Specific Settings'}</h2>
          <FlexWrapper>
            <h3>{'Live Video from the ISS'}</h3>
            <Toggle
              label="Auto Play Video"
              checked={panelConfigs.IssFeed1.autoPlay}
              onChange={() =>
                updatePanelConfigs({
                  IssFeed1: {
                    ...panelConfigs.IssFeed1,
                    autoPlay: !panelConfigs.IssFeed1.autoPlay,
                  },
                })
              }
            />
            <Toggle
              label="Start Video Muted"
              checked={panelConfigs.IssFeed1.mute}
              onChange={() =>
                updatePanelConfigs({
                  IssFeed1: {
                    ...panelConfigs.IssFeed1,
                    mute: !panelConfigs.IssFeed1.mute,
                  },
                })
              }
            />
            <FlexWrapper maxWidth={200}>
              <label htmlFor="issFeed1IdOverride">{'Video ID Override'}</label>
              <input
                type="text"
                placeholder={issLiveFeedVideoId1}
                autoComplete="off"
                data-1p-ignore
                {...register('issFeed1IdOverride', {
                  value:
                    panelConfigs.IssFeed1.videoIdOverride !==
                    issLiveFeedVideoId1
                      ? panelConfigs.IssFeed1.videoIdOverride
                      : '',
                })}
              />
              <FlexWrapper flexDirection="row" alignItems="center" gap={12}>
                <Button
                  variantsList={['small']}
                  disabled={
                    watch('issFeed1IdOverride') === '' ||
                    watch('issFeed1IdOverride') ===
                      panelConfigs.IssFeed1.videoIdOverride
                  }
                  onClick={() => {
                    updatePanelConfigs({
                      IssFeed1: {
                        ...panelConfigs.IssFeed1,
                        videoIdOverride: watch('issFeed1IdOverride'),
                      },
                    });
                  }}
                >
                  {'Apply'}
                </Button>
                <Button
                  variantsList={['secondary', 'small']}
                  onClick={() => {
                    updatePanelConfigs({
                      IssFeed1: {
                        ...panelConfigs.IssFeed1,
                        videoIdOverride: issLiveFeedVideoId1,
                      },
                    });
                    setValue('issFeed1IdOverride', '');
                  }}
                >
                  {'Reset'}
                </Button>
              </FlexWrapper>
            </FlexWrapper>
          </FlexWrapper>

          <FlexWrapper>
            <h3>{'Live HD Views from the ISS'}</h3>
            <Toggle
              label="Auto Play Video"
              checked={panelConfigs.IssFeed2.autoPlay}
              onChange={() =>
                updatePanelConfigs({
                  IssFeed2: {
                    ...panelConfigs.IssFeed2,
                    autoPlay: !panelConfigs.IssFeed2.autoPlay,
                  },
                })
              }
            />
            <Toggle
              label="Start Video Muted"
              checked={panelConfigs.IssFeed2.mute}
              onChange={() =>
                updatePanelConfigs({
                  IssFeed2: {
                    ...panelConfigs.IssFeed2,
                    mute: !panelConfigs.IssFeed2.mute,
                  },
                })
              }
            />
            <FlexWrapper maxWidth={200}>
              <label htmlFor="issFeed2IdOverride">{'Video ID Override'}</label>
              <input
                type="text"
                placeholder={issLiveFeedVideoId2}
                autoComplete="off"
                data-1p-ignore
                {...register('issFeed2IdOverride', {
                  value:
                    panelConfigs.IssFeed2.videoIdOverride !==
                    issLiveFeedVideoId2
                      ? panelConfigs.IssFeed2.videoIdOverride
                      : '',
                })}
              />
              <FlexWrapper flexDirection="row" alignItems="center" gap={12}>
                <Button
                  variantsList={['small']}
                  disabled={
                    watch('issFeed2IdOverride') === '' ||
                    watch('issFeed2IdOverride') ===
                      panelConfigs.IssFeed2.videoIdOverride
                  }
                  onClick={() => {
                    updatePanelConfigs({
                      IssFeed2: {
                        ...panelConfigs.IssFeed2,
                        videoIdOverride: watch('issFeed2IdOverride'),
                      },
                    });
                  }}
                >
                  {'Apply'}
                </Button>
                <Button
                  variantsList={['secondary', 'small']}
                  onClick={() => {
                    updatePanelConfigs({
                      IssFeed2: {
                        ...panelConfigs.IssFeed2,
                        videoIdOverride: issLiveFeedVideoId2,
                      },
                    });
                    setValue('issFeed2IdOverride', '');
                  }}
                >
                  {'Reset'}
                </Button>
              </FlexWrapper>
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>

        <ColumnManager />
      </FlexWrapper>
    </Modal>
  );
};
