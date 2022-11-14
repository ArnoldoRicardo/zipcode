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
