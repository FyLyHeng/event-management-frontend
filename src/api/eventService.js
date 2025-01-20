import apiClient from './apiClient';

const path = 'event'


export const fetchEvents = async () => {

    try {
        const response = await apiClient.get(path+'/list', {
            authRequired: false,
            headers : {'X-API-KEY' : '1'}
          });
        
        
        console.log('event fetchs list');
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw new Error("Failed to fetch events");
    }
};

export const fetchEventDetail = async (eventId) => {

    try {
        const response = await apiClient.get(path+'/'+eventId, {
            authRequired: false,
            headers : {'X-API-KEY' : '1'}
          });
        
        
        console.log('event fetch detail');
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw new Error("Failed to fetch event detail");
    }
};



export const createEvent = async (eventData) => {
    try {
        const response = await apiClient.post(path, eventData, {
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


export const deleteEvent = async (eventId) => {
    try {
        const response = await apiClient.put(path+"/delete", eventId, {
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