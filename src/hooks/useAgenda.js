import { useState, useEffect } from "react";
import { fetchAgendas, fetchAgendaByEvent, createAgenda, updateAgenda } from "../api/agendaService";
import {message} from "antd";


export const useFetchAgendas = () => {
    const [agendas, setAgendas] = useState([]);
    const [isLoading, setisLoading] = useState(null);
    const [error, setError] = useState(null);

    const handelFetchAgendas = async () => {

        setisLoading(true);

        try {

            const data = await fetchAgendas();
            setAgendas(data);

            console.log("agendas : " + data);

        } catch (err) {
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        handelFetchAgendas();
    }, []);

    return { handelFetchAgendas, agendas, isLoading, error };
};

export const useFetchAgendaByEvent = (eventId) => {
    const [agendas, setAgendas] = useState([]);
    const [isLoading, setisLoading] = useState(null);
    const [error, setError] = useState(null);

    const handelFetchAgendas = async () => {

        setisLoading(true);

        try {

            const data = await fetchAgendaByEvent(eventId);
            setAgendas(data);

            console.log("agendas : " + data);

        } catch (err) {
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        handelFetchAgendas();
    }, []);

    return { handelFetchAgendas, agendas, isLoading, error };
};

export const useCreateAgenda = (callBack) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateAgenda = async (agenda) => {
        setIsLoading(true);
        try {
            const response = await createAgenda(agenda);

            console.log("agenda response "+ response);
            if (response.status === 200) {
                callBack();
                message.success("Save Successfully");
            } else {
                
                message.error("Failed to save agenda.");
            }
        } catch (err) {
            message.error(err.message || "An unexpected error occurred.");
            
        } finally {
            setIsLoading(false);
        }
    };
    return { handleCreateAgenda, isLoading };
};

export const useUpateAgenda = (callBack) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpateAgenda = async (agenda) => {
        setIsLoading(true);

        try {
            const response = await updateAgenda(agenda);
            if (response.status === 200) {
                message.success("Update Successfully");
                callBack();
            } else {
                message.error("Failed to save agenda.");
                
            }
        } catch (err) {
            message.error(err.message || "An unexpected error occurred.");
            
        } finally {
            setIsLoading(false);
        }
    };
    return { handleUpateAgenda, isLoading };
};
