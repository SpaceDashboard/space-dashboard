import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Modal } from 'src/components/base';

interface DefaultListItem {
  id: string;
  label: string;
  detailsHeader: string;
  details: string;
}

interface ListDetailsProps<T = DefaultListItem> {
  items: T[];
  customRenderLabel?: (item: T) => JSX.Element;
  customRenderDetailsHeader?: (item: T) => JSX.Element;
  customRenderDetails?: (item: T) => JSX.Element;
}

const containerStyle = css`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const listStyle = css`
  flex: 1;
  transition: transform 0.3s ease;
`;

const listItemStyle = css`
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ListDetails = <T,>({
  items,
  customRenderLabel,
  customRenderDetailsHeader,
  customRenderDetails,
}: ListDetailsProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    setIsPaneOpen(true);
  };

  return (
    <div className={containerStyle}>
      <Modal isOpen={isPaneOpen} setIsOpen={setIsPaneOpen} modalPadding={5}>
        {selectedItem && (
          <h2>
            {customRenderDetailsHeader ? (
              <>{customRenderDetailsHeader(selectedItem)}</>
            ) : (
              <>
                {selectedItem &&
                  (customRenderLabel
                    ? customRenderLabel(selectedItem)
                    : (selectedItem as unknown as DefaultListItem).label)}
              </>
            )}
          </h2>
        )}

        <p>
          {selectedItem &&
            (customRenderDetails
              ? customRenderDetails(selectedItem)
              : (selectedItem as unknown as DefaultListItem).details)}
        </p>
      </Modal>

      <div className={cx('modal-content-overlay', listStyle)}>
        {items?.map((item) => (
          <div
            key={(item as DefaultListItem).id}
            className={listItemStyle}
            onClick={() => handleItemClick(item)}
          >
            {customRenderLabel
              ? customRenderLabel(item)
              : (item as DefaultListItem).label}
          </div>
        ))}
      </div>
    </div>
  );
};
