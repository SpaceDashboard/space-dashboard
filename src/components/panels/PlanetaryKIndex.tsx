import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
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
} from 'src/components/base';
import { useSettingsContext, useAutoRefresh } from 'src/hooks';
import { AuroraForecastSettings } from 'src/components/modals/UserSettings/panel-settings';

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
    const response = await axios
      .get('/api/json/noaa-planetary-k-index.json', {
        timeout: 1000 * 10,
      })
      .then((res) => res.data);
    return response;
  };

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['hourly-planetary-k-index'],
    queryFn: getData,
  });

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader showLoader={isFetching} />
          {data && !error && !isFetching && (
            <div>
              <p>{data[1][0]}</p>
              <p>{data[1][1]}</p>
            </div>
          )}
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <p>
          {'Credit: '}
          <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noreferrer">
            {'Space Weather Prediction Center (SWPC)'}
          </a>
        </p>
        <p>
          {'From SWPC:'}
          <br />
          {
            'Space Weather impacts numerous facets of everyday life, from where airplanes can safely fly, to how accurately a farmer plows his field. In addition, there are a large variety of phenomena that are driven by the variability of the sun over periods ranging from hours to years. SWPC provides information for novices and experts alike about the impacts and phenomena of Space Weather'
          }
        </p>
        <AuroraForecastSettings />
      </PanelMenu>
      <PanelActions refreshData={refetch} />
    </Panel>
  );
};
