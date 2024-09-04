import React, { useMemo } from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  Button,
  FadeFromBlack,
  Toggle,
  FlexWrapper,
} from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';
import { useForm } from 'react-hook-form';

const iframeCss = css`
  background: #000;
`;

export const IssFeed1: React.FC<PanelProps> = ({ index, componentKey }) => {
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
  const issFeedId = useMemo(
    () => IssFeed1.videoIdOverride || issLiveFeedVideoId1,
    [IssFeed1, issLiveFeedVideoId1],
  );

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={`https://www.youtube.com/embed/${issFeedId}?autoplay=${IssFeed1.autoPlay}&mute=${IssFeed1.mute}`}
            title="YouTube video player - ISS Live View"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <p>
          {'Credit: '}
          <a
            href={`https://www.youtube.com/watch?v=${issFeedId}`}
            target="_blank"
            rel="noreferrer"
          >
            {'Live Video from the International Space Station'}
          </a>
        </p>
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
            <label htmlFor="issFeed1IdOverride">{'Video ID Override'}</label>
            <input
              type="text"
              placeholder={issLiveFeedVideoId1}
              autoComplete="off"
              data-1p-ignore
              {...register('issFeed1IdOverride', {
                value:
                  IssFeed1.videoIdOverride !== issLiveFeedVideoId1
                    ? IssFeed1.videoIdOverride
                    : '',
              })}
            />
          </FlexWrapper>
          <FlexWrapper flexDirection="row" alignItems="center" gap={12}>
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
            >
              {'Reset'}
            </Button>
          </FlexWrapper>
        </FlexWrapper>
      </PanelMenu>
      <PanelActions />
    </Panel>
  );
};
