import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { FormikHelpers } from 'formik'
import { SearchZipcode, Values as ValuesForm } from './SearchZipcode'
import { ShowZipcode } from './ShowZipcode'
import { useHistorySearch, Item } from './useHistorySearch'

const App = () => {
  const [countryCode, setCountryCode] = useState('US')
  const [code, setcode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { items, addItems, clear } = useHistorySearch()

  const onSubmit = (values: ValuesForm) => {
    setCountryCode(values.country)
    setcode(values.code)
    setSubmitting(true)
    addItems({ countryCode: values.country, code: values.code })
  }

  return (
    <div>
      <SearchZipcode onSubmit={onSubmit} data-testid='search'/>
      <h3>Last search</h3>
      {items &&
        items.map((item: Item) => (
          <div data-testid='history'>
            {item.code} - {item.countryCode}
          </div>
        ))}
      <button onClick={clear}>clear history</button>
      {submitting && <ShowZipcode countryCode={countryCode} code={code} data-testid='show'/>}
    </div>
  )
}

export default App
