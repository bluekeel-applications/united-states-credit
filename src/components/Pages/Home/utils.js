import axios from 'axios';

export const getBlogArticles = async () => {
    try{
        const response = await axios({
            method: 'GET',
            url: 'https://f8fjn5bgw2.execute-api.us-east-1.amazonaws.com/prod/fetch_blogs'
            // url: 'https://y0fskvo9th.execute-api.us-east-1.amazonaws.com/staging/fetch_tst_blogs'
        });
        return response.data;
    } catch(error){
        console.log(error.message);
    }

};