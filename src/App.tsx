import React, { useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { PanelProps, FlexWrapper } from './components/base';
import { NavBar } from 'src/components';
import {
  IssFeed1,
  IssFeed2,
  IssTracker,
  AuroraForecast,
  SolarVisual,
  DeepSpaceNetwork,
} from './components/panels';
import { About, ContactForm, UserSettings } from 'src/components/modals';
import { useSettingsContext, useToast } from 'src/hooks';

type ColumnMap = Record<string, React.FC<PanelProps>>;
const columnComponentMap: ColumnMap = {
  IssFeed1,
  IssFeed2,
  IssTracker,
  SolarVisual,
  AuroraForecast,
};

const contentCss = (reduceMotion: boolean, speedAdjustment: number) => css`
  --content--transition-duration: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s;
`;

export const App: React.FC = () => {
  const {
    settings: {
      animationSpeedAdjustment,
      reduceMotion,
      columnOneOrder,
      columnTwoOrder,
      columnThreeOrder,
    },
  } = useSettingsContext();
  const { ToastContainer } = useToast();

  const renderColumn = (
    componentOrder?: string[],
    previousCumulativeComponentCount = 0,
  ) => (
    <>
      {componentOrder?.map((componentName, index) => {
        const Component = columnComponentMap[componentName];
        return (
          <Component
            key={index}
            index={index + previousCumulativeComponentCount}
          />
        );
      })}
    </>
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
      <main className="content-wrapper">
        <About />
        <ContactForm />
        <UserSettings />
        <section
          className={cx(
            'content',
            contentCss(reduceMotion, animationSpeedAdjustment),
          )}
        >
          <FlexWrapper gap={20}>
            <div className="content-column-wrapper">
              <div className="content-column">
                {renderColumn(columnOneOrder, 0)}
              </div>
              <div className="content-column">
                {renderColumn(columnTwoOrder, columnOneOrder?.length)}
              </div>
              <div className="content-column">
                {renderColumn(
                  columnThreeOrder,
                  columnOneOrder?.length + columnTwoOrder?.length,
                )}
              </div>
            </div>
            <DeepSpaceNetwork index={0} />
          </FlexWrapper>
        </section>
      </main>
      <ReactTooltip
        id="space-dashboard-tooltip"
        className="sd-tooltip"
        classNameArrow="sd-tooltip-arrow"
      />
      <ToastContainer />
    </>
  );
};
