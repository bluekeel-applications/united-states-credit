import axios from 'axios';

export const getBlogArticles = async () => {
    try{
        const response = await axios({
            method: 'GET',
            url: 'https://y0fskvo9th.execute-api.us-east-1.amazonaws.com/staging/fetch_blogs'
        });
        return response.data;
    } catch(error){
        console.log(error.message);
    }

};