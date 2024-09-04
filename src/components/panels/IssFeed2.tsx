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

export const IssFeed2: React.FC<PanelProps> = ({ index, componentKey }) => {
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
  const issFeedId = useMemo(
    () => IssFeed2.videoIdOverride || issLiveFeedVideoId2,
    [IssFeed2, issLiveFeedVideoId2],
  );

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={`https://www.youtube.com/embed/${issFeedId}?autoplay=${IssFeed2.autoPlay}&mute=${IssFeed2.mute}`}
            title="YouTube video player - Live High-Definition Views from ISS"
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
            {'Live High-Definition Views from the International Space Station'}
          </a>
        </p>
        <p>
          {
            'More information for the ISS HD Earth Viewing Experiment can be found here: '
          }
          <br />
          <a
            href="https://eol.jsc.nasa.gov/ESRS/HDEV/"
            target="_blank"
            rel="noreferrer"
          >
            {'NASA High Definition Earth-Viewing System'}
          </a>
        </p>
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
            <label htmlFor="issFeed2IdOverride">{'Video ID Override'}</label>
            <input
              type="text"
              placeholder={issLiveFeedVideoId2}
              autoComplete="off"
              data-1p-ignore
              {...register('issFeed2IdOverride', {
                value:
                  IssFeed2.videoIdOverride !== issLiveFeedVideoId2
                    ? IssFeed2.videoIdOverride
                    : '',
              })}
            />
          </FlexWrapper>
          <FlexWrapper flexDirection="row" alignItems="center" gap={12}>
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
