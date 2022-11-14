interface Zipcode {
  code: string
  country: string
  countryCode: string
  places: [Place]
}

interface Place {
  name: string
  lon: number
  lat: number
  state: string
  stateCode: string
}

interface ZipcodeAPItype {
  findZipcode: (countryCode: string, code: string) => Zipcode
}

interface RawPlace {
    'place name': string
    longitude: number
    latitude: number
    state: string
    'state abbreviation': string
}

interface Context {
  ZipcodeAPI: ZipcodeAPItype
}

type getZipcodeArgs = Pick<Zipcode, 'countryCode' | 'code'>
