export interface Icomments {
  id: number;
  votes: number;
  timestamp: string;
  content: string;
  replies: Icomments[];
}
export const commentsData: Icomments[] = [
  {
    id: 1,
    votes: 12,
    content: "This is the first comment",
    timestamp: "2024-06-16T10:00:00Z",
    replies: [
      {
        id: 2,
        content: "Reply to the first comment",
        votes: 5,
        timestamp: "2024-06-16T10:30:00Z",
        replies: [
          {
            id: 3,
            content: "Nested reply to the first reply",
            votes: 2,
            timestamp: "2024-06-16T10:45:00Z",
            replies: [],
          },
        ],
      },
      {
        id: 4,
        content: "Another reply to the first comment",
        votes: 8,
        timestamp: "2024-06-16T11:00:00Z",
        replies: [
          {
            id: 5,
            content: "Reply to the second reply of the first comment",
            votes: 6,
            timestamp: "2024-06-16T11:15:00Z",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    votes: 20,
    content: "This is the second main comment",
    timestamp: "2024-06-17T09:00:00Z",
    replies: [
      {
        id: 7,
        content: "Reply to the second main comment",
        votes: 9,
        timestamp: "2024-06-17T09:30:00Z",
        replies: [
          {
            id: 8,
            content: "Nested reply to the reply of the second comment",
            votes: 4,
            timestamp: "2024-06-17T09:45:00Z",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    votes: 15,
    content: "This is the third main comment",
    timestamp: "2024-06-18T08:00:00Z",
    replies: [
      {
        id: 10,
        content: "First reply to the third comment",
        votes: 7,
        timestamp: "2024-06-18T08:15:00Z",
        replies: [
          {
            id: 11,
            content: "Reply to the first reply of the third comment",
            votes: 3,
            timestamp: "2024-06-18T08:30:00Z",
            replies: [],
          },
        ],
      },
      {
        id: 12,
        content: "Second reply to the third comment",
        votes: 6,
        timestamp: "2024-06-18T08:45:00Z",
        replies: [
          {
            id: 13,
            content: "Reply to the second reply of the third comment",
            votes: 5,
            timestamp: "2024-06-18T09:00:00Z",
            replies: [],
          },
          {
            id: 14,
            content: "Another reply to the second reply of the third comment",
            votes: 2,
            timestamp: "2024-06-18T09:15:00Z",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 15,
    votes: 18,
    content: "This is the fourth main comment",
    timestamp: "2024-06-19T07:00:00Z",
    replies: [
      {
        id: 16,
        content: "Reply to the fourth main comment",
        votes: 10,
        timestamp: "2024-06-19T07:30:00Z",
        replies: [
          {
            id: 17,
            content: "Nested reply to the reply of the fourth comment",
            votes: 3,
            timestamp: "2024-06-19T07:45:00Z",
            replies: [],
          },
        ],
      },
    ],
  },
];
