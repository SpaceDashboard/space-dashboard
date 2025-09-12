import React from 'react';
import { IssFeedBase } from 'src/components/panels/IssFeedBase';
import { PanelProps } from 'src/components/base';
import { useAppContext } from 'src/hooks';

export const IssFeed1: React.FC<Pick<PanelProps, 'index' | 'componentKey'>> = ({
  index,
  componentKey,
}) => {
  const { issLiveFeedVideoId1 } = useAppContext();

  return (
    <IssFeedBase
      index={index}
      componentKey={componentKey}
      feedName="IssFeed1"
      menuContent={
        <>
          <p>
            {'Credit: '}
            <a
              href={`https://www.youtube.com/watch?v=${issLiveFeedVideoId1}`}
              target="_blank"
              rel="noreferrer"
            >
              {'Livestream of Earth & Space'}
            </a>
          </p>
          <p>
            {'Watch Earth Live from space in 4K, provided by '}
            <a href="https://www.sen.com/" target="_blank" rel="noreferrer">
              {'Sen'}
            </a>
            .
          </p>
        </>
      }
    />
  );
};
