import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Toggle,
  FlexWrapper,
  TooltipWrapper,
} from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';
import { useForm } from 'react-hook-form';
import { IconInfoCircle } from '@tabler/icons-react';

interface IssFeedSettingsProps {
  feedName: 'IssFeed1' | 'IssFeed2';
}

export const IssFeedSettings: React.FC<IssFeedSettingsProps> = ({
  feedName,
}) => {
  const { issLiveFeedVideoId1, issLiveFeedVideoId2 } = useAppContext();
  const { settings, updatePanelConfigs } = useSettingsContext();
  const panelConfig = settings.panelConfigs[feedName];
  const videoId =
    feedName === 'IssFeed1' ? issLiveFeedVideoId1 : issLiveFeedVideoId2;

  const { register, setValue, watch } = useForm<{
    videoIdOverride?: string;
  }>();

  const fieldRef = useRef<HTMLDivElement>(null);
  const [fieldIsNarrow, setFieldIsNarrow] = useState<boolean>(false);

  const memoizedInputValue = useMemo(() => {
    return panelConfig.videoIdOverride !== videoId
      ? panelConfig.videoIdOverride
      : '';
  }, [panelConfig.videoIdOverride, videoId]);

  useEffect(() => {
    setValue('videoIdOverride', memoizedInputValue);
  }, [memoizedInputValue, setValue]);

  useEffect(() => {
    const handleResize = () => {
      if (!fieldRef.current) return;
      setFieldIsNarrow(fieldRef.current.offsetWidth < 360);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Toggle
        label="Auto Play Video"
        checked={panelConfig.autoPlay}
        onChange={() =>
          updatePanelConfigs({
            [feedName]: {
              ...panelConfig,
              autoPlay: !panelConfig.autoPlay,
            },
          })
        }
      />
      <Toggle
        label="Start Video Muted"
        checked={panelConfig.mute}
        onChange={() =>
          updatePanelConfigs({
            [feedName]: {
              ...panelConfig,
              mute: !panelConfig.mute,
            },
          })
        }
      />
      <FlexWrapper flexDirection="row" alignItems="flex-end" ref={fieldRef}>
        <FlexWrapper maxWidth={200}>
          <FlexWrapper flexDirection="row" alignItems="center" gap={6}>
            <TooltipWrapper title="Override the YouTube video ID" delay={100}>
              <IconInfoCircle color="#CCC" size={20} />
            </TooltipWrapper>
            <label htmlFor="videoIdOverride">{'Video ID Override'}</label>
          </FlexWrapper>
          <FlexWrapper
            flexDirection={fieldIsNarrow ? 'column' : 'row'}
            alignItems="center"
            gap={fieldIsNarrow ? 6 : 12}
          >
            <input
              type="text"
              placeholder={videoId}
              autoComplete="off"
              data-1p-ignore
              {...register('videoIdOverride', {
                value: memoizedInputValue,
              })}
            />
            <FlexWrapper flexDirection="row" gap={12}>
              <Button
                variantsList={['small']}
                disabled={
                  watch('videoIdOverride') === '' ||
                  watch('videoIdOverride') === panelConfig.videoIdOverride
                }
                onClick={() => {
                  updatePanelConfigs({
                    [feedName]: {
                      ...panelConfig,
                      videoIdOverride: watch('videoIdOverride'),
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
                    [feedName]: {
                      ...panelConfig,
                      videoIdOverride: videoId,
                    },
                  });
                  setValue('videoIdOverride', '');
                }}
                tooltipTitle="Resets video ID to default value"
                tooltipOffset={10}
              >
                {'Reset'}
              </Button>
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </>
  );
};
