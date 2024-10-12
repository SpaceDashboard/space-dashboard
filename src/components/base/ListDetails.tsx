import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { CornersWrapper, Modal } from 'src/components/base';

interface ListItem {
  id: string;
  name: string;
  details: string;
}

interface ListDetailsProps {
  items: ListItem[];
}

// CSS for the list container and detail pane
const containerStyle = css`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const listStyle = css`
  flex: 1;
  /* background-color: #f9f9f9; */
  transition: transform 0.3s ease;
`;

const detailPaneStyle = (isOpen: boolean) => css`
  /* flex: 1; */
  /* padding: 12px; */
  /* background-color: #121212; */
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  /* max-width: 400px; */
  /* box-shadow: -2px 0px 8px rgba(0, 0, 0, 0.2); */
  transform: translateX(${isOpen ? '0%' : 'calc(100% + 12px)'});
  transition: transform 0.3s ease;
`;

const backButtonStyle = css`
  display: inline-block;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const listItemStyle = css`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ListDetails: React.FC<ListDetailsProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const handleItemClick = (item: ListItem) => {
    setSelectedItem(item);
    setIsPaneOpen(true);
  };

  return (
    <div className={containerStyle}>
      <Modal isOpen={isPaneOpen} setIsOpen={setIsPaneOpen} modalPadding={5}>
        <h2>{selectedItem?.name}</h2>
        <p>{selectedItem?.details}</p>
      </Modal>

      <div className={cx('modal-content-overlay', listStyle)}>
        {items.map((item) => (
          <div
            key={item.id}
            className={listItemStyle}
            onClick={() => handleItemClick(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
