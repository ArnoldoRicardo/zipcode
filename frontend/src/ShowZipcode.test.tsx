import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'

import { ShowZipcode, GET_ZIPCODE } from './ShowZipcode'

test('rendering zipcode info', async () => {
  const mocks = [
    {
      request: {
        query: GET_ZIPCODE,
        variables: { code: '90210', countryCode: 'US' }
      },
      result: {
        data: {
          getZipcode: {
            code: '90210',
            country: 'United States',
            countryCode: 'US',
            places: [
              {
                name: 'Beverly Hills',
                lon: -118.4065,
                state: 'California',
                stateCode: 'CA',
                lat: 34.0901
              }
            ]
          }
        }
      }
    }
  ]
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ShowZipcode countryCode="US" code="90210" />
    </MockedProvider>
  )
  const user = userEvent.setup()

  expect(await screen.findByText(/California/)).toBeTruthy()
  expect(await screen.findByText(/US/)).toBeTruthy()
  expect(await screen.findByText(/CA/)).toBeTruthy()
  expect(await screen.findByText(/Beverly Hills/)).toBeTruthy()
})
