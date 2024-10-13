import { useState } from 'react';
import { cx } from '@emotion/css';
import { Modal, FlexWrapper } from 'src/components/base';

interface ListDetailsProps<T> {
  className?: string;
  items: T[];
  listHeader?: string;
  renderLabel: (item: T) => JSX.Element;
  renderDetails: (item: T) => JSX.Element;
}

export const ListDetails = <T,>({
  className,
  items,
  listHeader,
  renderLabel,
  renderDetails,
}: ListDetailsProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    setIsPaneOpen(true);
  };

  return (
    <div className={cx('list-container', className)}>
      <Modal isOpen={isPaneOpen} setIsOpen={setIsPaneOpen} modalPadding={5}>
        {selectedItem && renderDetails(selectedItem)}
      </Modal>

      <FlexWrapper
        gap={0}
        className="modal-content-overlay list-content-wrapper"
      >
        {listHeader && (
          <FlexWrapper alignItems="center" className="list-content-header">
            <h2>{listHeader}</h2>
          </FlexWrapper>
        )}

        <FlexWrapper gap={0}>
          {items?.map((item, index) => (
            <div
              key={(item as any).id ?? index}
              className="list-item"
              onClick={() => handleItemClick(item)}
            >
              {renderLabel(item)}
            </div>
          ))}
        </FlexWrapper>
      </FlexWrapper>
    </div>
  );
};
