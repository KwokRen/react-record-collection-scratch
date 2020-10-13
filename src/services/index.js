import Api from './apiConfig';
import { changeHeader, clearHeader } from './apiConfig';

export const register = async (userData) => {
    try {
        const resp = await Api.post('/register', userData);
        if (resp.status === 201) {
            await clearHeader();
            await localStorage.setItem('token', resp.data.token);
            await changeHeader();
        }
        return resp;
    } catch (error) {
        throw error
    }
}

export const login = async (userData) => {
    try {
        const resp = await Api.post('auth/users/login/', userData);
        if (resp.status === 200) {
            await clearHeader();
            await localStorage.setItem('token', resp.data.token);
            await changeHeader();
        }
        return resp;
    } catch (error) {
        throw error
    }
}

export const autologin = async () => {
    try {
        console.log(Api.defaults)
        const resp = await Api.get('auth/users/autologin/');
        if (resp.status === 200) {
            return resp;
        } else {
            return {error: "Autologin failed."}
        }
    } catch (error) {
        throw error
    }
}

export const getCollection = async (id) => {
    try {
        const resp = await Api.get(`api/collections/${id}/`);
        return resp;
    } catch(error) {
        throw error;
    }
}

export const artistSearch = async (searchString) => {
    try {
        const resp = await Api.get(`api/artist_search/${searchString}`)
        return resp
    } catch(error) {
        throw error
    }
}

export const getAddable = async (id) => {
    try {
        const resp = await Api.get(`api/addable/artist/${id}/`)
        return resp
    } catch(error) {
        throw error
    }
}