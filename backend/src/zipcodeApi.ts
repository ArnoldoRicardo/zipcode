import axios from 'axios'

const baseURL = 'http://api.zippopotam.us/'

const findZipcode = async (countryCode: string, code: string): Promise<Zipcode> => {
try {
    const response = await axios.get(`${baseURL}${countryCode}/${code}`);
    const newZipcode = await response.data
    return {
        code: newZipcode['post code'],
        country: newZipcode.country,
        countryCode: newZipcode['country abbreviation'],
        places: newZipcode.places.map((place: RawPlace) => {
            return {
                name: place['place name'],
                lon: Number(place.longitude),
                lat: Number(place.latitude),
                state: place.state,
                stateCode: place['state abbreviation'],
            }
        })
        
    }
  } catch (error) {
    throw error
  }
}

export default {
  findZipcode
}
