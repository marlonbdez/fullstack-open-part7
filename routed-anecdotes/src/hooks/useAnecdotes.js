import { useState } from 'react'
import anecdotesService from '../services/anecdotes'
import { useEffect } from 'react'

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdotesService.getAll().then((response) => {
      setAnecdotes(response)
    })
  }, [])

  const addAnecdote = async (anecdote) => {
    const result = await anecdotesService.createNew(anecdote)
    setAnecdotes([...anecdotes, result])
  }

  const deleteAnecdote = async (anecdoteId) => {
    const result = await anecdotesService.remove(anecdoteId)
    setAnecdotes([...anecdotes.filter(a => a.id !== result.id)])
  }

  return {
    anecdotes,
    setAnecdotes,
    addAnecdote,
    deleteAnecdote
  }
}