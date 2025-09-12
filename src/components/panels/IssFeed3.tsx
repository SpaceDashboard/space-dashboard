import React from 'react';
import { IssFeedBase } from 'src/components/panels/IssFeedBase';
import { PanelProps } from 'src/components/base';
import { useAppContext } from 'src/hooks';

export const IssFeed3: React.FC<Pick<PanelProps, 'index' | 'componentKey'>> = ({
  index,
  componentKey,
}) => {
  const { issLiveFeedVideoId3 } = useAppContext();

  return (
    <IssFeedBase
      index={index}
      componentKey={componentKey}
      feedName="IssFeed3"
      menuContent={
        <>
          <p>
            {'Credit: '}
            <a
              href={`https://www.youtube.com/watch?v=${issLiveFeedVideoId3}`}
              target="_blank"
              rel="noreferrer"
              title="Live High-Definition Views from the International Space Station (Official NASA Stream)"
            >
              {
                'Live High-Definition Views from the International Space Station'
              }
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
        </>
      }
    />
  );
};
