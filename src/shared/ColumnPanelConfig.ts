import { PanelProps } from '../components/base';
import {
  IssFeed1,
  IssFeed2,
  IssTracker,
  AuroraForecast,
  SolarVisual,
} from '../components/panels';

export type PanelMapType = Record<string, React.FC<PanelProps>>;
export const columnPanelMap: PanelMapType = {
  IssFeed1,
  IssFeed2,
  IssTracker,
  SolarVisual,
  AuroraForecast,
};

export const defaultColumn1Order = ['IssFeed1', 'IssFeed2'];
export const defaultColumn2Order = ['IssTracker', 'SolarVisual'];
export const defaultColumn3Order = ['AuroraForecast'];

export const panelLabelByComponentName: Record<string, string> = {
  IssFeed1: 'Live Video from the ISS',
  IssFeed2: 'Live HD Views from the ISS',
  IssTracker: 'ISS Tracker',
  SolarVisual: 'The Sun Now',
  AuroraForecast: 'Aurora Forecast',
};
