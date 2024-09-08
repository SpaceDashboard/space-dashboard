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

export const IssFeed1Settings: React.FC = () => {
  const { issLiveFeedVideoId1 } = useAppContext();
  const {
    settings: {
      panelConfigs: { IssFeed1 },
    },
    updatePanelConfigs,
  } = useSettingsContext();
  const { register, setValue, watch } = useForm<{
    issFeed1IdOverride?: string;
  }>();
  const memoizedInputValue = useMemo(() => {
    return IssFeed1.videoIdOverride !== issLiveFeedVideoId1
      ? IssFeed1.videoIdOverride
      : '';
  }, [IssFeed1.videoIdOverride, issLiveFeedVideoId1]);

  useEffect(() => {
    setValue('issFeed1IdOverride', memoizedInputValue);
  }, [memoizedInputValue, setValue]);

  return (
    <>
      <Toggle
        label="Auto Play Video"
        checked={IssFeed1.autoPlay}
        onChange={() =>
          updatePanelConfigs({
            IssFeed1: {
              ...IssFeed1,
              autoPlay: !IssFeed1.autoPlay,
            },
          })
        }
      />
      <Toggle
        label="Start Video Muted"
        checked={IssFeed1.mute}
        onChange={() =>
          updatePanelConfigs({
            IssFeed1: {
              ...IssFeed1,
              mute: !IssFeed1.mute,
            },
          })
        }
      />
      <FlexWrapper flexDirection="row" alignItems="flex-end">
        <FlexWrapper maxWidth={200}>
          <FlexWrapper flexDirection="row" alignItems="center" gap={6}>
            <label htmlFor="issFeed1IdOverride">{'Video ID Override'}</label>
            <TooltipWrapper title="Override the YouTube video ID" delay={100}>
              <IconInfoCircle color="#CCC" size={20} />
            </TooltipWrapper>
          </FlexWrapper>
          <FlexWrapper flexDirection="row" alignItems="center" gap={12}>
            <input
              type="text"
              placeholder={issLiveFeedVideoId1}
              autoComplete="off"
              data-1p-ignore
              {...register('issFeed1IdOverride', {
                value: memoizedInputValue,
              })}
            />
            <Button
              variantsList={['small']}
              disabled={
                watch('issFeed1IdOverride') === '' ||
                watch('issFeed1IdOverride') === IssFeed1.videoIdOverride
              }
              onClick={() => {
                updatePanelConfigs({
                  IssFeed1: {
                    ...IssFeed1,
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
                    ...IssFeed1,
                    videoIdOverride: issLiveFeedVideoId1,
                  },
                });
                setValue('issFeed1IdOverride', '');
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
