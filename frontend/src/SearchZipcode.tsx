import React from 'react'
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik'
import { countries } from './constants'

export interface Values {
  country: string
  code: string
}

interface Props {
  onSubmit: (values: Values, { setSubmitting }: FormikHelpers<Values>) => void
}

export const SearchZipcode = ({ onSubmit }: Props) => {
  return (
    <div>
      <h3>Search Zipcode</h3>
      <Formik
        initialValues={{
          country: 'US',
          code: ''
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <label htmlFor="country">Country</label>
          <Field id="country" name="country" as="select">
            {countries &&
              countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
          </Field>

          <label htmlFor="code">Code</label>
          <Field id="code" name="code" />

          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  )
}
