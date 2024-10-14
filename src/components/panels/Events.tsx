import React from 'react';
import { css } from '@emotion/css';
import { format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  FadeFromBlack,
  PlanetsLoader,
  FlexWrapper,
  ListDetails,
} from 'src/components/base';
import { useAutoRefresh } from 'src/hooks';
import { getCurrentTimestamp } from 'src/shared/utils';

const eventDateTimeCss = css`
  font-size: 0.8rem;
  font-variation-settings: 'GRAD' -200;
  opacity: 0.8;
`;

const detailsModalHeaderCss = css`
  max-width: 90%;
`;

const eventImageCss = css`
  max-height: 140px;
  max-width: 200px;
`;

const DetailsModal: React.FC<{
  item: any;
}> = ({ item }) => {
  return (
    <FlexWrapper gap={12}>
      <h2 className={detailsModalHeaderCss}>{item.name}</h2>
      <FlexWrapper flexDirection="row">
        <FlexWrapper gap={12}>
          <FlexWrapper gap={2}>
            <strong>{'Date: '}</strong>
            {`${format(new UTCDate(item.date), 'dd MMM yyyy @ HH:mm:ss')} UTC`}
          </FlexWrapper>
          {item.vid_urls.length > 0 && (
            <FlexWrapper gap={2}>
              <strong>{'Webcast Link(s): '}</strong>
              <FlexWrapper gap={3}>
                {item.vid_urls.map((vid: any) => (
                  <a
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
            <strong>{'Event: '}</strong>
            {item.description}
          </FlexWrapper>
        </FlexWrapper>
        <img
          src={item.image.thumbnail_url}
          alt={item.image.name}
          className={eventImageCss}
        />
      </FlexWrapper>
    </FlexWrapper>
  );
};

export const Events: React.FC<PanelProps> = ({ index, componentKey }) => {
  const queryClient = useQueryClient();
  const getData = async (): Promise<any> => {
    const response = await axios
      .get(`/api/json/events-data.json?u=${getCurrentTimestamp()}`, {
        timeout: 1000 * 10,
      })
      .then((res) => res.data);
    return response;
  };

  const {
    data,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: getData,
  });

  const { resetTimer } = useAutoRefresh(
    () => {
      queryClient.invalidateQueries({
        queryKey: ['near-earth-objects'],
      });
      refetchData();
    },
    1000 * 60 * 20, // 20 minutes
  );

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader showLoader={isFetchingData} />
          <FlexWrapper>
            <ListDetails
              items={data && data.results}
              listHeader="Upcoming Events"
              renderLabel={(item: any) => (
                <FlexWrapper gap={4}>
                  <span>
                    <strong>{item.name}</strong>
                  </span>
                  <span className={eventDateTimeCss}>
                    {format(new UTCDate(item.date), 'dd MMMM yyyy')}
                  </span>
                </FlexWrapper>
              )}
              renderDetails={(item: any) => <DetailsModal item={item} />}
              maxHeight={370}
            />
          </FlexWrapper>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <FlexWrapper gap={12}>
          <div>
            <p>{'Credit: '}</p>
            <p>
              <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer">
                {'NASA API - Asteroids NeoWs: Near Earth Object Web Service'}
              </a>
            </p>
          </div>
        </FlexWrapper>
      </PanelMenu>
      <PanelActions
        refreshData={() => {
          queryClient.invalidateQueries({
            queryKey: ['upcoming-events'],
          });
          resetTimer();
          refetchData();
        }}
      />
    </Panel>
  );
};
