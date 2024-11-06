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

export const NOTE_BACKGROUNDS = {
  solid: [
    { id: 'default', class: 'bg-white' },
    { id: 'blue', class: 'bg-blue-100' },
    { id: 'green', class: 'bg-green-100' },
    { id: 'yellow', class: 'bg-yellow-100' },
    { id: 'purple', class: 'bg-purple-100' },
    { id: 'pink', class: 'bg-pink-100' },
  ],
  gradient: [
    { id: 'sunset', class: 'bg-gradient-to-r from-yellow-200 to-pink-200' },
    { id: 'ocean', class: 'bg-gradient-to-r from-blue-200 to-cyan-200' },
    { id: 'forest', class: 'bg-gradient-to-r from-green-200 to-emerald-200' },
    { id: 'lavender', class: 'bg-gradient-to-r from-purple-200 to-pink-200' },
  ],
  pattern: [
    { id: 'dots', class: 'bg-dots' },
    { id: 'lines', class: 'bg-lines' },
    { id: 'grid', class: 'bg-grid' },
  ]
} 