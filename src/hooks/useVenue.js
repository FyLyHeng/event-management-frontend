import { useState, useEffect } from "react";
import { fetchVenues } from "../api/venueService";


export const useFetchVenues = () => {
    const [venues, setVenues] = useState([]);
    const [isLoading, setisLoading] = useState(null);
    const [error, setError] = useState(null);

    const handelFetchVenue = async () => {

        setisLoading(true);

        try {

            const data = await fetchVenues();
            setVenues(data);

            console.log("venue : "+data);

        } catch (err) {
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        handelFetchVenue();
    }, []);

    return { handelFetchVenue, venues, isLoading, error };
};