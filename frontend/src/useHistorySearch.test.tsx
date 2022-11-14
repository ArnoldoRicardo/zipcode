import React from 'react'
import { renderHook, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'

import { useHistorySearch } from './useHistorySearch'

test('test history', async () => {
  const { result } = renderHook(() => useHistorySearch())
  act(() => {
    result.current.addItems({ countryCode: 'MX', code: '30140' })
  })
  expect(result.current.items.length).toBe(1)
  act(() => {
    result.current.addItems({ countryCode: 'MX', code: '30140' })
  })
  expect(result.current.items.length).toBe(2)
  act(() => {
    result.current.addItems({ countryCode: 'MX', code: '30140' })
  })
  expect(result.current.items.length).toBe(3)
  act(() => {
    result.current.addItems({ countryCode: 'MX', code: '30140' })
  })
  expect(result.current.items.length).toBe(4)
  act(() => {
    result.current.addItems({ countryCode: 'MX', code: '30140' })
  })
  expect(result.current.items.length).toBe(5)
  act(() => {
    result.current.addItems({ countryCode: 'MX', code: '30140' })
  })
  expect(result.current.items.length).toBe(5)
  act(() => {
    result.current.clear()
  })
  expect(result.current.items.length).toBe(0)
})
