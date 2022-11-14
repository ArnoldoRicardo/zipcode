import React from 'react'
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik'
import { countries } from '../constants'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export interface Values {
  country: string
  code: string
}

interface Props {
  onSubmit: (values: Values, { setSubmitting }: FormikHelpers<Values>) => void
  onClear: () => void
}

export const SearchZipcode = ({ onSubmit, onClear }: Props) => {
  return (
    <Box sx={{ width: '90%' }}>
      <h3>Search Zipcode</h3>
      <Formik
        initialValues={{
          country: 'US',
          code: ''
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <Stack>
            <label htmlFor="country">Country:</label>
            <Field id="country" name="country" as="select">
              {countries &&
                countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
            </Field>
            <label htmlFor="code">Code:</label>
            <Field id="code" name="code" />
            <br />
            <Button type="submit" variant="contained">
              Search
            </Button>
            <br />
            <Button variant="outlined" onClick={onClear}>
              Clear history
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  )
}
