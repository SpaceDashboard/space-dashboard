import React from 'react';
import { IssFeedBase } from 'src/components/panels/IssFeedBase';
import { PanelProps } from 'src/components/base';
import { useVideoStatus } from 'src/hooks';

export const IssFeed2: React.FC<Pick<PanelProps, 'index' | 'componentKey'>> = ({
  index,
  componentKey,
}) => {
  const { data: videoStatus } = useVideoStatus();
  const videoId = videoStatus?.issLiveFeedVideoId2?.videoId || '';

  return (
    <IssFeedBase
      index={index}
      componentKey={componentKey}
      feedName="IssFeed2"
      menuContent={
        <>
          <p>
            {'Credit: '}
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noreferrer"
              title="Live Video from the International Space Station (Official NASA Stream)"
            >
              {'Live Video from the International Space Station'}
            </a>
          </p>
          <p>
            {
              'Watch live video from the International Space Station, including inside views when the crew aboard the space station is on duty, provided by NASA.'
            }
          </p>
        </>
      }
    />
  );
};
