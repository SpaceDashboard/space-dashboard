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
