import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test('ex. 5.16 ', async () => {
  const mockHandleNewBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleNewBlog={mockHandleNewBlog} />)

  const inputTitle = screen.getByTestId('blog-form-title')
  const inputAuthor = screen.getByTestId('blog-form-author')
  const inputUrl = screen.getByTestId('blog-form-url')
  const inputButton = screen.getByTestId('blog-form-button')

  await user.type(inputTitle, 'my title')
  await user.type(inputAuthor, 'my author')
  await user.type(inputUrl, 'my url')
  await user.click(inputButton)

  expect(mockHandleNewBlog.mock.calls).toHaveLength(1)
  expect(mockHandleNewBlog.mock.calls[0][0].title).toBe('my title')
  expect(mockHandleNewBlog.mock.calls[0][0].url).toBe('my url')
  expect(mockHandleNewBlog.mock.calls[0][0].author).toBe('my author')
})
