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
  PlanetsLoader,
  FlexWrapper,
  ListDetails,
  ListLabel,
} from 'src/components/base';
import { useAutoRefresh } from 'src/hooks';
import { getCurrentTimestamp } from 'src/shared/utils';

const neoDetailsModalCss = css`
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 20px;

  .close-modal span {
    height: 60% !important;
  }
`;

const cleanName = (name: string) => {
  if (name.startsWith('(') && name.endsWith(')')) {
    return name.substring(1, name.length - 1);
  } else {
    return name;
  }
};

const NeoDetailsModal: React.FC<{
  neo: any;
}> = ({ neo }) => {
  const min = (unit: string) => {
    return Number(
      neo?.estimated_diameter[unit]?.estimated_diameter_min,
    ).toFixed(1);
  };
  const max = (unit: string) => {
    return Number(
      neo?.estimated_diameter[unit]?.estimated_diameter_max,
    ).toFixed(1);
  };
  const isPotentiallyHazardous = neo?.is_potentially_hazardous_asteroid
    ? 'Yes'
    : 'No';
  const estimatedDiameters = {
    km: `${min('kilometers')} - ${max('kilometers')}`,
    m: `${min('meters')} - ${max('meters')} m`,
    miles: `${min('miles')} - ${max('miles')} mi`,
    feet: `${min('feet')} - ${max('feet')} ft`,
  };
  return (
    <FlexWrapper gap={10}>
      <FlexWrapper flexDirection="row" alignItems="center" gap={10}>
        <h3 style={{ margin: 0 }}>{cleanName(neo?.name)}</h3>
        &ndash;
        <a
          href={neo?.nasa_jpl_url}
          target="_blank"
          rel="noreferrer"
          style={{ margin: 0 }}
        >
          {'NASA JPL URL'}
        </a>
      </FlexWrapper>
      <FlexWrapper gap={2}>
        <strong>{'Distance: '}</strong>
        {`${Number(neo?.close_approach_data[0]?.miss_distance?.lunar).toFixed(2)} LD`}
      </FlexWrapper>
      <FlexWrapper gap={2}>
        <strong>{'Close Approach Date / Time: '}</strong>
        {`${format(new UTCDate(neo?.close_approach_data[0]?.epoch_date_close_approach), 'd MMM yyyy @ HH:mm')} UTC`}
      </FlexWrapper>
      <FlexWrapper gap={2}>
        <strong>{'Potentially Hazardous: '}</strong>
        {`${isPotentiallyHazardous}`}
      </FlexWrapper>
      <FlexWrapper gap={2}>
        <strong>{'Relative Velocity: '}</strong>
        <FlexWrapper flexDirection="row">
          <span>
            {`${Number(neo?.close_approach_data[0]?.relative_velocity?.kilometers_per_hour).toFixed(1)} km/h`}
          </span>
          <span>
            (
            {`${Number(neo?.close_approach_data[0]?.relative_velocity?.miles_per_hour).toFixed(1)} mph`}
            )
          </span>
        </FlexWrapper>
      </FlexWrapper>
      <FlexWrapper gap={2}>
        <strong>{'Estimated Diameter: '}</strong>
        <FlexWrapper flexDirection="row">
          <span>
            {neo?.estimated_diameter?.kilometers.estimated_diameter_min >= 1 ||
            neo?.estimated_diameter?.kilometers.estimated_diameter_max >= 1
              ? estimatedDiameters.km
              : estimatedDiameters.m}
          </span>
          <span>
            (
            {neo?.estimated_diameter?.miles.estimated_diameter_min >= 1 ||
            neo?.estimated_diameter?.miles.estimated_diameter_max >= 1
              ? estimatedDiameters.miles
              : estimatedDiameters.feet}
            )
          </span>
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export const NearEarthObjects: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const queryClient = useQueryClient();
  const getNeoData = async (): Promise<any> => {
    const response = await axios
      .get(
        `${import.meta.env.VITE_API_URL}/json/neo-feed.json?u=${getCurrentTimestamp()}`,
        {
          timeout: 1000 * 10,
        },
      )
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

  const emptyData = Array(8).fill({
    date: '',
    neos: [],
  });

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
    1000 * 60 * 20, // 20 minutes
  );

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <PlanetsLoader showLoader={isFetchingNeoData} />
        <FlexWrapper>
          <ListDetails
            items={nearEarthObjects || emptyData}
            listHeader="Near Earth Objects"
            renderLabel={(item: any) => (
              <ListLabel
                mainLabel={
                  item.date !== ''
                    ? format(new UTCDate(item.date), 'dd MMMM yyyy')
                    : '-'
                }
                subLabel={`${item.neos.length || '-'} objects`}
              />
            )}
            renderDetails={(item: any) => {
              if (!item) return <></>;
              return (
                <>
                  <FlexWrapper flexDirection="row" alignItems="center" gap={10}>
                    <h2 style={{ margin: 0 }}>
                      {format(new UTCDate(item.date), 'dd MMM yyyy')}
                    </h2>
                    &ndash;
                    <p>{`${item.neos.length} objects`}</p>
                  </FlexWrapper>
                  <ListDetails
                    items={item?.neos}
                    modalClassName={neoDetailsModalCss}
                    renderLabel={(neo: any) => (
                      <ListLabel
                        mainLabel={cleanName(neo.name)}
                        subLabel={`${Number(neo.close_approach_data[0].miss_distance.lunar).toFixed(2)} LD`}
                      />
                    )}
                    renderDetails={(neo: any) => <NeoDetailsModal neo={neo} />}
                  />
                </>
              );
            }}
          />
        </FlexWrapper>
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
