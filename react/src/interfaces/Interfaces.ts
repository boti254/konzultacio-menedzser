export interface TodoTask {
  id: number;
  student_id: number;
  title: string;
  due: string;
  done: boolean;
  created_at?: string;
  updated_at?: string;
}
