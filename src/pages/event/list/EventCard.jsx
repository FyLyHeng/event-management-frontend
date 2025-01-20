import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';

import { Card, Modal } from "antd";
import { DeleteFilled, EditFilled, EyeOutlined } from "@ant-design/icons";
import { formatDate } from '../../../helpers/utils.js';


const EventCard = ({ event }) => {

    const navigate = useNavigate();
    const [errorMsg, setErrorMessage] = useState("")
    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const testImageUrl = 'http://res.cloudinary.com/dy4hdrdvb/image/upload/v1733630496/z1ocjbyvaci85tmgoeqi.png';


    const modalAttendenStyles = {
        header: {
            borderRadius: 0,
            paddingInlineStart: 5,
        },
        mask: {
            backdropFilter: 'blur(10px)',
        },
        content: {
            boxShadow: '0 0 30px #999',
        },
        body: {
            padding: '1rem'
        }
    };

    const eventAttendees = [
        { name: "Botha", email: "bopha@gmail.com", phone: "099999111" },
        { name: "Phich", email: "phich@gmail.com", phone: "098888882" }
    ];

    useEffect(() => {
        if (!event) {
            navigate('/event');
        }
    }, [event, navigate]);


    const toggleModal = (idx, target) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const handleEdit = async () => {
        navigate(`/event/edit/${event.id}`);
    };
    const handleDelete = async () => {

        console.log("errror Permission Denied!");
        setErrorMessage("Permission Denied!")
        return

        // deleteEvent(event.id).then(function (res) {
        //     if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
        //     else location.reload()
        // })
    };
    const handleViewDetail = async () => {
        navigate(`/event/preview/${event.id}`)
    };


    if (!event) {
        return null;
    }


    return (
        <Card
            className="border-gray-200 w-[320px] p-0"
            cover={<img src={testImageUrl} alt="" className="w-full h-[200px] object-cover " />}
        >
            <div className="flex gap-5 flex-col p-0">

                <div>
                    <span className="p-2 bg-gray-950 text-white font-bold cursor-pointer hover:text-yellow-400" title="Edit" onClick={handleEdit}><EditFilled /></span>
                    <span className="p-2 bg-red-600 text-white ml-4 font-bold cursor-pointer hover:text-yellow-400" onClick={handleDelete} title="Delete"><DeleteFilled /></span>
                    <span className="p-2 bg-white border-2 ml-4 font-bold cursor-pointer hover:text-yellow-400" onClick={handleViewDetail} title="Preview"><EyeOutlined /></span>
                    <span className="cursor-pointer hover:underline hover:font-bold icon" onClick={() => toggleModal(0, true)}><strong>{event?.totalAttendees}</strong>  Attendees</span>
                </div>

                <h2 className="font-medium text-xl line-clamp-2">{event.title}</h2>
                <p className="line-clamp-4">{event.description}</p>

                <span className="flex gap-3">
                    <CalendarDays size={18} />
                    <p>{formatDate(event.eventDate)}</p>
                </span>

                <span className="flex gap-3">
                    <MapPin strokeWidth={3} />
                    <p>{event.eventVenueAddress}</p>
                </span>
            </div>

            <Modal
                className="lg: min-w-[500px]"
                title={`Event Attendees - ${event.title}`}
                open={isModalOpen[0]}
                onOk={() => toggleModal(0, false)}
                onCancel={() => toggleModal(0, false)}
                footer=""
                styles={modalAttendenStyles}
            >
                <ol className="list-decimal lg-min">
                    {eventAttendees.map((user) => (<li key={event.id}><strong>{user.name}</strong> - {user.email} | {user.phone}</li>))}
                </ol>
            </Modal>
        </Card>
    );
};

export default EventCard;
