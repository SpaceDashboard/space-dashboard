import { PanelProps } from 'src/components/base';
import {
  IssFeed1,
  IssFeed2,
  IssTracker,
  PlanetaryKIndex,
  AuroraForecast,
  NearEarthObjects,
  Launches,
  Events,
  SolarVisual,
} from 'src/components/panels';

export type AvailablePanels =
  | 'IssFeed1'
  | 'IssFeed2'
  | 'IssTracker'
  | 'PlanetaryKIndex'
  | 'AuroraForecast'
  | 'NearEarthObjects'
  | 'Launches'
  | 'Events'
  | 'SolarVisual'
  | 'DeepSpaceNetwork';

export type MoveablePanels = Exclude<AvailablePanels, 'DeepSpaceNetwork'>;

type PanelMapType = Record<MoveablePanels, React.FC<PanelProps>>;
export const columnPanelMap: PanelMapType = {
  IssFeed1,
  IssFeed2,
  IssTracker,
  PlanetaryKIndex,
  AuroraForecast,
  NearEarthObjects,
  Launches,
  Events,
  SolarVisual,
};

export const defaultColumn1Order: MoveablePanels[] = [
  'IssFeed1',
  'IssFeed2',
  'Launches',
];
export const defaultColumn2Order: MoveablePanels[] = [
  'IssTracker',
  'SolarVisual',
  'NearEarthObjects',
];
export const defaultColumn3Order: MoveablePanels[] = [
  'PlanetaryKIndex',
  'AuroraForecast',
  'Events',
];

interface BasePanelConfig {
  label: string;
  enabled: boolean;
}

interface IssFeedConfig {
  autoPlay?: boolean;
  mute?: boolean;
  videoIdOverride?: string;
}

interface SolarVisualConfig {
  startWithVideo?: boolean;
}

interface AuroraForecastConfig {
  startWithSouthernHemisphere?: boolean;
  startWithVideo?: boolean;
}

// TODO: clean up types
export type PanelConfig = BasePanelConfig &
  IssFeedConfig &
  SolarVisualConfig &
  AuroraForecastConfig;

export const defaultPanelConfigs: Record<AvailablePanels, PanelConfig> = {
  IssFeed1: {
    label: 'Live Video from the ISS',
    enabled: true,
    autoPlay: false,
    mute: true,
    videoIdOverride: '',
  },
  IssFeed2: {
    label: 'Live HD Views from the ISS',
    enabled: true,
    autoPlay: false,
    mute: true,
    videoIdOverride: '',
  },
  IssTracker: {
    label: 'ISS Tracker',
    enabled: true,
  },
  PlanetaryKIndex: {
    label: 'Planetary K-Index',
    enabled: true,
  },
  AuroraForecast: {
    label: 'Aurora Forecast',
    enabled: true,
    startWithSouthernHemisphere: false,
    startWithVideo: false,
  },
  NearEarthObjects: {
    label: 'Near-Earth Objects',
    enabled: true,
  },
  Launches: {
    label: 'Upcoming Launches',
    enabled: true,
  },
  Events: {
    label: 'Upcoming Events',
    enabled: true,
  },
  SolarVisual: {
    label: 'The Sun Now',
    enabled: true,
    startWithVideo: false,
  },
  DeepSpaceNetwork: {
    label: 'Deep Space Network',
    enabled: true,
  },
};
