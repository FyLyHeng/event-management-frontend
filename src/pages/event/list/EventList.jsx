import React, { useEffect, useState } from 'react';
import { Empty } from "antd";

import { getUser } from "../../../helpers/utils";
import EventCard from './EventCard';
import { useFetchEvents } from '../../../hooks/useEvent';
import EventLoader from '../../../globals/eventLoader';


const user = getUser()

const EventList = () => {

    const { handelFetchEvent ,events, isLoading } = useFetchEvents();

    useEffect (() => {
        handelFetchEvent();
    },[]);


    return (
        <div className="w-full pt-10">
            <div className="grid grid-cols-1 mt-4 py-5 sm:grid-cols-2 md:grid-cols-4 mx-auto w-fit gap-10">
                {events?.map((event) => (
                    <EventCard event={event} key={event.id} />
                ))}
                {isLoading ? <EventLoader count={8} /> : ''}
            </div>
            {!isLoading && !events?.length &&  <EventEmpty />}
        </div>
    );
};


const EventEmpty = () => {
    return (
        <div className="flex justify-center items-center screen">
            <Empty
                description="No Events Found"
                imageStyle={{ height: 150 }}
            />
        </div>
    )
}

export default EventList;
