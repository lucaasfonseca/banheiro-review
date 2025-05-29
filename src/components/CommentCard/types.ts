export type CommentCardProps = {
  comment: {
    id: string;
    text: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    createdAt: string;
    likedBy?: string[];
    replies?: any[]; // Você pode tipar melhor depois
  };
  reviewId: string;
  showReplies?: boolean;
};
