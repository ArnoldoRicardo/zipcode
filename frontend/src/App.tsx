import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { FormikHelpers } from 'formik'
import { SearchZipcode, Values as ValuesForm } from './components/SearchZipcode'
import { ShowZipcode } from './components/ShowZipcode'
import { useHistorySearch, Item } from './useHistorySearch'

import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

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
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <SearchZipcode
              onSubmit={onSubmit}
              onClear={clear}
              data-testid="search"
            />
          </Grid>
          <Grid xs={12} md={8} spacing={2} container>
            <Grid xs={12}>
              <Typography paragraph variant="h5">
                <h3>Last search</h3>
              </Typography>
            </Grid>
            {items &&
              items.map((item: Item) => (
                <Grid item={true}>
                  <ShowZipcode
                    countryCode={item.countryCode}
                    code={item.code}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default App
