import React, { useMemo } from 'react';
import { css } from '@emotion/css';
import { format } from 'date-fns';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
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
} from 'src/components/base';
import { UtcClock } from 'src/components';
import { useSettingsContext, useAutoRefresh } from 'src/hooks';
import { geoStormByKIndex, colorByGeoStorm } from 'src/shared/utils';

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

const currentKIndexWrapperCss = css`
  background: hsla(
    var(--base-blue-hue),
    var(--base-blue-saturation),
    calc(var(--base-blue-lightness) - 5%),
    var(--panel--background-opacity)
  );
  border-radius: 6px;
  padding: 6px;
`;

const currentKIndexCss = css`
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
  align-items: center;
  display: flex;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 0.8;
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

const kpChartTooltipCss = css`
  background-color: #222;
  border-radius: 6px;
  padding: 6px 10px;

  .time,
  .value {
    font-size: 0.8rem;
  }
`;

const geoStormCss = (geoStormColor: string, size: 'small' | 'large') => css`
  background-color: #222;
  border-radius: ${size === 'small' ? '3px' : '8px'};
  border: 1px solid ${geoStormColor};
  box-sizing: border-box;
  color: ${geoStormColor};
  display: inline-block;
  font-size: ${size === 'small' ? '80%' : '64%'};
  font-weight: 400;
  margin: ${size === 'large' ? '2px' : '0px'} 10px 0;
  padding: ${size === 'small' ? '1px 3px' : '4px 6px'};
