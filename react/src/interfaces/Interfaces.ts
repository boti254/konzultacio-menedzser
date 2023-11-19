export interface TodoTask {
  id: number;
  student_id: number;
  title: string;
  due: string;
  done: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserPair {
  user: User;
  pair: Pair;
}

export interface User {
  id: number;
  name: string;
  email: string;
  neptun: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  student: number;
  teacher: number;
  admin: number;
}

export interface Pair {
  id: number;
  teacher_id: number;
  student_id: number;
  accepted: number;
}

export interface Meeting {
  id: number;
  teacher_id: number;
  date: string;
  location: string;
  count: number;
}
