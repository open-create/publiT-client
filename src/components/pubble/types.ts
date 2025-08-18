// PubbleHeader Props
export interface PubbleHeaderProps {
  charCount?: number;
  wordCount?: number;
  smartQualityCheck?: boolean;
  onBack?: () => void;
  onTempSave?: () => void;
  onPublish?: () => void;
  onSmartReview?: () => void;
  onQualityCheck?: () => void;
  onOpenSettings?: () => void;
}

// PubbleSettingsModal Props
export interface PubbleSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish?: (settings: {
    type: 'scroll' | 'ebook';
    tags: string[];
    visibility: 'public' | 'private';
    password?: string;
    adultOnly: boolean;
  }) => void;
}

// SmartReviewModal Props
export interface SmartReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyReview?: (evaluations: EvaluationItem[]) => void;
}

export interface EvaluationItem {
  category: string;
  score: number;
  comment: string;
  highlightedText?: string;
}

// CommentsModal Props
export interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
}

export interface CommentItemProps {
  comment: Comment;
}

// CommentsSection Props
export interface CommentsSectionProps {
  featuredComment?: Comment;
  totalComments: number;
  onViewAllComments: () => void;
}

// PostAuthor Props
export interface PostAuthorProps {
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  isAuthor: boolean;
  isSubscribed: boolean;
  onSubscribe: () => void;
  onEdit: () => void;
}

// PostBody Props
export interface PostBodyProps {
  content: string;
}

// PostNavigation Props
export interface PostNavigationProps {
  currentPostId: string;
  posts: Array<{
    id: string;
    title: string;
    subtitle?: string;
  }>;
}

// ReportModal Props
export interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (type: string, reason: string) => void;
}
