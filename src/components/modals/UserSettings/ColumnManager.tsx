import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  IconChevronCompactUp,
  IconChevronCompactRight,
  IconChevronCompactDown,
  IconChevronCompactLeft,
} from '@tabler/icons-react';
import { useSettingsContext } from 'src/hooks';
import {
  Button,
  CornersWrapper,
  FlexWrapper,
  Toggle,
} from 'src/components/base';
import {
  columnPanelMap,
  defaultPanelConfigs,
  AvailablePanels,
  MoveablePanels,
} from 'src/shared/PanelConfigs';

const CARD_HEIGHT = 160;
const DEFAULT_CARD_WIDTH = 300;
const COLUMN_GAP = 20;
const ROW_GAP = 20;

const wrapperCss = (reduceMotion: boolean, reduceTransparency: boolean) => css`
  --column-manager--background-opacity: ${reduceTransparency
    ? 1
    : 0.4} !important;
  --column-manager--transition-duration: ${reduceMotion ? 0 : 0.3}s !important;
`;

const columnWrapperCss = css`
  margin-left: calc(${COLUMN_GAP}px / 1.25);
`;

const columnCardCss = css`
  height: ${CARD_HEIGHT}px;
`;

const arrowButtonCss = (location: 'topBottom' | 'leftRight') => css`
  height: ${location === 'topBottom' ? 25 : CARD_HEIGHT - 30}px;
  width: ${location === 'topBottom' ? '100%' : '25px'};
`;

const columnManagerButtonWrapperCss = css`
  > button {
    max-width: 150px;
    width: 100%;
  }
`;

interface PanelPosition {
  columnIndex: number;
  rowIndex: number;
}

const getMaxPanelsInColumn = (panelPositions: {
  [key: string]: PanelPosition;
}): number => {
  const columnCounts = [0, 0, 0];
  Object.values(panelPositions).forEach(({ columnIndex }) => {
    columnCounts[columnIndex]++;
  });
  return Math.max(...columnCounts);
};

