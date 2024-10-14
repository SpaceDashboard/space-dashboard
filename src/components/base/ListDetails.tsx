import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Modal, FlexWrapper } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';

const listItemCss = (reduceMotion?: boolean) => css`
  &:hover {
    .label-divider::after {
      ${reduceMotion &&
      `
        animation: none !important;
        opacity: 0.25 !important;
      `}
    }
  }
`;

interface ListDetailsProps<T> {
  className?: string;
  items: T[];
  listHeader?: string;
  maxHeight?: number;
  modalClassName?: string;
  renderLabel: (item: T) => JSX.Element;
  renderDetails: (item: T) => JSX.Element;
}

export const ListLabel: React.FC<{
  mainLabel: string;
  subLabel?: string;
}> = ({ mainLabel, subLabel }) => {
  return (
    <FlexWrapper
      alignItems="center"
      flexDirection="row"
      gap={12}
      justifyContent="space-between"
    >
      <span>{mainLabel}</span>
      {subLabel && (
        <>
          <span className="label-divider"></span>
          <span className="label-right">{subLabel}</span>
        </>
      )}
    </FlexWrapper>
  );
};

export const ListDetails = <T,>({
  className,
  items,
  listHeader = '',
  maxHeight,
  modalClassName,
  renderLabel,
  renderDetails,
}: ListDetailsProps<T>) => {
  const {
    settings: { reduceMotion },
  } = useSettingsContext();
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    setIsPaneOpen(true);
  };

  return (
    <div className={cx('list-container', className)} style={{ maxHeight }}>
      <Modal
        canHaveChildrenModals={true}
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
              className={cx('list-item', listItemCss(reduceMotion))}
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
