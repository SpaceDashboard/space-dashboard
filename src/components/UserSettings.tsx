import React from 'react';
import { Button, Modal } from 'src/components/base';
import { useAppContext } from 'src/hooks';
import { useSettingsContext } from 'src/hooks';
import { useForm } from 'react-hook-form';
import { IconSend, IconRestore } from '@tabler/icons-react';

export const UserSettings: React.FC = () => {
  const { isUserSettingsOpen, setIsUserSettingsOpen } = useAppContext();
  const {
    settings: { columnOneOrder, columnTwoOrder, columnThreeOrder },
    updateSettings,
  } = useSettingsContext();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const resetForm = () => {
    clearErrors();
    reset();
  };

  const handleColumnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    column: 'columnOneOrder' | 'columnTwoOrder' | 'columnThreeOrder',
  ) => {
    const { value } = event.target;
    const newColumnOrder = value.split(',').map((column) => column.trim());
    updateSettings({ [column]: newColumnOrder });
  };

  return (
    <Modal isOpen={isUserSettingsOpen} setIsOpen={setIsUserSettingsOpen}>
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

      <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="name">{'Name'}</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <p className="text-error">Name is required</p>}
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">{'Email'}</label>
          <input
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="text-error">Email is required and must be valid</p>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="message">{'Message'}</label>
          <textarea
            {...register('message', { required: true })}
            rows={5}
            cols={40}
          ></textarea>
          {errors.message && <p className="text-error">Message is required</p>}
        </div>

        <div className="button-row">
          <Button buttonType="submit" Icon={IconSend} onClick={onSubmit}>
            {'Send'}
          </Button>
          <Button
            Icon={IconRestore}
            onClick={resetForm}
            variantsList={['secondary']}
          >
            {'Reset'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
