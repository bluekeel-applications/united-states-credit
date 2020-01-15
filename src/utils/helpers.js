import axios from 'axios';
const apiBaseUrl = 'https://programs.bluekeel-api.com/prod/api/';

export const getOfferList = async(req) => {
    try {
        const res = await axios({
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
        console.error('Error:', e);
        return e;
    }
};

export const addToClickCount = async(id) => {
    try {
        const res = await axios({
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: apiBaseUrl + 'program/add_click/' + id
        });

        if (res.status !== 200) {
            throw new Error('Error adding to click count.');
        };
        return res.data;
        
    } catch (e) {
        console.error('Error:', e);
        return e;
    }
};

const range = (start, end) => {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
};

export const selectFromMultiple = (count, endpoints) => {
    let usageTotal = 0;
    let activeIndex;
    
    let usageArray = endpoints.map((endpoint, i) => {
        let endpointRange;
        if (i === 0) { 
          usageTotal += endpoint.usage;
          endpointRange = range(1, endpoint.usage);
        } else {
          let newStart = usageTotal +1;
          let end = usageTotal + endpoint.usage;
          endpointRange = range(newStart, end);
          usageTotal += endpoint.usage;
        };
        return endpointRange;
    })

    usageArray.forEach((array, i) => {
      if(array.includes(count)) {
        activeIndex = i;
      }
    })
    
    return endpoints[activeIndex];
};

