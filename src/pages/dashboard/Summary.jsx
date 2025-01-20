import * as React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import {
    CalendarClock,
    CalendarDays,
    Globe,
    ListTodo,
    MapPin,
    Plus,
    UsersRound,
} from 'lucide-react';

import { Card } from 'antd';
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { getUser } from '../../helpers/utils.js';
import { useFetchEvents } from '../../hooks/useEvent.js';


const CardLoader = () => {
    return (
        <Box className="w-[250px] h-[100px] flex justify-start gap-2 items-center bg-white px-4 border-[1px] rounded-md border-gray-100">
            <Skeleton animation="wave" width={80} height={120} className="bg-gray-600 rounded-[20px]" />
            <div>
                <Skeleton animation="wave" width={80} height={50} className="bg-gray-600" />
                <Skeleton animation="wave" width={150} height={30} className="bg-gray-600" />
            </div>
        </Box>
    )
}

const Summary = () => {
    const navigate = useNavigate();
    const user = getUser()
    const [data, setData] = useState(null);
    let { data: eventsList, isFetching, isSuccess, isError, error } = useFetchEvents();

    useEffect(() => {
        if (eventsList) {
            const user_events = eventsList?.filter((event) => {
                return event.user_id.id === user.id;
            });
            const registered_events = eventsList?.filter((event) => {
                return event.attendees.find((_user) => _user.id === user.id);
            });
            const user_past_events = user_events.filter((event) => {
                return new Date(event.start_date) <= new Date();
            });
            const user_upcoming_events = user_events.filter((event) => {
                return new Date(event.start_date) > new Date();
            });
            const registered_past_events = registered_events.filter((event) => {
                return new Date(event.start_date) <= new Date();
            });
            const registered_upcoming_events = registered_events.filter((event) => {
                return new Date(event.start_date) > new Date();
            });
            const registered_users = user_events.reduce(
                (accumulator, event) => accumulator + event.attendees.length,
                0
            );
            setData({
                user_events,
                registered_events,
                user_past_events,
                user_upcoming_events,
                registered_past_events,
                registered_upcoming_events,
                registered_users,
            });
        }
    }, [eventsList]);

    return (
        <div className="flex flex-col  gap-4">

            <div>
                <h2 className="py-2 text-lg">Events you are managing</h2>
                <div className="flex justify-between flex-wrap gap-4">

                    <Card className="w-full md:w-[250px] h-[100px]">
                        <div className="flex justify-start gap-4">
                            <div>
                                <CalendarClock
                                    className="bg-primary  text-white  p-2 rounded-[20px]"
                                    size={55}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-2xl">
                                    {5}
                                </h2>
                                <p className="capitalize text-gray-600n text-sm">past events</p>
                            </div>
                        </div>
                    </Card>


                    <Card className="w-full md:w-[250px] h-[100px]    ">
                        <div className="flex justify-start gap-4 ">
                            <div>
                                <CalendarDays
                                    className="bg-yellow-400  text-white  p-2 rounded-[20px]"
                                    size={55}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-2xl">
                                    {5}
                                </h2>
                                <p className="capitalize text-gray-600n text-sm">upcoming events</p>
                            </div>
                        </div>
                    </Card>


                    <Card className="w-full md:w-[250px] h-[100px]   ">
                        <div className="flex justify-start gap-4">
                            <div>
                                <ListTodo
                                    className="bg-pink-500  text-white  p-2 rounded-[20px]"
                                    size={55}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-2xl">{5}</h2>
                                <p className="capitalize text-gray-600n text-sm">all events</p>
                            </div>
                        </div>
                    </Card>


                    <Card className="w-full md:w-[250px] h-[100px]">
                        <div className="flex justify-start gap-4">
                            <div>
                                <UsersRound
                                    className="bg-green-500  text-white  p-2 rounded-[20px]"
                                    size={55}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-2xl">{10}</h2>
                                <p className="capitalize text-gray-600n text-sm">
                                    registered users
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    );
};


export default Summary;
