import React, { useEffect, useMemo } from 'react';
import {
  Button,
  Toggle,
  FlexWrapper,
  TooltipWrapper,
} from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';
import { useForm } from 'react-hook-form';
import { IconInfoCircle } from '@tabler/icons-react';

export const IssFeed2Settings: React.FC = () => {
  const { issLiveFeedVideoId2 } = useAppContext();
  const {
    settings: {
      panelConfigs: { IssFeed2 },
    },
    updatePanelConfigs,
  } = useSettingsContext();
  const { register, setValue, watch } = useForm<{
    issFeed2IdOverride?: string;
  }>();
  const memoizedInputValue = useMemo(() => {
    return IssFeed2.videoIdOverride !== issLiveFeedVideoId2
      ? IssFeed2.videoIdOverride
      : '';
  }, [IssFeed2.videoIdOverride, issLiveFeedVideoId2]);

  useEffect(() => {
    setValue('issFeed2IdOverride', memoizedInputValue);
  }, [memoizedInputValue, setValue]);

  return (
    <>
      <Toggle
        label="Auto Play Video"
        checked={IssFeed2.autoPlay}
        onChange={() =>
          updatePanelConfigs({
            IssFeed2: {
              ...IssFeed2,
              autoPlay: !IssFeed2.autoPlay,
            },
          })
        }
      />
      <Toggle
        label="Start Video Muted"
        checked={IssFeed2.mute}
        onChange={() =>
          updatePanelConfigs({
            IssFeed2: {
              ...IssFeed2,
              mute: !IssFeed2.mute,
            },
          })
        }
      />
      <FlexWrapper flexDirection="row" alignItems="flex-end">
        <FlexWrapper maxWidth={200}>
          <FlexWrapper flexDirection="row" alignItems="center" gap={6}>
            <label htmlFor="issFeed2IdOverride">{'Video ID Override'}</label>
            <TooltipWrapper title="Override the YouTube video ID" delay={100}>
              <IconInfoCircle color="#CCC" size={20} />
            </TooltipWrapper>
          </FlexWrapper>
          <FlexWrapper flexDirection="row" alignItems="center" gap={12}>
            <input
              type="text"
              placeholder={issLiveFeedVideoId2}
              autoComplete="off"
              data-1p-ignore
              {...register('issFeed2IdOverride', {
                value: memoizedInputValue,
              })}
            />
            <Button
              variantsList={['small']}
              disabled={
                watch('issFeed2IdOverride') === '' ||
                watch('issFeed2IdOverride') === IssFeed2.videoIdOverride
              }
              onClick={() => {
                updatePanelConfigs({
                  IssFeed2: {
                    ...IssFeed2,
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
                    ...IssFeed2,
                    videoIdOverride: issLiveFeedVideoId2,
                  },
                });
                setValue('issFeed2IdOverride', '');
              }}
              tooltipTitle="Resets video ID to default value"
              tooltipOffset={10}
            >
              {'Reset'}
            </Button>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </>
  );
};
