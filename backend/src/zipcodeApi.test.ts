import zipcodeApi from './zipcodeApi'
import {AxiosError} from 'axios'

describe('test zippopotamus', () => {
  it('test us code', async () => {
      const result = await zipcodeApi.findZipcode('us', '90210')

      expect(result.code).toBe('90210')
      expect(result.countryCode).toBe('US')
  })

it('test mx code', async () => {
      const result = await zipcodeApi.findZipcode('mx', '90210')

      expect(result.code).toBe('90210')
      expect(result.countryCode).toBe('MX')
  })

it('test ad code', async () => {
      const result = await zipcodeApi.findZipcode('ad', 'AD100')

      expect(result.code).toBe('AD100')
      expect(result.countryCode).toBe('AD')
  })

it('test missing code', async () => {
    try {
      const result = await zipcodeApi.findZipcode('zz', 'asdf')
    } catch (e: Error | AxiosError) {
        expect(e.response.status).toBe(404)
    }
  })

})
