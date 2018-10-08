
import Api from '@/services/Api'

export default {
    fetchVisaConnectivity(citizenshipISO, destinationISO) {
        return Api().get('visa-connectivity/' + citizenshipISO + "/" + destinationISO)
    }
}