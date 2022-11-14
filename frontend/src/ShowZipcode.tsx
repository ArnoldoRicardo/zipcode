import { useQuery, gql } from '@apollo/client'

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
    <div>
      <h3>Content</h3>
      code: {data.getZipcode.code}
      <br />
      Country: {data.getZipcode.country}
      <br />
      Country code: {data.getZipcode.countryCode}
      <br />
      <ol>
        {data.getZipcode.places.map((place: Place) => (
          <li key={place.name}>
            <ul>
              <li>name: {place.name}</li>
              <li>state code: {place.stateCode}</li>
              <li>state: {place.state}</li>
              <li>lat: {place.lat}</li>
              <li>lon: {place.lon}</li>
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
