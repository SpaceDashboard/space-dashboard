import React from 'react';
import { useSettingsContext } from 'src/hooks';

export const UserSettings: React.FC = () => {
  const {
    settings: { columnOneOrder, columnTwoOrder, columnThreeOrder },
    updateSettings,
  } = useSettingsContext();

  const handleColumnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    column: 'columnOneOrder' | 'columnTwoOrder' | 'columnThreeOrder',
  ) => {
    const { value } = event.target;
    const newColumnOrder = value.split(',').map((column) => column.trim());
    updateSettings({ [column]: newColumnOrder });
  };

  return (
    <div>
      <div>
        <label>Column One: </label>
        <select
          value={columnOneOrder}
          onChange={(event) => handleColumnChange(event, 'columnOneOrder')}
          multiple
        >
          <option value="IssFeed1">IssFeed1</option>
          <option value="IssFeed2">IssFeed2</option>
          <option value="IssTracker">IssTracker</option>
          <option value="SolarVisual">SolarVisual</option>
          <option value="AuroraForecast">AuroraForecast</option>
        </select>
      </div>
      <div>
        <label>Column Two: </label>
        <select
          value={columnTwoOrder}
          onChange={(event) => handleColumnChange(event, 'columnTwoOrder')}
          multiple
        >
          <option value="IssFeed1">IssFeed1</option>
          <option value="IssFeed2">IssFeed2</option>
          <option value="IssTracker">IssTracker</option>
          <option value="SolarVisual">SolarVisual</option>
          <option value="AuroraForecast">AuroraForecast</option>
        </select>
      </div>
      <div>
        <label>Column Three: </label>
        <select
          value={columnThreeOrder}
          onChange={(event) => handleColumnChange(event, 'columnThreeOrder')}
          multiple
        >
          <option value="IssFeed1">IssFeed1</option>
          <option value="IssFeed2">IssFeed2</option>
          <option value="IssTracker">IssTracker</option>
          <option value="SolarVisual">SolarVisual</option>
          <option value="AuroraForecast">AuroraForecast</option>
        </select>
      </div>
    </div>
  );
};
