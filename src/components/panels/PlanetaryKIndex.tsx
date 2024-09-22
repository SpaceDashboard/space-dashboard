import React, { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { format } from 'date-fns';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  FadeFromBlack,
  Button,
  PlanetsLoader,
  FlexWrapper,
} from 'src/components/base';
import { UtcClock } from 'src/components';
import { useSettingsContext, useAutoRefresh } from 'src/hooks';

const planetaryKIndexCss = css`
  .corners-wrapper-content {
    gap: 0 !important;
  }
`;

const contentWrapperCss = css`
  background: hsla(
    var(--base-blue-hue),
    calc(var(--base-blue-saturation) - 5%),
    calc(var(--base-blue-lightness) - 15%),
    var(--panel--background-opacity)
  );
  border-radius: 10px;
  padding: 8px;
`;

const utcClockCss = css`
  background: hsla(
    var(--base-blue-hue),
    var(--base-blue-saturation),
    calc(var(--base-blue-lightness) - 2%),
    var(--panel--background-opacity)
  );
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 100;
  letter-spacing: 0.8px;
  padding: 6px;
`;

const currentKpIndexWrapperCss = css`
  background: hsla(
    var(--base-blue-hue),
    var(--base-blue-saturation),
    calc(var(--base-blue-lightness) - 5%),
    var(--panel--background-opacity)
  );
  border-radius: 6px;
  padding: 6px;
`;

const currentKpIndexCss = css`
  border-radius: 8px;
  padding: 6px;
`;

const titleCss = css`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 0.95;

  span:first-of-type {
    margin-right: 6px;
  }
`;

const updatedTimeCss = css`
  font-size: 0.8rem;
`;

const kpValueCss = css`
  font-size: 3rem;
  font-weight: 200;
  line-height: 1;
  opacity: 0.7;
  text-wrap: nowrap;
`;

const chartCss = css`
  border-radius: 0 0 8px 8px;
  font-size: 0.8rem;
  font-weight: 100;
  letter-spacing: 0.8px;
  padding: 6px;
`;

export const PlanetaryKIndex: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const {
    settings: {
      panelConfigs: { PlanetaryKIndex },
    },
  } = useSettingsContext();

  const getData = async (): Promise<any> => {
    // const response = await axios
    //   .get('/api/json/noaa-planetary-k-index.json', {
    //     timeout: 1000 * 10,
    //   })
    //   .then((res) => res.data);
    const response = await axios
      .get('/api/json/planetary-k-index-dst.json', {
        timeout: 1000 * 10,
      })
      .then((res) => res.data);
    return response;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['hourly-planetary-k-index'],
    queryFn: getData,
  });

  const currentKpData = useMemo(() => {
    return data
      ? {
          estimatedKp: data[data.length - 1].estimated_kp.toFixed(2),
          time: data[data.length - 1].time_tag,
        }
      : {
          estimatedKp: '-.--',
        };
  }, [data]);

  return (
    <Panel
      index={index}
      componentKey={componentKey}
      className={planetaryKIndexCss}
    >
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader showLoader={isFetching} />
          <FlexWrapper gap={0} className={contentWrapperCss}>
            <FlexWrapper
              alignItems="center"
              gap={4}
              className={currentKpIndexWrapperCss}
            >
              <FlexWrapper alignItems="center" className={utcClockCss}>
                <UtcClock />
              </FlexWrapper>
              <FlexWrapper
                alignItems="center"
                flexDirection="row"
                className={currentKpIndexCss}
              >
                <FlexWrapper
                  alignItems="flex-start"
                  flexDirection="column"
                  gap={4}
                >
                  <p className={titleCss}>
                    <span>{'Estimated'}</span>
                    <span>{'Kp Index'}</span>
                  </p>
                  <p
                    className={updatedTimeCss}
                  >{`As of ${currentKpData.time ? format(new Date(currentKpData.time), 'HH:mm:ss') : '--:--:--'} UTC`}</p>
                </FlexWrapper>
                <p className={kpValueCss}>{currentKpData.estimatedKp}</p>
              </FlexWrapper>
            </FlexWrapper>
            <FlexWrapper alignItems="center" className={chartCss}>
              <div
                style={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {'Chart goes here'}
              </div>
            </FlexWrapper>
          </FlexWrapper>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <p>
          {'Credit: '}
          <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noreferrer">
            {'Space Weather Prediction Center (SWPC)'}
          </a>
        </p>
      </PanelMenu>
      <PanelActions refreshData={refetch} />
    </Panel>
  );
};
