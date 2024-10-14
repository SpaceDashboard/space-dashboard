import React, { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Modal, FlexWrapper } from 'src/components/base';

const listHeaderCss = (isRenderingListDetails?: boolean) => css``;

interface ListDetailsProps<T> {
  className?: string;
  items: T[];
  listHeader?: string;
  modalClassName?: string;
  renderLabel: (item: T) => JSX.Element;
  renderDetails: (item: T) => JSX.Element;
}

export const ListDetails = <T,>({
  className,
  items,
  listHeader = '',
  modalClassName,
  renderLabel,
  renderDetails,
}: ListDetailsProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    setIsPaneOpen(true);
  };

  // const isRenderingListDetails = useMemo(() => {
  //   if (selectedItem) {
  //     const renderedDetails = renderDetails(selectedItem);
  //     return (
  //       React.isValidElement(renderedDetails) &&
  //       renderedDetails.type === ListDetails
  //     );
  //   }
  //   return false;
  // }, [selectedItem, renderDetails]);

  return (
    <div className={cx('list-container', className)}>
      <Modal
        modalClassName={modalClassName}
        isOpen={isPaneOpen}
        setIsOpen={setIsPaneOpen}
        modalPadding={5}
      >
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