`;

const getBarColor = (kp: string) => {
  const green = '#1DFF00';
  const yellow = '#FFDD00';
  const red = '#FF381F';
  const kpNum = Math.floor(Number(kp));
  if (kpNum < 4) {
    return green;
  } else if (kpNum === 4) {
    return yellow;
  } else {
    return red;
  }
};

const KIndexChart = ({ data = [] }) => {
  const chartData = data.slice(1).map((item) => ({
    time: item[0],
    kp: item[1],
  }));

  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart
        data={chartData}
        margin={{ top: 15, right: 10, bottom: 0, left: -28 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#222"
          verticalCoordinatesGenerator={(props) => [props.width - 10]}
        />
        <XAxis
          dataKey="time"
          tickFormatter={(date) => format(date, 'd MMM yyyy')}
        />
        <YAxis
          interval={0}
          tickCount={10}
          domain={[
            0,
            (dataMax: number) => (dataMax > 9 ? Math.ceil(dataMax) : 9),
          ]}
        />
        <Tooltip
          cursor={{ fill: '#444' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className={kpChartTooltipCss}>
                  <p className="time">{`${format(payload[0].payload.time, 'd MMM yyyy @ HH:mm:ss')} UTC`}</p>
                  <p className="value">
                    {`Estimated K-index: ${payload[0].payload.kp}`}
                    {Number(payload[0].payload.kp) >= 5 && (
                      <GeoStorm kpIndex={payload[0].payload.kp} size="small" />
                    )}
                  </p>
                </div>
              );
            }
          }}
        />
        <Bar
          dataKey="kp"
          fill="#444"
          name="K-Index"
          shape={(props: any) => {
            return <rect {...props} fill={getBarColor(props.payload.kp)} />;
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const GeoStorm: React.FC<{
  kpIndex?: string | number;
  size?: 'small' | 'large';
}> = ({ kpIndex = 0, size = 'large' }) => {
  const storm = geoStormByKIndex(Number(kpIndex));
  const stormColor = colorByGeoStorm(storm);
  return (
    <TooltipWrapper title="Geomagnetic storm value" placement="bottom">
      <div className={geoStormCss(stormColor, size)}>{storm}</div>
    </TooltipWrapper>
  );
};

export const PlanetaryKIndex: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const {
    settings: {
      panelConfigs: { PlanetaryKIndex },
    },
  } = useSettingsContext();

  const getLiveData = async (): Promise<any> => {
    const response = await axios
      .get('/api/json/planetary-k-index-dst.json', {
        timeout: 1000 * 10,
      })
      .then((res) => res.data);
    return response;
  };

  const getHourlyData = async (): Promise<any> => {
    const response = await axios
      .get('/api/json/noaa-planetary-k-index.json', {
        timeout: 1000 * 10,
      })
      .then((res) => res.data);
    return response;
  };

  const {
    data: liveData,
    isFetching: isFetchingLiveData,
    refetch: refetchLiveData,
  } = useQuery({
    queryKey: ['current-planetary-k-index'],
    queryFn: getLiveData,
  });

  const {
    data: chartData,
    isFetching: isFetchingChartData,
    refetch: refetchChartData,
  } = useQuery({
    queryKey: ['hourly-planetary-k-index'],
    queryFn: getHourlyData,
  });

  const currentKpData: { estimatedKp: string; time?: string } = useMemo(() => {
    return liveData
      ? {
          estimatedKp: liveData[liveData.length - 1].estimated_kp.toFixed(2),
          time: liveData[liveData.length - 1].time_tag,
        }
      : {
          estimatedKp: '-.--',
        };
  }, [liveData]);

  const { resetTimer: resetLiveDataTimer } = useAutoRefresh(
    refetchLiveData,
    60000 * 5,
  ); // 5 minutes
  const { resetTimer: resetChartDataTimer } = useAutoRefresh(
    refetchChartData,
    60000 * 10,
  ); // 10 minutes

  return (
    <Panel
      index={index}
      componentKey={componentKey}
      className={planetaryKIndexCss}
    >
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader
            showLoader={isFetchingLiveData || isFetchingChartData}
          />
          <FlexWrapper gap={0} className={contentWrapperCss}>
            <FlexWrapper
              alignItems="center"
              gap={4}
              className={currentKIndexWrapperCss}
            >
              <FlexWrapper alignItems="center" className={utcClockCss}>
                <UtcClock />
              </FlexWrapper>
              <FlexWrapper
                alignItems="center"
                flexDirection="row"
                className={currentKIndexCss}
              >
                <FlexWrapper
                  alignItems="flex-start"
                  flexDirection="column"
                  gap={4}
                >
                  <p className={titleCss}>{'Current Kp'}</p>
                  <p
                    className={updatedTimeCss}
                  >{`Estimate as of ${currentKpData.time ? format(new Date(currentKpData.time), 'HH:mm') : '--:--'} UTC`}</p>
                </FlexWrapper>
                <p className={kpValueCss}>
                  {Number(currentKpData.estimatedKp) >= 5 && (
                    <GeoStorm kpIndex={currentKpData.estimatedKp} />
                  )}
                  {currentKpData.estimatedKp}
                </p>
              </FlexWrapper>
            </FlexWrapper>
            <FlexWrapper alignItems="center" className={chartCss}>
              <KIndexChart data={chartData} />
            </FlexWrapper>
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

          <div>
            <h4>{'Geomagnetic storms by K-index'}</h4>
            <p>
              <strong>G1:</strong> 5
            </p>
            <p>
              <strong>G2:</strong> 6
            </p>
            <p>
              <strong>G3:</strong> 7
            </p>
            <p>
              <strong>G4:</strong> 8-9
            </p>
            <p>
              <strong>G5:</strong> 9+
            </p>
          </div>

          <p>
            {
              'For more information on NOAA scales for geomagnetic storms, visit: '
            }
            <br />
            <a
              href="https://www.swpc.noaa.gov/noaa-scales-explanation"
              target="_blank"
              rel="noreferrer"
            >
              {'NOAA Space Weather Scales'}
            </a>
          </p>
        </FlexWrapper>
      </PanelMenu>
      <PanelActions
        refreshData={() => {
          refetchLiveData();
          resetLiveDataTimer();
          refetchChartData();
          resetChartDataTimer();
        }}
      />
    </Panel>
  );
};
