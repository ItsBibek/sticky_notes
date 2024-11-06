export interface NoteType {
  id: string
  content: string
  color: string
  category?: string
  isPinned?: boolean
  createdAt: number
  updatedAt: number
}

export interface Category {
  id: string
  name: string
  color: string
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: 'Work', color: 'bg-blue-100' },
  { id: 'personal', name: 'Personal', color: 'bg-green-100' },
  { id: 'ideas', name: 'Ideas', color: 'bg-yellow-100' },
  { id: 'tasks', name: 'Tasks', color: 'bg-purple-100' },
] 