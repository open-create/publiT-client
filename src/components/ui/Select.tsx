'use client';

import { Portal, Select as CkSelect, createListCollection } from '@chakra-ui/react';

export interface UiSelectOption {
  label: string;
  value: string;
}

interface UiSelectProps {
  options: UiSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'subtle';
  width?: string | number;
  contentZIndex?: number;
  usePortal?: boolean;
}

export default function UiSelect({
  options,
  value,
  onChange,
  onOpenChange,
  placeholder = '선택하세요',
  size = 'sm',
  variant = 'outline',
  width = '100%',
  contentZIndex = 2000,
  usePortal = false,
}: UiSelectProps) {
  const collection = createListCollection({
    items: options,
    itemToString: (opt) => opt.label,
    itemToValue: (opt) => opt.value,
  });

  const controlledValue = value ? [value] : [];

  return (
    <CkSelect.Root
      collection={collection}
      size={size}
      variant={variant}
      width={width}
      value={controlledValue}
      onValueChange={(e) => {
        const v = Array.isArray(e.value) ? e.value[0] : (e.value as unknown as string);
        onChange?.(v ?? '');
      }}
      onOpenChange={(d) => onOpenChange?.(d.open)}
      positioning={{
        strategy: 'absolute',
        placement: 'bottom-start',
        gutter: 4,
        offset: { mainAxis: 0, crossAxis: 0 },
      }}
    >
      <CkSelect.HiddenSelect />
      <CkSelect.Control>
        <CkSelect.Trigger>
          <CkSelect.ValueText placeholder={placeholder} fontSize="sm" />
        </CkSelect.Trigger>
        <CkSelect.IndicatorGroup>
          <CkSelect.Indicator />
        </CkSelect.IndicatorGroup>
      </CkSelect.Control>

      {usePortal ? (
        <Portal>
          <CkSelect.Positioner zIndex={contentZIndex}>
            <CkSelect.Content minW="var(--reference-width)" w="var(--reference-width)">
              {collection.items.map((opt) => (
                <CkSelect.Item item={opt} key={opt.value} fontSize="xs">
                  {opt.label}
                  <CkSelect.ItemIndicator />
                </CkSelect.Item>
              ))}
            </CkSelect.Content>
          </CkSelect.Positioner>
        </Portal>
      ) : (
        <CkSelect.Positioner zIndex={contentZIndex}>
          <CkSelect.Content minW="var(--reference-width)" w="var(--reference-width)">
            {collection.items.map((opt) => (
              <CkSelect.Item item={opt} key={opt.value} fontSize="xs">
                {opt.label}
                <CkSelect.ItemIndicator />
              </CkSelect.Item>
            ))}
          </CkSelect.Content>
        </CkSelect.Positioner>
      )}
    </CkSelect.Root>
  );
}
