import React from 'react';
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

const nearEarthObjectsKey = 'near-earth-objects';

const METERS_PER_KILOMETER = 1000;
const FEET_PER_MILE = 5280;

interface NearEarthObject {
  designation: string;
  jpl_url: string;
  close_approach: {
    epoch_ms: number;
    utc: string;
  };
  miss_distance: {
    lunar: number;
    kilometers: number;
    astronomical: number;
  };
  relative_velocity: {
    kilometers_per_second: number;
    kilometers_per_hour: number;
    miles_per_hour: number;
  };
  absolute_magnitude_h: number | null;
  estimated_diameter: {
    meters_min: number;
    meters_max: number;
    feet_min: number;
    feet_max: number;
  } | null;
  time_uncertainty: string | null;
}

interface NeoDay {
  date: string;
  objects: NearEarthObject[];
}

interface NeoFeed {
  signature: {
    version: string;
    source: string;
  };
  date_updated: string;
  window: {
    start: string;
    end: string;
  };
  max_lunar_distance: number;
  count: number;
  days: NeoDay[];
}

const neoDetailsModalCss = css`
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 20px;

  .close-modal span {
    height: 60% !important;
  }
`;

const NeoDetailsModal: React.FC<{
  neo: NearEarthObject;
}> = ({ neo }) => {
  const diameter = neo.estimated_diameter;

  // Metric and imperial each step up to the larger unit on their own terms, so
  // a rock can read in meters while its imperial range is already in miles.
  const metricDiameter = diameter
    ? diameter.meters_max >= METERS_PER_KILOMETER
      ? `${(diameter.meters_min / METERS_PER_KILOMETER).toFixed(1)} - ${(diameter.meters_max / METERS_PER_KILOMETER).toFixed(1)} km`
      : `${diameter.meters_min.toFixed(1)} - ${diameter.meters_max.toFixed(1)} m`
    : null;
  const imperialDiameter = diameter
    ? diameter.feet_max >= FEET_PER_MILE
      ? `${(diameter.feet_min / FEET_PER_MILE).toFixed(1)} - ${(diameter.feet_max / FEET_PER_MILE).toFixed(1)} mi`
      : `${diameter.feet_min.toFixed(1)} - ${diameter.feet_max.toFixed(1)} ft`
    : null;

  return (
    <FlexWrapper gap={10}>
      <FlexWrapper flexDirection="row" alignItems="center" gap={10}>
        <h3 style={{ margin: 0 }}>{neo.designation}</h3>
        &ndash;
        <a
          href={neo.jpl_url}
          target="_blank"
          rel="noreferrer"
          style={{ margin: 0 }}
        >
          {'NASA JPL URL'}
        </a>
      </FlexWrapper>
      <FlexWrapper gap={2}>
        <strong>{'Distance: '}</strong>
        {`${neo.miss_distance.lunar.toFixed(2)} LD`}
      </FlexWrapper>
      <FlexWrapper gap={2}>
        <strong>{'Close Approach Date / Time: '}</strong>
        {`${format(new UTCDate(neo.close_approach.epoch_ms), 'd MMM yyyy @ HH:mm')} UTC`}
      </FlexWrapper>
      <FlexWrapper gap={2}>
        <strong>{'Relative Velocity: '}</strong>
        <FlexWrapper flexDirection="row">
          <span>
            {`${neo.relative_velocity.kilometers_per_hour.toFixed(1)} km/h`}
          </span>
          <span>
            ({`${neo.relative_velocity.miles_per_hour.toFixed(1)} mph`})
          </span>
        </FlexWrapper>
      </FlexWrapper>
      {metricDiameter && imperialDiameter && (
        <FlexWrapper gap={2}>
          <strong>{'Estimated Diameter: '}</strong>
          <FlexWrapper flexDirection="row">
            <span>{metricDiameter}</span>
            <span>({imperialDiameter})</span>
          </FlexWrapper>
        </FlexWrapper>
      )}
    </FlexWrapper>
  );
};

export const NearEarthObjects: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const queryClient = useQueryClient();
  const getNeoData = async (): Promise<NeoFeed> => {
    const response = await axios
      .get(
        `${import.meta.env.VITE_API_URL}/v2/json/neo-feed.json?u=${getCurrentTimestamp()}`,
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
    queryKey: [nearEarthObjectsKey],
    queryFn: getNeoData,
  });

  const emptyData: NeoDay[] = Array(8).fill({
    date: '',
    objects: [],
  });

  // The feed arrives bucketed by day and sorted by distance, so it renders as-is.
  const nearEarthObjects = neoData?.days;

  const { resetTimer } = useAutoRefresh(
    () => {
      queryClient.invalidateQueries({
        queryKey: [nearEarthObjectsKey],
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
            renderLabel={(item: NeoDay) => (
              <ListLabel
                mainLabel={
                  item.date !== ''
                    ? format(new UTCDate(item.date), 'dd MMMM yyyy')
                    : '-'
                }
                subLabel={`${item.objects.length || '-'} objects`}
              />
            )}
            renderDetails={(item: NeoDay) => {
              if (!item) return <></>;
              return (
                <>
                  <FlexWrapper flexDirection="row" alignItems="center" gap={10}>
                    <h2 style={{ margin: 0 }}>
                      {format(new UTCDate(item.date), 'dd MMM yyyy')}
                    </h2>
                    &ndash;
                    <p>{`${item.objects.length} objects`}</p>
                  </FlexWrapper>
                  <ListDetails
                    items={item?.objects}
                    modalClassName={neoDetailsModalCss}
                    renderLabel={(neo: NearEarthObject) => (
                      <ListLabel
                        mainLabel={neo.designation}
                        subLabel={`${neo.miss_distance.lunar.toFixed(2)} LD`}
                      />
                    )}
                    renderDetails={(neo: NearEarthObject) => (
                      <NeoDetailsModal neo={neo} />
                    )}
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
              <a
                href="https://ssd-api.jpl.nasa.gov/doc/cad.html"
                target="_blank"
                rel="noreferrer"
              >
                {'NASA JPL - SBDB Close-Approach Data API'}
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
            queryKey: [nearEarthObjectsKey],
          });
          resetTimer();
          refetchNeoData();
        }}
      />
    </Panel>
  );
};
