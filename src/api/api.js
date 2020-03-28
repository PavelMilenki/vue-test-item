import axios from "axios";

const instance = axios.create({
    baseURL: "http://www.nbrb.by/api/exrates/",
});

export const api = {
    _processResponse(promise) {
        return promise.then(res => res.data).catch(error => {
            console.log(error);
            throw new Error('API error')
        })
    },
    getAllCurrency() {
        return this._processResponse(instance.get(`rates?periodicity=0`));
    },
    getCurrentCurrency(id, date) {
        return this._processResponse(instance.get(`rates/${id}?ondate=${date}`));
    }
};



