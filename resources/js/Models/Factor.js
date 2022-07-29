import { Model } from 'vue-api-query'

export default class Factor extends Model {
    baseURL() {
        return TicketAllocator.basePath + '/api/v1'
    }

    request(config) {
        return this.$http.request(config)
    }

    resource() {
        return 'factors'
    }
}
