interface Zipcode {
  code: number
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
  findZipcode: (countryCode: string, code: number) => Zipcode
}

interface Context {
  ZipcodeAPI: ZipcodeAPItype
}

type getZipcodeArgs = Pick<Zipcode, 'countryCode' | 'code'>
