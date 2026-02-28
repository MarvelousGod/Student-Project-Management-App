// Mock data for the application

export interface WriterApplication {
  id: string;
  name: string;
  email: string;
  expertise: string[];
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface Writer {
  id: string;
  name: string;
  email: string;
  bio: string;
  expertise: string[];
  rating: number;
  completedProjects: number;
  earnings: number;
  joinedDate: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  studentId: string;
  studentName: string;
  writerId?: string;
  writerName?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'revision';
  deadline: string;
  createdDate: string;
  progress: number;
  rating?: number;
  review?: string;
  payment: number;
  subject: string;
}

export const mockWriterApplications: WriterApplication[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    expertise: ['Computer Science', 'Mathematics', 'Data Science'],
    experience: '5 years of academic writing',
    status: 'pending',
    appliedDate: '2026-02-05',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    expertise: ['Business', 'Economics', 'Finance'],
    experience: '3 years of professional writing',
    status: 'pending',
    appliedDate: '2026-02-04',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    expertise: ['Literature', 'History', 'Philosophy'],
    experience: '7 years teaching and writing',
    status: 'approved',
    appliedDate: '2026-01-28',
  },
];

export const mockWriters: Writer[] = [
  {
    id: 'w1',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    bio: 'Experienced academic writer specializing in humanities with a passion for helping students succeed.',
    expertise: ['Literature', 'History', 'Philosophy'],
    rating: 4.8,
    completedProjects: 45,
    earnings: 8500,
    joinedDate: '2025-11-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: 'w2',
    name: 'David Thompson',
    email: 'david.t@email.com',
    bio: 'PhD holder with expertise in STEM subjects. Committed to delivering high-quality academic work.',
    expertise: ['Physics', 'Mathematics', 'Engineering'],
    rating: 4.9,
    completedProjects: 62,
    earnings: 12400,
    joinedDate: '2025-10-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: 'w3',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    bio: 'Business and economics specialist with real-world industry experience.',
    expertise: ['Business', 'Economics', 'Marketing'],
    rating: 4.7,
    completedProjects: 38,
    earnings: 7200,
    joinedDate: '2025-12-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Machine Learning Classification Project',
    description: 'Build and evaluate classification models using Python and scikit-learn',
    studentId: 's1',
    studentName: 'Alex Turner',
    writerId: 'w2',
    writerName: 'David Thompson',
    status: 'in-progress',
    deadline: '2026-02-15',
    createdDate: '2026-02-01',
    progress: 65,
    payment: 250,
    subject: 'Computer Science',
  },
  {
    id: 'p2',
    title: 'Renaissance Art History Essay',
    description: 'Comparative analysis of Renaissance artists and their influence on modern art',
    studentId: 's2',
    studentName: 'Jessica Lee',
    writerId: 'w1',
    writerName: 'Emily Rodriguez',
    status: 'completed',
    deadline: '2026-01-30',
    createdDate: '2026-01-20',
    progress: 100,
    rating: 5,
    review: 'Excellent work! Very thorough research and well-written.',
    payment: 180,
    subject: 'History',
  },
  {
    id: 'p3',
    title: 'Financial Analysis Report',
    description: 'Analyze company financial statements and provide investment recommendations',
    studentId: 's3',
    studentName: 'Marcus Williams',
    writerId: 'w3',
    writerName: 'Lisa Anderson',
    status: 'completed',
    deadline: '2026-02-05',
    createdDate: '2026-01-25',
    progress: 100,
    rating: 4.5,
    review: 'Great analysis, delivered on time.',
    payment: 220,
    subject: 'Finance',
  },
  {
    id: 'p4',
    title: 'Quantum Physics Problem Set',
    description: 'Solve advanced quantum mechanics problems with detailed explanations',
    studentId: 's1',
    studentName: 'Alex Turner',
    writerId: 'w2',
    writerName: 'David Thompson',
    status: 'completed',
    deadline: '2026-01-28',
    createdDate: '2026-01-18',
    progress: 100,
    rating: 5,
    review: 'Perfect! Clear explanations and correct solutions.',
    payment: 200,
    subject: 'Physics',
  },
  {
    id: 'p5',
    title: 'Marketing Strategy Presentation',
    description: 'Create a comprehensive marketing strategy for a tech startup',
    studentId: 's4',
    studentName: 'Sophia Chen',
    status: 'pending',
    deadline: '2026-02-20',
    createdDate: '2026-02-06',
    progress: 0,
    payment: 300,
    subject: 'Marketing',
  },
];

export const getWriterProjects = (writerId: string) => {
  return mockProjects.filter(p => p.writerId === writerId);
};

export const getStudentProjects = (studentId: string) => {
  return mockProjects.filter(p => p.studentId === studentId);
};
