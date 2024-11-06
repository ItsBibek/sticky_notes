'use client'

import { useState, useEffect } from 'react'
import Note from './components/Note'
import SearchAndFilter from './components/SearchAndFilter'
import Modal from './components/Modal'
import ThemeToggle from './components/ThemeToggle'
import { NoteType, DEFAULT_CATEGORIES } from './types'
import { initializeAI } from './config/ai'

export default function Home() {
  const [notes, setNotes] = useState<NoteType[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'single' | 'all';
    noteId?: string;
  }>({
    isOpen: false,
    type: 'single'
  })

  useEffect(() => {
    initializeAI();
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem('sticky-notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sticky-notes', JSON.stringify(notes))
  }, [notes])

  const deleteAllNotes = () => {
    setDeleteModal({
      isOpen: true,
      type: 'all'
    })
  }

  const handleConfirmDelete = () => {
    if (deleteModal.type === 'all') {
      setNotes([])
    } else if (deleteModal.noteId) {
      setNotes(notes.filter(note => note.id !== deleteModal.noteId))
    }
  }

  const addNote = () => {
    const category = selectedCategory || DEFAULT_CATEGORIES[Math.floor(Math.random() * DEFAULT_CATEGORIES.length)].id
    const categoryColor = DEFAULT_CATEGORIES.find(c => c.id === category)?.color || 'bg-gray-100'
    
    const newNote = {
      id: Date.now().toString(),
      content: '',
      color: categoryColor,
      category: category,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setNotes([newNote, ...notes])
  }

  const updateNote = (id: string, updates: Partial<NoteType>) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        // If category is being updated, also update the note's color
        if (updates.category) {
          const categoryColor = DEFAULT_CATEGORIES.find(c => c.id === updates.category)?.color || note.color
          return { ...note, ...updates, color: categoryColor }
        }
        return { ...note, ...updates }
      }
      return note
    }))
  }

  const deleteNote = (id: string) => {
    setDeleteModal({
      isOpen: true,
      type: 'single',
      noteId: id
    })
  }

  const filteredNotes = notes
    .filter(note => 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || note.category === selectedCategory)
    )
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.updatedAt - a.updatedAt;
    });

  return (
    <main className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Sticky Notes</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={addNote}
              className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg 
                hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Add Note {selectedCategory ? `in ${DEFAULT_CATEGORIES.find(c => c.id === selectedCategory)?.name}` : ''}
            </button>
            <button
              onClick={deleteAllNotes}
              className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg 
                hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
            >
              Delete All
            </button>
          </div>
        </div>
        
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={DEFAULT_CATEGORIES}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredNotes.map(note => (
            <Note
              key={note.id}
              note={note}
              categories={DEFAULT_CATEGORIES}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: 'single' })}
        onConfirm={handleConfirmDelete}
        title={deleteModal.type === 'all' ? 'Delete All Notes' : 'Delete Note'}
        message={
          deleteModal.type === 'all'
            ? 'Are you sure you want to delete all notes? This action cannot be undone.'
            : 'Are you sure you want to delete this note? This action cannot be undone.'
        }
      />
    </main>
  )
}
