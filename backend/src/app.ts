import { gql, ApolloServer, UserInputError } from 'apollo-server'
import ZipcodeAPI from './zipcodeApi'

export const typeDefs = gql`
  type Zipcode {
    code: String!
    country: String!
    countryCode: String!
    places: [Place]
  }
  type Place {
    name: String!
    lon: Float!
    lat: Float!
    state: String!
    stateCode: String!
  }
  type Query {
    getZipcode(countryCode: String!, code: String!): Zipcode
  }
`

export const resolvers = {
  Query: {
    getZipcode: async (
      root: undefined,
      { countryCode, code }: getZipcodeArgs,
      { ZipcodeAPI }: Context
    ) => {
      try {
        return await ZipcodeAPI.findZipcode(countryCode, code)
      } catch (e) {
        throw new UserInputError(
          'Country not avalible consult https://zippopotam.us/#where'
        )
      }
    }
  }
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return { ZipcodeAPI }
  }
})

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
