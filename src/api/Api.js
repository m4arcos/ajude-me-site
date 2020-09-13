class Api {

    /**
     * Caminho base da API
     */
    baseUrl = "http://localhost:8080/mocks/";

    endpoint = "";

    constructor(endpoint) {
        if (!endpoint) {
            throw new TypeError('Invalid endpoint');
        }

        this.endpoint = endpoint;
    }

    getGetEndpoint(id = null) {
        id = int(id);

        return this.baseUrl + this.endpoint + (id ? '/' + id : id);
    }

    getPostEndpoint(id = null) {
        id = int(id);

        return this.baseUrl + this.endpoint;
    }

    getPutEndpoint(id = null) {
        id = int(id);

        if (!id || id <= 0) {
            throw new TypeError('ID inválido');
        }

        return this.baseUrl + this.endpoint + '/' + id ;
    }

    getDeletEndpoint(id = null) {
        id = int(id);

        if (!id || id <= 0) {
            throw new TypeError('ID inválido');
        }

        return this.baseUrl + this.endpoint + '/' + id ;
    }

    // get(id = null) {
    //     const endpoint = this.getGetEndpoint(id);


    // }

}

export default Api;