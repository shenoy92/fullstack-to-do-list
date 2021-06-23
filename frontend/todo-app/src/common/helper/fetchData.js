import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

import auth from "./auth";
import { API_METHODS } from '../constants/api';

const loaderAndMsgObservable = new BehaviorSubject({ loader: false, message: '', error: '' });

export const getLoaderAndMsgStatus = () => {
    return loaderAndMsgObservable.asObservable();
}

export const fetchData = (url, httpMethod, body = null, options = null, SuccessMsg = '', showLoadingIndicator= true, addAuth = true) => {
    loaderAndMsgObservable.next({ loader: showLoadingIndicator, message: '', error: '' });
    let optionsPayload = {};
    if(options) optionsPayload = { ...options };
    if(addAuth) optionsPayload.headers = {'x-auth-token': auth.getAuthToken()}
    let response = null;
    switch (httpMethod) {
        case API_METHODS.get:
            response = axios.get(`${process.env.REACT_APP_API_BASE_URL}${url}`, optionsPayload)
            break;
        case API_METHODS.post:
            response = axios.post(`${process.env.REACT_APP_API_BASE_URL}${url}`, body, optionsPayload)
            break;  
        case API_METHODS.put:
            response = axios.put(`${process.env.REACT_APP_API_BASE_URL}${url}`, body, optionsPayload)
            break; 
        case API_METHODS.delete:
            response = axios.delete(`${process.env.REACT_APP_API_BASE_URL}${url}`, optionsPayload)
            break;
        default:
            break;
    }
    return new Promise((resolve, reject) => {
        response.then((data) => {
            loaderAndMsgObservable.next({ loader: false, message: SuccessMsg, error: '' });
            resolve(data);
        })
        .catch((error) => {
            loaderAndMsgObservable.next({ loader: false, message: '', error: error.response.data.meta.message });
            // reject(error);
        })
    }) 
}