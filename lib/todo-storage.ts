'use client';

import type { Todo } from '@/types/todo'

const STORAGE_KEY = 'neuro-todos'

export function loadTodos(): Todo[] {
  if (typeof window === 'undefined') {
    return []
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    
    const parsed = JSON.parse(stored)
    return parsed.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }))
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error)
    return []
  }
}

export function saveTodos(todos: Todo[]): void {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error)
  }
}