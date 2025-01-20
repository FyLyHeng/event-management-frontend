import apiClient from './apiClient';

const path = 'venue'


export const fetchVenues = async () => {

    try {

        const response = await apiClient.get(path+'/list', {
            authRequired: false,
            headers : {'X-API-KEY' : '1'}
        });

        console.log('venues fetchs list');
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw new Error("Failed to fetch events");
    }
};




export const createVenue = async (venueData) => {
    try {
        const response = await apiClient.post(path, venueData, {
            authRequired: false,
            headers : {'X-API-KEY' : '1'}
          });
        
        console.log("create event : "+response.status);
        return response;
        
    } catch (error) {
        console.error("Fails to create event"+ error);
        throw new Error("Fails to create event");
    }
};