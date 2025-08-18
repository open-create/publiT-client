// Header Props
export interface HeaderProps {
  user?: {
    id: string;
    username: string;
    avatar?: string;
  };
  onLogout?: () => void;
  onProfileClick?: () => void;
}

// HeaderShell Props
export interface HeaderShellProps {
  children: React.ReactNode;
}
