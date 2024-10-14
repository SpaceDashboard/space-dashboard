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
        animation: growPulse 1.4s infinite ease-in-out;
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

    100% {
      left: 100%;
      right: 0%;
    }
  }
`;

const labelRightTextCss = css`
  font-variation-settings: 'wght' 100;
  opacity: 0.75;
`;

const neoDetailsModalCss = css`
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 20px;

  .close-modal span {
    height: 60% !important;
  }
`;

const ListLabel: React.FC<{
  mainLabel: string;
  subLabel: string;
}> = ({ mainLabel, subLabel }) => {
  return (
    <FlexWrapper
      alignItems="center"
      flexDirection="row"
      gap={12}
      justifyContent="space-between"
    >
      <strong>{mainLabel}</strong>
      <span className="label-divider"></span>
      <span className={labelRightTextCss}>{subLabel}</span>
    </FlexWrapper>
  );
};

const NeoDetailsModal: React.FC<{
  neo: any;
}> = ({ neo }) => {
  const min = (unit: string) => {
    return Number(neo.estimated_diameter[unit].estimated_diameter_min).toFixed(
      1,
    );
  };
  const max = (unit: string) => {
    return Number(neo.estimated_diameter[unit].estimated_diameter_max).toFixed(
      1,
    );
  };
  const isPotentiallyHazardous = neo.is_potentially_hazardous_asteroid
    ? 'Yes'
    : 'No';
  const estimatedDiameters = {
    km: `${min('kilometers')} - ${max('kilometers')}`,
    m: `${min('meters')} - ${max('meters')} m`,
    miles: `${min} - ${max('miles')} mi`,
    feet: `${min('feet')} - ${max('feet')} ft`,
  };
  return (
    <>
      <FlexWrapper flexDirection="row" alignItems="center" gap={10}>
        <h3 style={{ margin: 0 }}>{neo.name}</h3>
        <>&ndash;</>
        <a
          href={neo.nasa_jpl_url}
          target="_blank"
          rel="noreferrer"
          style={{ margin: 0 }}
        >
          {'NASA JPL URL'}
        </a>
      </FlexWrapper>
      <span>
        <strong>{'Distance: '}</strong>
        <br />
        {`${Number(neo.close_approach_data[0].miss_distance.lunar).toFixed(2)} LD`}
      </span>
      <span>
        <strong>{'Close Approach Date / Time: '}</strong>
        <br />
        {`${format(new Date(neo.close_approach_data[0].close_approach_date_full), 'd MMM yyyy @ HH:mm')} UTC`}
      </span>
      <span>
        <strong>{'Potentially Hazardous: '}</strong>
        <br />
        {`${isPotentiallyHazardous}`}
      </span>
      <span>
        <strong>{'Relative Velocity: '}</strong>
        <br />
        {`${Number(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(1)} km/h`}{' '}
        (
        {`${Number(neo.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(1)} mph`}
        )
      </span>
      <span>
        <strong>{'Estimated Diameter: '}</strong>
        <br />
        {neo.estimated_diameter.kilometers.estimated_diameter_min >= 1 ||
        neo.estimated_diameter.kilometers.estimated_diameter_max >= 1
          ? estimatedDiameters.km
          : estimatedDiameters.m}{' '}
        (
        {neo.estimated_diameter.miles.estimated_diameter_min >= 1 ||
        neo.estimated_diameter.miles.estimated_diameter_max >= 1
          ? estimatedDiameters.miles
          : estimatedDiameters.feet}
        )
      </span>
    </>
  );
};

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
              renderLabel={(item: any) => (
                <ListLabel
                  mainLabel={format(new UTCDate(item.date), 'dd MMMM yyyy')}
                  subLabel={`${item.neos.length} objects`}
                />
              )}
              renderDetails={(item: any) => {
                return (
                  <>
                    <FlexWrapper
                      flexDirection="row"
                      alignItems="center"
                      gap={10}
                    >
                      <h2 style={{ margin: 0 }}>
                        {format(new UTCDate(item.date), 'dd MMMM yyyy')}
                      </h2>
                      <>&ndash;</>
                      <p>{`${item.neos.length} objects`}</p>
                    </FlexWrapper>
                    <ListDetails
                      className={listDetailsCss}
                      items={item?.neos}
                      modalClassName={neoDetailsModalCss}
                      renderLabel={(neo: any) => (
                        <ListLabel
                          mainLabel={neo.name}
                          subLabel={`${Number(neo.close_approach_data[0].miss_distance.lunar).toFixed(2)} LD`}
                        />
                      )}
                      renderDetails={(neo: any) => (
                        <NeoDetailsModal neo={neo} />
                      )}
                    />
                  </>
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
              <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer">
                {'NASA API - Asteroids NeoWs: Near Earth Object Web Service'}
              </a>
            </p>
          </div>

          <div>
            <p>
              {'Additional information on small bodies can be found here: '}
            </p>
            <p>
              <a
                href="https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/"
                target="_blank"
                rel="noreferrer"
              >
                {'JPL - Small-Body Database Lookup'}
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
