// Button Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  hideCloseButton?: boolean;
  showCloseButton?: boolean;
  showTitle?: boolean;
  showTitleAction?: boolean;
  onTitleAction?: () => void;
  withOverlay?: boolean;
  containerProps?: any;
  closeOnOutsideClick?: boolean;
}

// Select Props
export interface UiSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Input Props
export interface UiInputProps {
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  [key: string]: any;
}

// ImageUploader Props
export interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  currentImage?: string;
  placeholder?: string;
  accept?: string;
  maxSize?: number;
}

// Pagination Props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
}

// Tooltip Props
export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

// ColorMode Props
export interface ColorModeProviderProps {
  children: React.ReactNode;
}

export interface ColorModeButtonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
  [key: string]: any;
}
