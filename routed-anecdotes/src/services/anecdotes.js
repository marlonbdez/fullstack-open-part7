// the e2e submission platform runs json-server on a different port (3002)
// than local dev (3001), started via "npm run server:test" / "start:test"
const port = import.meta.env.MODE === 'test' ? 3002 : 3001
const baseUrl = `http://localhost:${port}/anecdotes`

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (object) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('Failed to delete anecdote')
  }

  return await response.json()
}

export default { getAll, createNew, remove }