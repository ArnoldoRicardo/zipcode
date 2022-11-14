import { v4 as uuidv4 } from 'uuid'
import { Fragment } from 'react'

import { useQuery, gql } from '@apollo/client'

import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export const GET_ZIPCODE = gql`
  query getZipcode($countryCode: String!, $code: String!) {
    getZipcode(countryCode: $countryCode, code: $code) {
      country
      code
      countryCode
      places {
        name
        lon
        lat
        state
        stateCode
      }
    }
  }
`
interface Props {
  countryCode: string
  code: string
}

export const ShowZipcode = ({ countryCode, code }: Props) => {
  const { loading, error, data } = useQuery(GET_ZIPCODE, {
    variables: { countryCode, code }
  })

  if (loading) return <div>'Loading...'</div>
  if (error) return <div>`Error! ${error.message}`</div>

  return (
    <Card>
      <CardHeader
        title={`${data.getZipcode.code} - ${data.getZipcode.countryCode}`}
        subheader={data.getZipcode.country}
      />
      <CardContent>
        <Typography paragraph variant="h5">
          near places:
        </Typography>
        {data.getZipcode.places.map((place: Place) => (
          <Fragment key={uuidv4()}>
            <Typography paragraph>{place.name}</Typography>
            <Typography paragraph color="text.secondary">
              {place.state} - {place.stateCode}
            </Typography>
            <Typography paragraph variant="body2" color="text.secondary">
              ({place.lat} {place.lon})
            </Typography>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  )
}
