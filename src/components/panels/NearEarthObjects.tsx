import React, { useLayoutEffect, useMemo } from 'react';
import { css } from '@emotion/css';
import { format } from 'date-fns';
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
  TooltipWrapper,
  ListDetails,
} from 'src/components/base';
import { useAutoRefresh } from 'src/hooks';
import { getCurrentTimestamp } from 'src/shared/utils';

const items = [
  { id: '1', name: 'Item 1', details: 'Details for item 1...' },
  { id: '2', name: 'Item 2', details: 'Details for item 2...' },
  { id: '3', name: 'Item 3', details: 'Details for item 3...' },
];

export const NearEarthObjects: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const queryClient = useQueryClient();
  const getNeoData = async (): Promise<any> => {
    const response = await axios
      .get(`/api/json/neo-feed.json?u=${getCurrentTimestamp()}`, {
        timeout: 1000 * 10,
      })
      .then((res) => res.data);
    return response;
  };

  const {
    data: neoData,
    isFetching: isFetchingNeoData,
    refetch: refetchNeoData,
  } = useQuery({
    queryKey: ['near-earth-objects'],
    queryFn: getNeoData,
  });

  const sortByLunarDistance = (a: any, b: any) => {
    return (
      a.close_approach_data[0].miss_distance.lunar -
      b.close_approach_data[0].miss_distance.lunar
    );
  };

  const nearEarthObjects: any = useMemo(() => {
    if (neoData) {
      const data = Object.keys(neoData.near_earth_objects).map((date) => {
        const neos = neoData.near_earth_objects[date]
          .filter(
            (obj: any) => obj.close_approach_data[0].miss_distance.lunar < 100,
          )
          .sort(sortByLunarDistance);
        return {
          date,
          neos,
        };
      });
      return data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    }
  }, [neoData]);

  const { resetTimer } = useAutoRefresh(
    () => {
      queryClient.invalidateQueries({
        queryKey: ['near-earth-objects'],
      });
      refetchNeoData();
    },
    1000 * 60 * 5, // 5 minutes
  );

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader showLoader={isFetchingNeoData} />
          <FlexWrapper>
            {/* TEST */}
            <ListDetails items={items} />

            {/* {nearEarthObjects &&
              nearEarthObjects.map((obj: any) => (
                <div key={obj.date}>
                  <h3>
                    {obj.date}: {obj.neos.length}
                  </h3>
                  {obj.neos.map((neo: any) => (
                    <p style={{ fontSize: '0.6rem' }} key={neo.name}>
                      {neo.name}:{' '}
                      {Number(
                        neo.close_approach_data[0].miss_distance.lunar,
                      ).toFixed(2)}
                    </p>
                  ))}
                </div>
              ))} */}
          </FlexWrapper>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <FlexWrapper gap={12}>
          <div>
            <p>{'Credit: '}</p>
            <p>
              <a
                href="https://www.swpc.noaa.gov/"
                target="_blank"
                rel="noreferrer"
              >
                {'Space Weather Prediction Center (SWPC)'}
              </a>
            </p>
            <p>
              <a
                href="https://www.swpc.noaa.gov/products/planetary-k-index"
                target="_blank"
                rel="noreferrer"
              >
                {'SWPC - Planetary K-index'}
              </a>
            </p>
          </div>
        </FlexWrapper>
      </PanelMenu>
      <PanelActions
        refreshData={() => {
          queryClient.invalidateQueries({
            queryKey: ['near-earth-objects'],
          });
          resetTimer();
          refetchNeoData();
        }}
      />
    </Panel>
  );
};
