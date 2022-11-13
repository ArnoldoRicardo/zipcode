import { typeDefs, resolvers } from './app'
import { gql, ApolloServer } from 'apollo-server'

const GET_US = gql`
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

describe('test graphql', () => {
  const MOCK_API = {
    findZipcode: async (
      countryCode: string,
      code: number
    ): Promise<Zipcode> => {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({
            code: 90210,
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

  it('returns hello with the provided name', async () => {
    const result = await testServer.executeOperation({
      query: GET_US,
      variables: { code: '90210', countryCode: 'us' }
    })

    expect(result.errors).toBeUndefined()
    console.log(result.data?.getZipcode?.country)
    expect(result.data?.getZipcode?.country).toBe('United States')
    expect(result.data?.getZipcode?.countryCode).toBe('US')
  })
})
