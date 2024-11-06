'use client'

import { useState, useEffect, useRef } from 'react'
import { Category, NoteType } from '../types'
import { rewriteText } from '../services/ai'
import { Sparkles, Pin, X } from 'lucide-react'

interface NoteProps {
  note: NoteType
  categories: Category[]
  onUpdate: (id: string, updates: Partial<NoteType>) => void
  onDelete: (id: string) => void
}

export default function Note({ note, categories, onUpdate, onDelete }: NoteProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [noteContent, setNoteContent] = useState(note.content)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isRewriting, setIsRewriting] = useState(false)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isEditing])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value)
    onUpdate(note.id, { 
      content: e.target.value,
      updatedAt: Date.now()
    })
  }

  const togglePin = () => {
    onUpdate(note.id, { isPinned: !note.isPinned });
  };

  const handleRewrite = async () => {
    if (!noteContent.trim() || isRewriting) return;
    
    setIsRewriting(true);
    try {
      const rewrittenText = await rewriteText(noteContent);
      setNoteContent(rewrittenText);
      onUpdate(note.id, {
        content: rewrittenText,
        updatedAt: Date.now()
      });
    } catch (error) {
      console.error('Error rewriting note:', error);
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div 
      className={`${note.color} dark:bg-opacity-10 p-4 rounded-lg shadow-lg min-h-[200px] relative group 
        transition-transform hover:scale-105 
        ${note.isPinned ? 'border-2 border-blue-500 dark:border-blue-400' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <select
          value={note.category || ''}
          onChange={(e) => onUpdate(note.id, { category: e.target.value })}
          className="bg-transparent border border-gray-300 dark:border-gray-600 
            rounded px-2 py-1 text-sm max-w-[120px] 
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" className="bg-white dark:bg-gray-800">No Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id} className="bg-white dark:bg-gray-800">
              {category.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleRewrite}
            disabled={isRewriting}
            className={`text-sm p-1.5 rounded-full 
              bg-white dark:bg-gray-700 bg-opacity-50 
              hover:bg-opacity-70 dark:hover:bg-opacity-70 
              text-gray-700 dark:text-gray-200
              transition-colors ${isRewriting ? 'cursor-not-allowed opacity-50' : ''}`}
            aria-label="Rewrite note"
          >
            {isRewriting ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={togglePin}
            className="p-1.5 rounded-full 
              bg-white dark:bg-gray-700 bg-opacity-50 
              hover:bg-opacity-70 dark:hover:bg-opacity-70 
              text-gray-700 dark:text-gray-200
              transition-colors"
            aria-label={note.isPinned ? "Unpin note" : "Pin note"}
          >
            <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-full 
              bg-red-500 dark:bg-red-600 
              hover:bg-red-600 dark:hover:bg-red-700 
              text-white transition-colors"
            aria-label="Delete note"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={noteContent}
          onChange={handleContentChange}
          onBlur={() => setIsEditing(false)}
          className="w-full h-full bg-transparent resize-none 
            focus:outline-none 
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400"
          rows={8}
          placeholder="Enter your note..."
        />
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className="w-full h-full cursor-text min-h-[120px] 
            text-gray-900 dark:text-gray-100"
        >
          {noteContent || 'Click to add note content'}
        </div>
      )}
      
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
        {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </div>
  )
} 