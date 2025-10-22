'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Check, X, Plus } from 'lucide-react'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTodos([newTodo, ...todos])
      setInputValue('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const startEditing = (id: string, text: string) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = () => {
    if (editingText.trim() && editingId) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const activeTodos = todos.filter(todo => !todo.completed).length
  const completedTodos = todos.filter(todo => todo.completed).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Neuro Task App
        </h1>

        <div className="bg-card rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-1"
            />
            <Button onClick={addTodo} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-secondary rounded-full">
              Active: {activeTodos}
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full">
              Completed: {completedTodos}
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full">
              Total: {todos.length}
            </span>
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No tasks yet. Add one above to get started!
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTodo(todo.id)}
                    className="shrink-0"
                  >
                    <Check
                      className={`h-4 w-4 ${
                        todo.completed
                          ? 'text-green-600'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>

                  {editingId === todo.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={saveEdit}
                        className="shrink-0"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={cancelEdit}
                        className="shrink-0"
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`flex-1 cursor-pointer ${
                          todo.completed
                            ? 'line-through text-muted-foreground'
                            : 'text-foreground'
                        }`}
                        onClick={() => toggleTodo(todo.id)}
                      >
                        {todo.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="shrink-0"
                        disabled={todo.completed}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-edit"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTodo(todo.id)}
                        className="shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Click on a task to mark it as complete</p>
          <p>Use the edit button to modify task text</p>
        </div>
      </div>
    </div>
  )
}