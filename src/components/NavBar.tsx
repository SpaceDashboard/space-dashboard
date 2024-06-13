import React from 'react';
import { Button } from 'src/components/base/Button';
import { useToast } from 'src/hooks/useToast';
import Tooltip from '@mui/material/Tooltip';
import { Fade } from '@mui/material';
// import { useAppContext } from '../hooks/useAppContext';

export const NavBar: React.FC = () => {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast('This is a message!', 'success');
  };

  return (
    <nav>
      <span className="logo">
        <Tooltip
          enterDelay={0}
          placement="right"
          title="Space Dashboard"
          TransitionComponent={Fade}
        >
          <img
            src="/img/space-dashboard.svg"
            width="50"
            height="50"
            alt="Space Dashboard"
          />
        </Tooltip>
      </span>
      <div className="btn-wrapper">
        <Button
          className="secondary nav"
          tooltipTitle="Test 1"
          tooltipPlacement="right"
          onClick={handleClick}
        >
          A
        </Button>
        <Button
          className="secondary nav"
          tooltipTitle="Test 2"
          tooltipPlacement="right"
          onClick={handleClick}
        >
          B
        </Button>
        <Button
          className="secondary nav"
          tooltipTitle="Test 3"
          tooltipPlacement="right"
          onClick={handleClick}
        >
          C
        </Button>
      </div>
    </nav>
  );
};
