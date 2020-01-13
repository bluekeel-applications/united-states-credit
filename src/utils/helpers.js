import { attach, getConfig } from 'retry-axios';
import axios from 'axios';
const apiBaseUrl = 'https://programs.bluekeel-api.com/prod/api/';

// Used to automatically retry failed http requests
const myAxiosInstance = axios.create();
myAxiosInstance.defaults.raxConfig = {
    instance: myAxiosInstance,
    // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
    retry: 3,
    // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
    noResponseRetries: 2,
    // Milliseconds to delay at first.  Defaults to 100.
    retryDelay: 100,
    // HTTP methods to automatically retry.  Defaults to:
    // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],

    // The response status codes to retry.  Supports a double
    // array with a list of ranges.  Defaults to:
    // [[100, 199], [429, 429], [500, 599]]
    statusCodesToRetry: [
        [100, 199],
        [429, 429],
        [500, 599]
    ],

    // You can detect when a retry is happening, and figure out how many
    // retry attempts have been made
    onRetryAttempt: (err) => {
        const cfg = getConfig(err);
        console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
    }
};

const interceptorId = attach(myAxiosInstance);

export const getOfferList = async(req) => {
    try {
        console.log('req:', req);
        const res = await myAxiosInstance({
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: apiBaseUrl + 'program/offers',
            data: req
        });

        if (res.status !== 200) {
            throw new Error('Error fetching offers.');
        };

        if (res.data && res.data.length > 0) {
            return res.data;
        };

        return [{
            click_count: 0,
            endpoints: []
        }];
        
    } catch (e) {
        console.log('interceptor:', interceptorId);
        console.error('Error:', e);
        return;
    }
};