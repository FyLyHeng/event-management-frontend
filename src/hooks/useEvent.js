import { useState, useEffect } from "react";
import { fetchEvents, createEvent, deleteEvent, fetchEventDetail } from "../api/eventService";


export const useFetchEvents = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setisLoading] = useState(null);
    const [error, setError] = useState(null);

    const handelFetchEvent = async () => {

        setisLoading(true);

        try {

            const data = await fetchEvents();
            setEvents(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    return { handelFetchEvent, events, isLoading, error };
};

export const useFetchEventDetail = (eventId , onSuccess)  => {

    const [isLoading, setisLoading] = useState(null);
    const [error, setError] = useState(null);

    const handelFetchEventDetail = async () => {

        setisLoading(true);

        try {

            const data = await fetchEventDetail(eventId);
            onSuccess(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        handelFetchEventDetail();
    }, []);

    return { handelFetchEventDetail, isLoading, error };
};


export const useCreateEvent = (onSuccess) => {

    const [isLoading, setIsLoading] = useState(false);
    const [event, setEvent] = useState({ title: '', eventDate: '', description: '' });
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });

    useEffect (()=>{

        setEvent({ title: 'Title 1', eventDate: '2025-12-31', description: 'desc' });
        
    }, [])


    const handleChange = (field, value) => {
        setEvent((prevEvent) => ({
            ...prevEvent,
            [field]: value,
        }));
    };


    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => setAlert({ ...alert, visible: false }), 200); // Auto-dismiss after 3 seconds
    };


    const handleCreateEvent = async () => {

        if (event.title && event.eventDate && event.description) {

            setIsLoading(true);
            try {
                await createEvent(event);

                onSuccess();
                showAlert('Event added successfully!', 'success');
            } catch (err) {
                showAlert(err.message, 'error');
            } finally {
                setIsLoading(false);
            }

        } else {
            showAlert('Please fill in all fields!', 'error');
        }

    };

    return { handleChange, handleCreateEvent, event, isLoading, alert};
};


export const useDeleteEvent = (onSuccess) => {

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });



    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => setAlert({ ...alert, visible: false }), 200);
    };


    const handleDeleteEvent = async (eventId) => {

        if (eventId) {

            setIsLoading(true);
            try {
                await deleteEvent(eventId);

                onSuccess();
                showAlert('Event Delete successfully!', 'success');
            } catch (err) {
                showAlert(err.message, 'error');
            } finally {
                setIsLoading(false);
            }

        } else {
            showAlert('Please fill in all fields!', 'error');
        }

    };

    return { handleDeleteEvent,  isLoading, alert};
};