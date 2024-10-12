import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Modal, FlexWrapper } from 'src/components/base';

interface ListDetailsProps<T> {
  items: T[];
  listHeader?: string;
  renderLabel: (item: T) => JSX.Element;
  renderDetails: (item: T) => JSX.Element;
}

const containerCss = css`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const listWrapperCss = css`
  background: hsla(
    var(--base-blue-hue),
    calc(var(--base-blue-saturation) - 5%),
    calc(var(--base-blue-lightness) - 15%),
    var(--panel--background-opacity)
  );
  border-radius: 10px;
  flex: 1;
  padding: 8px;
  transition: transform 0.3s ease;
`;

const listHeaderCss = css`
  background: hsla(
    var(--base-blue-hue),
    var(--base-blue-saturation),
    calc(var(--base-blue-lightness) - 5%),
    var(--panel--background-opacity)
  );
  border-radius: 6px;
  padding: 6px;
`;

const listItemCss = css`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 10px;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ListDetails = <T,>({
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
    <div className={containerCss}>
      <Modal isOpen={isPaneOpen} setIsOpen={setIsPaneOpen} modalPadding={5}>
        {selectedItem && renderDetails(selectedItem)}
      </Modal>

      <FlexWrapper gap={0} className={cx('modal-content-overlay', listWrapperCss)}>
        {listHeader && (
          <FlexWrapper
            alignItems="center"
            className={listHeaderCss}
          >
            <h2>{listHeader}</h2>
          </FlexWrapper>
        )}

        {items?.map((item, index) => (
          <div
            key={(item as any).id ?? index}
            className={listItemCss}
            onClick={() => handleItemClick(item)}
          >
            {renderLabel(item)}
          </div>
        ))}
      </FlexWrapper>
    </div>
  );
};