export const ColumnManager: React.FC = () => {
  const {
    settings: {
      column1Order,
      column2Order,
      column3Order,
      panelConfigs,
      reduceMotion,
      reduceTransparency,
    },
    defaultSettings: {
      column1Order: defaultColumn1Order,
      column2Order: defaultColumn2Order,
      column3Order: defaultColumn3Order,
    },
    updateSettings,
    updatePanelConfigs,
  } = useSettingsContext();
  const managerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(200);
  const [panelPositions, setPanelPositions] = useState<{
    [key: string]: PanelPosition;
  }>({});
  const [originalPositions, setOriginalPositions] = useState<{
    [key: string]: PanelPosition;
  }>({});
  const [modified, setModified] = useState<boolean>(false);

  const maxPanelsInColumn = useMemo(
    () => getMaxPanelsInColumn(panelPositions),
    [panelPositions],
  );

  const wrapperHeight = useMemo(
    () => maxPanelsInColumn * (CARD_HEIGHT + ROW_GAP),
    [maxPanelsInColumn],
  );

  useEffect(() => {
    const handleResize = () => {
      if (!managerRef.current) return;
      if (managerRef.current?.offsetWidth < 670) setCardWidth(135);
      else if (managerRef.current?.offsetWidth < 780) setCardWidth(160);
      else if (managerRef.current?.offsetWidth < 870) setCardWidth(180);
      else if (managerRef.current?.offsetWidth < 960) setCardWidth(210);
      else if (managerRef.current?.offsetWidth < 1050) setCardWidth(240);
      else if (managerRef.current?.offsetWidth < 1140) setCardWidth(270);
      else setCardWidth(DEFAULT_CARD_WIDTH);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const initialPositions: { [key: string]: PanelPosition } = {};
    const allPanels = Object.keys(columnPanelMap);

    const setPositions = (columnOrder: string[], columnIndex: number) => {
      columnOrder.forEach((panel, rowIndex) => {
        initialPositions[panel] = { columnIndex, rowIndex };
      });
    };

    setPositions(column1Order, 0);
    setPositions(column2Order, 1);
    setPositions(column3Order, 2);

    allPanels.forEach((panel, index) => {
      if (!initialPositions[panel]) {
        initialPositions[panel] = { columnIndex: 2, rowIndex: index };
      }
    });

    setPanelPositions(initialPositions);
    setOriginalPositions(initialPositions);
  }, [column1Order, column2Order, column3Order]);

  const checkIfModified = () => {
    const isModified = Object.keys(panelPositions).some(
      (panel) =>
        panelPositions[panel].columnIndex !==
          originalPositions[panel].columnIndex ||
        panelPositions[panel].rowIndex !== originalPositions[panel].rowIndex,
    );
    setModified(isModified);
  };

  useEffect(() => {
    checkIfModified();
  }, [panelPositions]);

  const applyChanges = () => {
    const newColumn1Order = Object.keys(panelPositions)
      .filter((panel) => panelPositions[panel].columnIndex === 0)
      .sort(
        (a, b) => panelPositions[a].rowIndex - panelPositions[b].rowIndex,
      ) as MoveablePanels[];

    const newColumn2Order = Object.keys(panelPositions)
      .filter((panel) => panelPositions[panel].columnIndex === 1)
      .sort(
        (a, b) => panelPositions[a].rowIndex - panelPositions[b].rowIndex,
      ) as MoveablePanels[];

    const newColumn3Order = Object.keys(panelPositions)
      .filter((panel) => panelPositions[panel].columnIndex === 2)
      .sort(
        (a, b) => panelPositions[a].rowIndex - panelPositions[b].rowIndex,
      ) as MoveablePanels[];

    updateSettings({
      column1Order: newColumn1Order,
      column2Order: newColumn2Order,
      column3Order: newColumn3Order,
    });
  };

  // Reset any changes made
  const resetChanges = () => {
    setPanelPositions(originalPositions);
    setModified(false);
  };

  // Reset to default column settings
  const resetToDefaults = () => {
    setPanelPositions(originalPositions);
    updateSettings({
      column1Order: defaultColumn1Order,
      column2Order: defaultColumn2Order,
      column3Order: defaultColumn3Order,
      panelConfigs: defaultPanelConfigs,
    });
    setModified(false);
  };

  // High level function to move a panel
  const movePanel = (
    panel: string,
    direction: 'up' | 'down' | 'left' | 'right',
  ) => {
    const { columnIndex, rowIndex } = panelPositions[panel];

    if (direction === 'up' && rowIndex > 0) {
      swapPanels(panel, columnIndex, rowIndex, columnIndex, rowIndex - 1);
    }

    if (direction === 'down') {
      const panelsInSameColumn = Object.entries(panelPositions).filter(
        ([, pos]) => pos.columnIndex === columnIndex,
      ).length;
      if (rowIndex < panelsInSameColumn - 1) {
        swapPanels(panel, columnIndex, rowIndex, columnIndex, rowIndex + 1);
      }
    }

    if (direction === 'left' && columnIndex > 0) {
      movePanelToColumn(panel, columnIndex - 1);
    }

    if (direction === 'right' && columnIndex < 2) {
      movePanelToColumn(panel, columnIndex + 1);
    }
  };

  // Function to swap two panels
  const swapPanels = (
    panel1: string,
    columnIndex1: number,
    rowIndex1: number,
    columnIndex2: number,
    rowIndex2: number,
  ) => {
    const panel2 = Object.keys(panelPositions).find(
      (key) =>
        panelPositions[key].columnIndex === columnIndex2 &&
        panelPositions[key].rowIndex === rowIndex2,
    );

    if (!panel2) return;

    setPanelPositions((prevPositions) => ({
      ...prevPositions,
      [panel1]: { columnIndex: columnIndex2, rowIndex: rowIndex2 },
      [panel2]: { columnIndex: columnIndex1, rowIndex: rowIndex1 },
    }));
  };

  // Function to move a panel to a new column
  const movePanelToColumn = (panel: string, newColumnIndex: number) => {
    const oldPosition = panelPositions[panel];
    const panelsInNewColumn = Object.entries(panelPositions).filter(
      ([, pos]) => pos.columnIndex === newColumnIndex,
    ).length;

    setPanelPositions((prevPositions) => ({
      ...prevPositions,
      [panel]: { columnIndex: newColumnIndex, rowIndex: panelsInNewColumn },
    }));

    Object.entries(panelPositions).forEach(([key, pos]) => {
      if (
        pos.columnIndex === oldPosition.columnIndex &&
        pos.rowIndex > oldPosition.rowIndex
      ) {
        setPanelPositions((prevPositions) => ({
          ...prevPositions,
          [key]: { columnIndex: pos.columnIndex, rowIndex: pos.rowIndex - 1 },
        }));
      }
    });
  };

  // Function to render the panels, specifying top/left positions via row and column index
  const renderItems = () => {
    return Object.keys(columnPanelMap)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .map((panel) => {
        const position = panelPositions[panel];

        if (!position) {
          return null;
        }

        const { columnIndex, rowIndex } = position;
        const top = rowIndex * (CARD_HEIGHT + ROW_GAP);
        const left = columnIndex * (cardWidth + COLUMN_GAP);

        const isModified =
          columnIndex !== originalPositions[panel].columnIndex ||
          rowIndex !== originalPositions[panel].rowIndex;

        return (
          <div
            key={panel}
            className={cx(
              'column-manager-card',
              columnCardCss,
              isModified && 'modified',
            )}
            style={{ top, left, width: cardWidth }}
          >
            <FlexWrapper
              gap={0}
              alignItems="center"
              flexDirection="row"
              style={{ height: '100%', padding: '0 5px' }}
            >
              <button
                className={cx('card-arrow-button', arrowButtonCss('leftRight'))}
                onClick={() => movePanel(panel, 'left')}
                disabled={columnIndex === 0}
              >
                <IconChevronCompactLeft />
              </button>

              <FlexWrapper
                gap={4}
                alignItems="center"
                justifyContent="space-between"
                style={{ height: 'calc(100% - 10px)' }}
              >
                <button
                  className={cx(
                    'card-arrow-button',
                    arrowButtonCss('topBottom'),
                  )}
                  onClick={() => movePanel(panel, 'up')}
                  disabled={rowIndex === 0}
                >
                  <IconChevronCompactUp />
                </button>

                <div style={{ padding: '0 8px' }}>
                  <FlexWrapper gap={8} alignItems="center">
                    {defaultPanelConfigs[panel as AvailablePanels].label}
                    <Toggle
                      ariaLabel="Enable panel"
                      checked={panelConfigs[panel as AvailablePanels].enabled}
                      onChange={() =>
                        updatePanelConfigs({
                          [panel as AvailablePanels]: {
                            ...panelConfigs[panel as AvailablePanels],
                            enabled:
                              !panelConfigs[panel as AvailablePanels].enabled,
                          },
                        })
                      }
                    />
                  </FlexWrapper>
                </div>

                <button
                  className={cx(
                    'card-arrow-button',
                    arrowButtonCss('topBottom'),
                  )}
                  onClick={() => movePanel(panel, 'down')}
                  disabled={
                    rowIndex ===
                    Object.keys(panelPositions).filter(
                      (key) => panelPositions[key].columnIndex === columnIndex,
                    ).length -
                      1
                  }
                >
                  <IconChevronCompactDown />
                </button>
              </FlexWrapper>

              <button
                className={cx('card-arrow-button', arrowButtonCss('leftRight'))}
                onClick={() => movePanel(panel, 'right')}
                disabled={columnIndex === 2}
              >
                <IconChevronCompactRight />
              </button>
            </FlexWrapper>
          </div>
        );
      });
  };

  return (
    <FlexWrapper gap={24} style={{ marginBottom: '30px' }} ref={managerRef}>
      <div>
        <h2>{'Panel Arrangement'}</h2>
        <p>
          {'Rearrange the panels by changing which column they are in.'}
          <br />
          {'Enabling or disabling panels takes effect immediately.'}
        </p>
      </div>
      <FlexWrapper
        gap={32}
        flexDirection="row"
        className="column-manager-wrapper"
      >
        <FlexWrapper gap={38} className="columns-wrapper">
          <CornersWrapper height="100%" size={20}>
            {/* Plus 60px for the header height and 10px of space */}
            <div
              className={cx(
                'column-manager',
                wrapperCss(reduceMotion, reduceTransparency),
              )}
              style={{
                height: `${wrapperHeight + 60}px`,
                width: `calc(3 * ${cardWidth}px + 2 * ${COLUMN_GAP}px + 30px)`,
              }}
            >
              <FlexWrapper
                alignItems="center"
                flexDirection="row"
                justifyContent="space-around"
                className="column-headers"
              >
                <h4>{'Column One'}</h4>
                <h4>{'Column Two'}</h4>
                <h4>{'Column Three'}</h4>
              </FlexWrapper>
              <div className={cx('column-wrapper', columnWrapperCss)}>
                {renderItems()}
              </div>
            </div>
          </CornersWrapper>
          {/* Deep Space Network - cannot be rearranged, only enabled or disabled */}
          <CornersWrapper height="100%" size={20}>
            <div
              className={cx(
                'column-manager',
                wrapperCss(reduceMotion, reduceTransparency),
              )}
              style={{
                height: '200px',
                width: `calc(3 * ${cardWidth}px + 2 * ${COLUMN_GAP}px + 30px)`,
              }}
            >
              <div className={cx('column-wrapper', columnWrapperCss)}>
                <FlexWrapper
                  className={cx('column-manager-card', columnCardCss)}
                  style={{
                    width: `calc(${cardWidth * 3}px + ${COLUMN_GAP * 2}px)`,
                    top: '20px',
                  }}
                >
                  {defaultPanelConfigs.DeepSpaceNetwork.label}
                  <Toggle
                    ariaLabel="Enable panel"
                    checked={panelConfigs.DeepSpaceNetwork?.enabled}
                    onChange={() =>
                      updatePanelConfigs({
                        DeepSpaceNetwork: {
                          ...panelConfigs.DeepSpaceNetwork,
                          enabled: !panelConfigs.DeepSpaceNetwork.enabled,
                        },
                      })
                    }
                  />
                </FlexWrapper>
              </div>
            </div>
          </CornersWrapper>
        </FlexWrapper>
        <FlexWrapper
          gap={18}
          className={cx('buttons-wrapper', columnManagerButtonWrapperCss)}
        >
          <Button onClick={applyChanges} disabled={!modified}>
            {'Apply changes'}
          </Button>
          <Button
            onClick={resetChanges}
            disabled={!modified}
            variantsList={['secondary']}
          >
            {'Reset changes'}
          </Button>
          <Button
            onClick={resetToDefaults}
            variantsList={['secondary', 'danger', 'small']}
          >
            {'Reset to default'}
          </Button>
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};
