import React from 'react';
import {useParams} from "react-router-dom";

import Nav from '../../NavPage';
import EditEvent from './EventEdit';

const EventEditPage = () => {
  const eventId = useParams().id
    return (
        <div>
            <Nav />
            <EditEvent eventId={eventId}/>
        </div>
    );
};

export default EventEditPage;
