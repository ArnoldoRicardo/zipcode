import { typeDefs, resolvers, server } from './app'
import { gql, ApolloServer } from 'apollo-server'

const GET_ZIPCODE = gql`
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

describe('test graphql with mocks', () => {
  const MOCK_API = {
    findZipcode: async (
      countryCode: string,
      code: string
    ): Promise<Zipcode> => {
        console.log(countryCode, code)
        if (countryCode !== 'us' || code !== '90210') throw Error
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({
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
          })
        }, 2000)
      })
    }
  }

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return { ZipcodeAPI: MOCK_API }
    }
  })

  it('test existing country', async () => {
    const result = await testServer.executeOperation({
      query: GET_ZIPCODE,
      variables: { code: '90210', countryCode: 'us' }
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.getZipcode?.country).toBe('United States')
    expect(result.data?.getZipcode?.countryCode).toBe('US')
  })

it('test dont existing country', async () => {
    const result = await testServer.executeOperation({
      query: GET_ZIPCODE,
      variables: { code: '90234', countryCode: 'zz' }
    })

    expect(result.errors?.length).toBe(1)
    if (result.errors) {
        if (result.errors.length > 1){
            expect(result.errors[0].message).toBe('Country not avalible consult https://zippopotam.us/#where')
        }
    }
  })
})


describe('test graphql server end to end', () => {
  it('test existing country', async () => {
    const result = await server.executeOperation({
      query: GET_ZIPCODE,
      variables: { code: '90210', countryCode: 'us' }
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.getZipcode?.country).toBe('United States')
    expect(result.data?.getZipcode?.countryCode).toBe('US')
  })

it('test dont existing country', async () => {
    const result = await server.executeOperation({
      query: GET_ZIPCODE,
      variables: { code: '90234', countryCode: 'zz' }
    })

    expect(result.errors?.length).toBe(1)
    if (result.errors) {
        if (result.errors.length > 1){
            expect(result.errors[0].message).toBe('Country not avalible consult https://zippopotam.us/#where')
        }
    }
  })
})
