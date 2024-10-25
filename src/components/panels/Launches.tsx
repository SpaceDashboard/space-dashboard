import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { differenceInSeconds, format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  PlanetsLoader,
  CornersWrapper,
  FlexWrapper,
  ListDetails,
} from 'src/components/base';
import { useAutoRefresh } from 'src/hooks';
import { getCurrentTimestamp } from 'src/shared/utils';

const launchDateTimeCss = css`
  font-size: 0.8rem;
  font-variation-settings: 'GRAD' -200;
  opacity: 0.8;
`;

const detailsModalHeaderCss = css`
  margin-bottom: 12px;
  max-width: 90%;
`;

const launchImageCss = css`
  max-height: 140px;
  max-width: 140px;
`;

const countdownTimerCss = css`
  font-variation-settings: 'GRAD' -200;
  white-space: nowrap;

  .separator {
    opacity: 0.8;
  }
`;

const CountdownTimer = ({
  netT0,
  fontSizeRem = 0.8,
}: {
  netT0: number;
  fontSizeRem?: number;
}) => {
  const targetDate = new UTCDate(netT0).getTime();
  const [timeDiff, setTimeDiff] = useState<number>(() =>
    differenceInSeconds(targetDate, Date.now()),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDiff(differenceInSeconds(targetDate, Date.now()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const formatTime = (seconds: number): JSX.Element => {
    const absSeconds = Math.abs(seconds);
    const hrs = Math.floor(absSeconds / 3600);
    const mins = Math.floor((absSeconds % 3600) / 60);
    const secs = absSeconds % 60;
    return hrs >= 24 ? (
      <span className="day">{`${Math.floor(hrs / 24).toString()} Days`}</span>
    ) : (
      <>
        <span className="hour">{hrs.toString().padStart(2, '0')}</span>
        <span className="separator">:</span>
        <span className="minute">{mins.toString().padStart(2, '0')}</span>
        <span className="separator">:</span>
        <span className="second">{secs.toString().padStart(2, '0')}</span>
      </>
    );
  };

  const prefix = timeDiff >= 0 ? '-' : '+';
  const formattedTime = formatTime(timeDiff);

  return (
    <span
      className={cx(
        countdownTimerCss,
        css`
          font-size: ${fontSizeRem}rem;
        `,
      )}
    >
      {prefix}
      {formattedTime}
    </span>
  );
};

const DetailsModal: React.FC<{
  item: any;
}> = ({ item }) => {
  return (
    <FlexWrapper className="panel-data-details-modal" gap={12}>
      <h2 className={detailsModalHeaderCss}>{item.name}</h2>
      <FlexWrapper flexDirection="row" gap={16}>
        <FlexWrapper gap={12}>
          <FlexWrapper gap={2}>
            <strong>{'Countdown to Launch: '}</strong>
            <CountdownTimer netT0={item.net} fontSizeRem={1} />
          </FlexWrapper>
          <FlexWrapper gap={2}>
            <strong>{'Estimated T-0: '}</strong>
            {`${format(new UTCDate(item.net), 'dd MMM yyyy @ HH:mm:ss')} UTC`}
          </FlexWrapper>
          <FlexWrapper gap={2}>
            <strong>{'Status: '}</strong>
            {item.status.name}
          </FlexWrapper>
        </FlexWrapper>
        <CornersWrapper size={8}>
          <img
            src={item.image.thumbnail_url}
            alt={item.image.name}
            className={launchImageCss}
          />
        </CornersWrapper>
      </FlexWrapper>
      {item.vid_urls.length > 0 && (
        <FlexWrapper gap={2}>
          <strong>{'Webcast Link(s): '}</strong>
          <FlexWrapper gap={3}>
            {item.vid_urls.map((vid: any) => (
              <a
                key={vid.url}
                href={vid.url}
                target="_blank"
                rel="noreferrer"
                style={{ margin: 0 }}
              >
                {`${vid.publisher} - ${vid.source}`}
              </a>
            ))}
          </FlexWrapper>
        </FlexWrapper>
      )}
      <FlexWrapper gap={2}>
        <strong>{'Mission: '}</strong>
        {item.mission.description}
      </FlexWrapper>
    </FlexWrapper>
  );
};

export const Launches: React.FC<PanelProps> = ({ index, componentKey }) => {
  const queryClient = useQueryClient();
  const getData = async (): Promise<any> => {
    const response = await axios
      .get(
        `${import.meta.env.VITE_API_URL}/json/launch-data.json?u=${getCurrentTimestamp()}`,
        {
          timeout: 1000 * 10,
        },
      )
      .then((res) => res.data);
    return response;
  };

  const emptyData = Array(50).fill({
    name: '-',
    net: '',
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['upcoming-launches'],
    queryFn: getData,
  });

  const { resetTimer } = useAutoRefresh(
    () => {
      queryClient.invalidateQueries({
        queryKey: ['near-earth-objects'],
      });
      refetch();
    },
    1000 * 60 * 20, // 20 minutes
  );

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <PlanetsLoader showLoader={isFetching} />
        <FlexWrapper>
          <ListDetails
            items={data ? data.results : emptyData}
            listHeader="Upcoming Launches"
            renderLabel={(item: any) => (
              <FlexWrapper
                alignItems="center"
                flexDirection="row"
                gap={4}
                justifyContent="space-between"
              >
                <FlexWrapper gap={4}>
                  <span>
                    <strong>{item.name}</strong>
                  </span>
                  <span className={launchDateTimeCss}>
                    {item.net !== ''
                      ? `${format(new UTCDate(item.net), 'dd MMMM yyyy @ HH:mm:ss')} UTC`
                      : '-'}
                  </span>
                </FlexWrapper>
                {item.net !== '' ? (
                  <CountdownTimer netT0={item.net} />
                ) : (
                  <>{'-'}</>
                )}
              </FlexWrapper>
            )}
            renderDetails={(item: any) => {
              if (!data) return <></>;
              return <DetailsModal item={item} />;
            }}
            maxHeight={370}
          />
        </FlexWrapper>
      </PanelBody>
      <PanelMenu>
        <FlexWrapper gap={12}>
          <div>
            <p>{'Credit: '}</p>
            <p>
              <a
                href="https://lldev.thespacedevs.com/2.3.0/launches/upcoming/"
                target="_blank"
                rel="noreferrer"
              >
                {'The Space Devs - Upcoming Launch List'}
              </a>
            </p>
          </div>
        </FlexWrapper>
      </PanelMenu>
      <PanelActions
        refreshData={() => {
          queryClient.invalidateQueries({
            queryKey: ['upcoming-launches'],
          });
          resetTimer();
          refetch();
        }}
      />
    </Panel>
  );
};
