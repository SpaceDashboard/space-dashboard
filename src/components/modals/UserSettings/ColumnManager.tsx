import React, { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  IconChevronCompactUp,
  IconChevronCompactRight,
  IconChevronCompactDown,
  IconChevronCompactLeft,
} from '@tabler/icons-react';
import { useSettingsContext } from 'src/hooks';
import { Button, CornersWrapper, FlexWrapper } from 'src/components/base';
import {
  columnPanelMap,
  panelLabelByComponentName,
} from 'src/shared/ColumnPanelMap';

const CARD_HEIGHT = 160;
const DEFAULT_CARD_WIDTH = 300;
const COLUMN_GAP = 20;
const ROW_GAP = 20;

const wrapperCss = css`
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
  transition: 0.3s all ease;
`;

const columnHeadersCss = css`
  height: 50px;

  h4 {
    margin: 0;
  }
`;

const columnWrapperCss = css`
  margin-left: calc(${COLUMN_GAP}px / 1.25);
  position: relative;
`;

const columnCardCss = css`
  align-items: center;
  background: hsl(
    var(--base-blue-hue),
    var(--base-blue-saturation),
    calc(var(--base-blue-lightness) - 12%)
  );
  color: white;
  container-type: size;
  display: flex;
  height: ${CARD_HEIGHT}px;
  justify-content: center;
  position: absolute;
  text-align: center;
  transition:
    0.3s top ease,
    0.3s left ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: hsl(
      var(--base-blue-hue),
      var(--base-blue-saturation),
      calc(var(--base-blue-lightness) + 10%)
    );
  }

  &::before {
    top: -3px;
  }

  &::after {
    bottom: -3px;
  }
`;

const modifiedCardCss = css`
  background: hsl(
    var(--base-orange-hue),
    var(--base-orange-saturation),
    calc(var(--base-orange-lightness) - 12%)
  );

  &::before,
  &::after {
    background: hsl(
      var(--base-orange-hue),
      var(--base-orange-saturation),
      calc(var(--base-orange-lightness) + 10%)
    );
  }
`;

const arrowButtonCss = (location: 'topBottom' | 'leftRight') => css`
  align-items: center;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 50px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  height: ${location === 'topBottom' ? 25 : CARD_HEIGHT - 30}px;
  justify-content: center;
  outline: none;
  padding: 0;
  width: ${location === 'topBottom' ? '100%' : '25px'};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.15;
  }

  @media (hover: hover) {
    &:not(:disabled):hover {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.08);
    }
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
    settings: { column1Order, column2Order, column3Order },
    updateSettings,
  } = useSettingsContext();

  const [cardWidth, setCardWidth] = useState<number>(200);

  useEffect(() => {
    const handleResize = () => {
      // if (window.innerWidth < 576) setCardWidth(100);
      // else if (window.innerWidth < 640) setCardWidth(80);
      // else if (window.innerWidth < 740) setCardWidth(100);
      if (window.innerWidth < 840) setCardWidth(130);
      else if (window.innerWidth < 900) setCardWidth(160);
      else if (window.innerWidth < 960) setCardWidth(180);
      else if (window.innerWidth < 1100) setCardWidth(200);
      else if (window.innerWidth < 1245) setCardWidth(250);
      else setCardWidth(DEFAULT_CARD_WIDTH);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setPanelPositions(originalPositions);
    setModified(false);
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
        const left = columnIndex * (cardWidth + COLUMN_GAP);

        const isModified =
          columnIndex !== originalPositions[panel].columnIndex ||
          rowIndex !== originalPositions[panel].rowIndex;

        return (
          <div
            key={panel}
            className={cx('column-manager-card', columnCardCss, {
              [modifiedCardCss]: isModified,
            })}
            style={{ top, left, width: cardWidth }}
          >
            <FlexWrapper
              gap={0}
              alignItems="center"
              flexDirection="row"
              style={{ height: '100%', padding: '0 5px' }}
            >
              <button
                className={arrowButtonCss('leftRight')}
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
                  className={arrowButtonCss('topBottom')}
                  onClick={() => movePanel(panel, 'up')}
                  disabled={rowIndex === 0}
                >
                  <IconChevronCompactUp />
                </button>

                <div style={{ padding: '0 8px' }}>
                  {panelLabelByComponentName[panel]}
                </div>

                <button
                  className={arrowButtonCss('topBottom')}
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
                className={arrowButtonCss('leftRight')}
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
    <FlexWrapper gap={24} style={{ marginBottom: '30px' }}>
      <h2>Panel Arrangement</h2>
      <CornersWrapper height="100%" size={20}>
        {/* Plus 60px for the header height and 10px of space */}
        <div
          className={wrapperCss}
          style={{
            height: `${wrapperHeight + 60}px`,
            width: `calc(3 * ${cardWidth}px + 2 * ${COLUMN_GAP}px + 30px)`,
          }}
        >
          <FlexWrapper
            alignItems="center"
            flexDirection="row"
            justifyContent="space-around"
            className={columnHeadersCss}
          >
            <h4>Column One</h4>
            <h4>Column Two</h4>
            <h4>Column Three</h4>
          </FlexWrapper>
          <div className={columnWrapperCss}>{renderItems()}</div>
        </div>
      </CornersWrapper>
      <FlexWrapper flexDirection="row" gap={18}>
        <Button onClick={applyChanges} disabled={!modified}>
          Apply changes
        </Button>
        <Button onClick={resetChanges} variantsList={['secondary']}>
          Reset
        </Button>
      </FlexWrapper>
    </FlexWrapper>
  );
};
