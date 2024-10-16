import React from 'react';
import { IssFeedBase } from 'src/components/panels/IssFeedBase';
import { PanelProps } from 'src/components/base';
import { useAppContext } from 'src/hooks';

export const IssFeed2: React.FC<Pick<PanelProps, 'index' | 'componentKey'>> = ({
  index,
  componentKey,
}) => {
  const { issLiveFeedVideoId2 } = useAppContext();

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
              href={`https://www.youtube-nocookie.com/watch?v=${issLiveFeedVideoId2}`}
              target="_blank"
              rel="noreferrer"
            >
              {'Live HD Views from the ISS'}
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
