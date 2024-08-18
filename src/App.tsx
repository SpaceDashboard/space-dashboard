import React, { useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FlexWrapper } from './components/base';
import { NavBar } from 'src/components';
import { DeepSpaceNetwork } from './components/panels';
import { About, ContactForm, UserSettings } from 'src/components/modals';
import { useSettingsContext, useToast } from 'src/hooks';
import { columnPanelMap } from 'src/shared/ColumnPanelMap';

const contentCss = (reduceMotion: boolean, speedAdjustment: number) => css`
  --content--transition-duration: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s;
`;

export const App: React.FC = () => {
  const {
    settings: {
      animationSpeedAdjustment,
      reduceMotion,
      column1Order,
      column2Order,
      column3Order,
    },
  } = useSettingsContext();
  const { ToastContainer } = useToast();

  const renderColumn = (
    componentOrder?: string[],
    previousCumulativeComponentCount = 0,
  ) => (
    <>
      {componentOrder?.map((componentName, index) => {
        const Component = columnPanelMap[componentName];
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
                {renderColumn(column1Order, 0)}
              </div>
              <div className="content-column">
                {renderColumn(column2Order, column1Order?.length)}
              </div>
              <div className="content-column">
                {renderColumn(
                  column3Order,
                  column1Order?.length + column2Order?.length,
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
