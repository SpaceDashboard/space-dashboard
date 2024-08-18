import React, { useEffect, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/hooks';
import { Button, FlexWrapper } from 'src/components/base';
import { columnPanelMap } from 'src/shared/ColumnPanelMap';
import { css } from '@emotion/css';

const CARD_HEIGHT = 100;
const CARD_WIDTH = 200;
const COLUMN_GAP = 20;
const ROW_GAP = 10;

const wrapperCss = css`
  border-radius: 6px;
  border: 1px solid #666;
  position: relative;
  transition: 0.4s all ease;
  width: calc(3 * ${CARD_WIDTH}px + 2 * ${COLUMN_GAP}px + 20px);
`;

const columnWrapperCss = css`
  margin-left: ${COLUMN_GAP}px;
  position: relative;
`;

const columnCardCss = css`
  align-items: center;
  background-color: #111;
  border: 1px solid #666;
  border-radius: 4px;
  color: white;
  display: flex;
  height: ${CARD_HEIGHT}px;
  justify-content: center;
  position: absolute;
  transition: 0.4s all ease;
  width: ${CARD_WIDTH}px;
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

export const ColumnUpdater: React.FC = () => {
  const {
    settings: { column1Order, column2Order, column3Order },
    updateSettings,
  } = useSettingsContext();

  const [panelPositions, setPanelPositions] = useState<{
    [key: string]: PanelPosition;
  }>({});

  const maxPanelsInColumn = useMemo(
    () => getMaxPanelsInColumn(panelPositions),
    [panelPositions],
  );

  const wrapperHeight = useMemo(
    () => maxPanelsInColumn * (CARD_HEIGHT + ROW_GAP),
    [maxPanelsInColumn],
  );

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
  }, [column1Order, column2Order, column3Order]);

  const applyChanges = () => {
    const newColumn1Order = Object.keys(panelPositions)
      .filter((panel) => panelPositions[panel].columnIndex === 0)
      .sort((a, b) => panelPositions[a].rowIndex - panelPositions[b].rowIndex);

    const newColumn2Order = Object.keys(panelPositions)
      .filter((panel) => panelPositions[panel].columnIndex === 1)
      .sort((a, b) => panelPositions[a].rowIndex - panelPositions[b].rowIndex);

    const newColumn3Order = Object.keys(panelPositions)
      .filter((panel) => panelPositions[panel].columnIndex === 2)
      .sort((a, b) => panelPositions[a].rowIndex - panelPositions[b].rowIndex);

    updateSettings({
      column1Order: newColumn1Order,
      column2Order: newColumn2Order,
      column3Order: newColumn3Order,
    });
  };

  const resetChanges = () => {
    const resetPositions: { [key: string]: PanelPosition } = {};

    const resetPositionsHelper = (
      columnOrder: string[],
      columnIndex: number,
    ) => {
      columnOrder.forEach((panel, rowIndex) => {
        resetPositions[panel] = { columnIndex, rowIndex };
      });
    };

    resetPositionsHelper(column1Order, 0);
    resetPositionsHelper(column2Order, 1);
    resetPositionsHelper(column3Order, 2);

    setPanelPositions(resetPositions);
  };

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

  const movePanelToColumn = (panel: string, newColumnIndex: number) => {
    const oldPosition = panelPositions[panel];
    const panelsInNewColumn = Object.entries(panelPositions).filter(
      ([, pos]) => pos.columnIndex === newColumnIndex,
    ).length;

    setPanelPositions((prevPositions) => ({
      ...prevPositions,
      [panel]: { columnIndex: newColumnIndex, rowIndex: panelsInNewColumn },
    }));

    // Shift up all items below the moved item in the old column
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
        const left = columnIndex * (CARD_WIDTH + COLUMN_GAP);

        return (
          <div key={panel} className={columnCardCss} style={{ top, left }}>
            <FlexWrapper gap={18} alignItems="center">
              <button
                onClick={() => movePanel(panel, 'up')}
                disabled={rowIndex === 0}
              >
                ↑
              </button>
              <button
                onClick={() => movePanel(panel, 'down')}
                disabled={
                  rowIndex ===
                  Object.keys(panelPositions).filter(
                    (key) => panelPositions[key].columnIndex === columnIndex,
                  ).length -
                    1
                }
              >
                ↓
              </button>
            </FlexWrapper>
            <div style={{ marginLeft: '8px' }}>{panel}</div>
            <FlexWrapper gap={18} alignItems="center">
              <button
                onClick={() => movePanel(panel, 'left')}
                disabled={columnIndex === 0}
              >
                ←
              </button>
              <button
                onClick={() => movePanel(panel, 'right')}
                disabled={columnIndex === 2}
              >
                →
              </button>
            </FlexWrapper>
          </div>
        );
      });
  };

  return (
    <FlexWrapper gap={18}>
      <h2>Column Order</h2>
      <div className={wrapperCss} style={{ height: `${wrapperHeight + 40}px` }}>
        <FlexWrapper
          alignItems="center"
          flexDirection="row"
          justifyContent="space-around"
          style={{ padding: '8px 0 4px', height: '40px' }}
        >
          <h4>Column One</h4>
          <h4>Column Two</h4>
          <h4>Column Three</h4>
        </FlexWrapper>
        <div className={columnWrapperCss}>{renderItems()}</div>
      </div>
      <FlexWrapper flexDirection="row" gap={18}>
        <Button onClick={applyChanges}>Apply changes</Button>
        <Button onClick={resetChanges} variantsList={['secondary']}>
          Reset
        </Button>
      </FlexWrapper>
    </FlexWrapper>
  );
};
