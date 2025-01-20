import apiClient from './apiClient';

const path = 'agenda'


export const fetchAgendas = async () => {

    try {

        const response = await apiClient.get(path+'/list', {
            authRequired: false,
            headers : {'X-API-KEY' : '1'}
        });

        console.log('agenda fetchs list');
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw new Error("Failed to fetch agenda");
    }
};

export const fetchAgendaByEvent = async (eventId) => {

    try {

        const response = await apiClient.get(path+'/event_id/'+eventId, {
            authRequired: false,
            headers : {'X-API-KEY' : '1'}
        });

        console.log('agenda fetchs list');
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw new Error("Failed to fetch agenda");
    }
};


export const createAgenda = async (agenda) => {
    try {
        const response = await apiClient.post(path, agenda, {
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

export const updateAgenda = async (agenda) => {
    try {
        const response = await apiClient.put(path+"/"+agenda.id, agenda, {
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