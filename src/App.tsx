import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FlexWrapper } from './components/base';
import { NavBar } from 'src/components';
import { DeepSpaceNetwork } from './components/panels';
import { About, ContactForm, UserSettings } from 'src/components/modals';
import { useSettingsContext, useToast } from 'src/hooks';
import { columnPanelMap, MoveablePanels } from 'src/shared/PanelConfigs';

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
      panelConfigs,
    },
  } = useSettingsContext();
  const { ToastContainer } = useToast();
  const [isViewportLarge, setIsViewportLarge] = useState(true);

  const renderColumn = (
    componentOrder?: MoveablePanels[],
    previousCumulativeComponentCount = 0,
  ) => (
    <>
      {componentOrder?.map((componentName, index) => {
        const Component = columnPanelMap[componentName];
        const enabled = panelConfigs[componentName].enabled;
        if (!enabled) return null;
        return (
          <Component
            key={index}
            index={index + previousCumulativeComponentCount}
            componentKey={componentName}
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

  useEffect(() => {
    const handleResize = () => {
      setIsViewportLarge(window.innerWidth >= 1200);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
              {isViewportLarge ? (
                <>
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
                </>
              ) : (
                <div className="content-column">
                  {renderColumn(column1Order, 0)}
                  {renderColumn(column2Order, column1Order?.length)}
                  {renderColumn(
                    column3Order,
                    column1Order?.length + column2Order?.length,
                  )}
                </div>
              )}
            </div>
            {panelConfigs.DeepSpaceNetwork.enabled && (
              <DeepSpaceNetwork index={0} componentKey="DeepSpaceNetwork" />
            )}
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
