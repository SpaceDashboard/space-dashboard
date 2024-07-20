import React, { useEffect } from 'react';
import { PanelProps } from './components/base';
import { NavBar } from 'src/components';
import {
  IssFeed1,
  IssFeed2,
  IssTracker,
  AuroraForecast,
  SolarVisual,
} from './components/panels';
import { About, ContactForm, UserSettings } from 'src/components';
import { useSettingsContext } from 'src/hooks';

type ColumnMap = Record<string, React.FC<PanelProps>>;
const columnComponentMap: ColumnMap = {
  IssFeed1,
  IssFeed2,
  IssTracker,
  SolarVisual,
  AuroraForecast,
};

export const App: React.FC = () => {
  const {
    settings: { columnOneOrder, columnTwoOrder, columnThreeOrder },
  } = useSettingsContext();

  const renderColumn = (
    componentOrder?: string[],
    previousCumulativeComponentCount = 0,
  ) => (
    <div>
      {componentOrder?.map((componentName, index) => {
        const Component = columnComponentMap[componentName];
        return (
          <Component
            key={index}
            index={index + previousCumulativeComponentCount}
          />
        );
      })}
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove('initial-load');
      document.body.removeAttribute('style');
    }, 300);
  }, []);

  return (
    <>
      <NavBar />
      <About />
      <ContactForm />
      <UserSettings />
      <main className="container">
        <div className="container-column">
          {renderColumn(columnOneOrder, 0)}
        </div>
        <div className="container-column">
          {renderColumn(columnTwoOrder, columnOneOrder?.length)}
        </div>
        <div className="container-column">
          {renderColumn(
            columnThreeOrder,
            columnOneOrder?.length + columnTwoOrder?.length,
          )}
        </div>
      </main>
    </>
  );
};
