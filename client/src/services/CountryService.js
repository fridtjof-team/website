
import Api from '@/services/Api'

export default {
    fetchCountries() {
        return Api().get('countries')
    }
}