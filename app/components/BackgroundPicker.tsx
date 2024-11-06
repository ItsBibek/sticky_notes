'use client'

import { useState, useRef, useEffect } from 'react'
import { NOTE_BACKGROUNDS } from '../types'

interface BackgroundPickerProps {
  currentBackground: string
  onSelect: (background: string) => void
}

export default function BackgroundPicker({ currentBackground, onSelect }: BackgroundPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm px-2 py-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70 transition-colors"
        aria-label="Change background"
      >
        🎨
      </button>

      {isOpen && (
        <div className="fixed transform -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 p-4 bg-white rounded-lg shadow-2xl z-50 w-80">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
            
            <div className="space-y-4">
              {/* Solid Colors */}
              <div>
                <h3 className="text-xs font-semibold mb-2">Solid Colors</h3>
                <div className="grid grid-cols-6 gap-2">
                  {NOTE_BACKGROUNDS.solid.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => {
                        onSelect(bg.class)
                        setIsOpen(false)
                      }}
                      className={`w-8 h-8 rounded-full ${bg.class} border border-gray-200 hover:scale-110 transition-transform ${
                        currentBackground === bg.class ? 'ring-2 ring-blue-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Gradients */}
              <div>
                <h3 className="text-xs font-semibold mb-2">Gradients</h3>
                <div className="grid grid-cols-2 gap-2">
                  {NOTE_BACKGROUNDS.gradient.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => {
                        onSelect(bg.class)
                        setIsOpen(false)
                      }}
                      className={`h-10 rounded-md ${bg.class} hover:scale-105 transition-transform ${
                        currentBackground === bg.class ? 'ring-2 ring-blue-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Patterns */}
              <div>
                <h3 className="text-xs font-semibold mb-2">Patterns</h3>
                <div className="grid grid-cols-3 gap-2">
                  {NOTE_BACKGROUNDS.pattern.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => {
                        onSelect(bg.class)
                        setIsOpen(false)
                      }}
                      className={`h-10 rounded-md ${bg.class} hover:scale-105 transition-transform ${
                        currentBackground === bg.class ? 'ring-2 ring-blue-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 