import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'

import { SearchZipcode } from './SearchZipcode'

test('rendering and submitting a Formik form', async () => {
  const handleSubmit = vi.fn()
  const onClear = vi.fn()
  render(<SearchZipcode onSubmit={handleSubmit} onClear={onClear} />)
  const user = userEvent.setup()

  await user.selectOptions(screen.getByLabelText(/Country/i), ['MX'])
  await user.type(screen.getByLabelText(/Code/i), '30140')

  await user.click(screen.getByRole('button', { name: /Search/i }))

  expect(handleSubmit).toHaveBeenCalled()
  expect(handleSubmit.mock.calls[0][0]).toStrictEqual({
    country: 'MX',
    code: '30140'
  })
})
