import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let createBlog, component

  beforeEach(() => {

    createBlog = jest.fn()

    component = render(
      <BlogForm createBlog={createBlog} />
    )

  })

  test('calls event handler correctly when new blog is created', () => {

    const form = {
      title: {
        input: component.container.querySelector('#titleInput'),
        value: 'Blog 1'
      },
      author: {
        input: component.container.querySelector('#authorInput'),
        value: 'Author 1'
      },
      url: {
        input: component.container.querySelector('#urlInput'),
        value: 'https://www.blog1.com'
      }
    }

    for (let v of Object.values(form)) {
      fireEvent.change(v.input, { target: { value: v.value } })
    }

    const createButton = component.container.querySelector('#createButton')
    fireEvent.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    for (let k of Object.keys(form)) {
      expect(createBlog.mock.calls[0][0][k]).toBe(form[k].value)
    }

  })

})