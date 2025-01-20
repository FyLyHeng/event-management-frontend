import React from 'react';
import {useParams} from "react-router-dom";

import EventDetail from './EventDetail';
import NavPage from '../../NavPage';

const EventDetailPage = () => {
  const eventId = useParams().id
    return (
        <div>
            <NavPage/>
            <EventDetail eventId={eventId}/>
        </div>
    );
};

export default EventDetailPage;
