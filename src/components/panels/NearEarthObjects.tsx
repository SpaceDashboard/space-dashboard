import React, { useMemo } from 'react';
import { css } from '@emotion/css';
import { UTCDate } from '@date-fns/utc';
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
  ListDetails,
} from 'src/components/base';
import { useAutoRefresh } from 'src/hooks';
import { getCurrentTimestamp } from 'src/shared/utils';

const listDetailsCss = css`
  .list-item {
    .label-divider {
      flex-grow: 1;
      height: 1px;
      position: relative;

      &::after {
        background: hsl(
          var(--base-blue-hue),
          var(--base-blue-saturation),
          calc(var(--base-blue-lightness) + 8%)
        );
        bottom: 0;
        content: '';
        height: 1px;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
      }
    }

    &:hover {
      .label-divider::after {
        animation: growPulse 1.6s infinite ease-in-out;
        opacity: 1;
      }
    }
  }

  @keyframes growPulse {
    0% {
      left: 0%;
      right: 100%;
    }

    20% {
      left: 0%;
      right: 100%;
    }

    50% {
      left: 0%;
      right: 0%;
    }

    80% {
      left: 100%;
      right: 0%;
    }

    100% {
      left: 100%;
      right: 0%;
    }
  }
`;

const objectsCountCss = css`
  font-variation-settings: 'wght' 100;
  opacity: 0.75;
`;

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
            <ListDetails
              className={listDetailsCss}
              items={nearEarthObjects}
              listHeader="Near Earth Objects"
              renderLabel={(item: any) => {
                return (
                  <FlexWrapper
                    alignItems="center"
                    flexDirection="row"
                    gap={12}
                    justifyContent="space-between"
                  >
                    <strong>
                      {format(new UTCDate(item.date), 'dd MMMM yyyy')}
                    </strong>
                    <span className="label-divider"></span>
                    <span
                      className={objectsCountCss}
                    >{`${item.neos.length} objects`}</span>
                  </FlexWrapper>
                );
              }}
              renderDetails={(item: any) => {
                return (
                  <div>
                    <h2>{format(new UTCDate(item.date), 'dd MMMM yyyy')}</h2>
                    {item?.neos?.map((neo: any) => (
                      <p key={neo.name}>
                        {neo.name}:{' '}
                        {Number(
                          neo.close_approach_data[0].miss_distance.lunar,
                        ).toFixed(2)}
                        {' LD'}
                      </p>
                    ))}
                  </div>
                );
              }}
            />
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
