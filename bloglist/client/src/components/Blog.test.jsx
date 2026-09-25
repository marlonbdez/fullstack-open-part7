import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

const blogExample = {
  title: 'Lorem Ipsum',
  author: 'Developer',
  url: 'http://loremipsum.com',
  likes: 0,
  user: {
    username: '007',
    name: 'James Bond',
    id: '007',
  },
}

const userExample = {
  name: 'Lorem Ipsum',
  username: 'lorem',
  password: 'ipsum',
}

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

test('ex. 5.27 not logged -> only blog info and likes, not buttons', () => {
  renderWithRouter(<Blog blog={blogExample} isDetailView={true} />)

  const title = screen.getByTestId('blog-title')
  const author = screen.getByTestId('blog-author')
  const url = screen.getByTestId('blog-url')
  const likes = screen.getByTestId('blog-likes-counter')

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()

  expect(screen.queryByTestId('blog-likes-button')).toBeNull()
  expect(screen.queryByTestId('blog-remove-button')).toBeNull()
})

test('ex. 5.27 logged (not creator) -> like button visible', () => {
  renderWithRouter(<Blog blog={blogExample} isDetailView={true} user={userExample} />)

  expect(screen.getByTestId('blog-likes-button')).toBeVisible()
  expect(screen.queryByTestId('blog-remove-button')).toBeNull()
})

test('ex. 5.27 logged (creator) -> delete button visible', () => {
  const creator = { username: '007', name: 'James Bond' }

  renderWithRouter(<Blog blog={blogExample} isDetailView={true} user={creator} />)

  expect(screen.getByTestId('blog-likes-button')).toBeVisible()
  expect(screen.getByTestId('blog-remove-button')).toBeVisible()
})
