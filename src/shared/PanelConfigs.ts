import { PanelProps } from 'src/components/base';
import {
  IssFeed1,
  IssFeed2,
  IssTracker,
  PlanetaryKIndex,
  AuroraForecast,
  SolarVisual,
} from 'src/components/panels';

export type AvailablePanels =
  | 'IssFeed1'
  | 'IssFeed2'
  | 'IssTracker'
  | 'SolarVisual'
  | 'PlanetaryKIndex'
  | 'AuroraForecast'
  | 'DeepSpaceNetwork';

export type MoveablePanels = Exclude<AvailablePanels, 'DeepSpaceNetwork'>;

type PanelMapType = Record<MoveablePanels, React.FC<PanelProps>>;
export const columnPanelMap: PanelMapType = {
  IssFeed1,
  IssFeed2,
  IssTracker,
  SolarVisual,
  PlanetaryKIndex,
  AuroraForecast,
};

export const defaultColumn1Order: MoveablePanels[] = ['IssFeed1', 'IssFeed2'];
export const defaultColumn2Order: MoveablePanels[] = [
  'IssTracker',
  'SolarVisual',
];
export const defaultColumn3Order: MoveablePanels[] = ['PlanetaryKIndex','AuroraForecast'];

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
  SolarVisual: {
    label: 'The Sun Now',
    enabled: true,
    startWithVideo: false,
  },
  PlanetaryKIndex: {
    label: 'Planetary K-Index',
    enabled: true,
  },
  AuroraForecast: {
    label: 'Aurora Forecast',
    enabled: true,
    startWithSouthernHemisphere: false,
  },
  DeepSpaceNetwork: {
    label: 'Deep Space Network',
    enabled: true,
  },
};
