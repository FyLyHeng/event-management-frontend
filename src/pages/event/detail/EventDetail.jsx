import React, {useEffect, useState} from 'react';
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react';

import { EventHighlightLoader, EventContentLoader, EventOrganizerLoader } from '../../../globals/eventDetailsLoader';

import {formatDate, getUser} from '../../../helpers/utils';
import {DoneOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {DeleteOutlined, EditOutlined, LoadingOutlined} from "@ant-design/icons";
import {Alert, Spin} from "antd";

import { useFetchEventDetail } from '../../../hooks/useEvent';

const EventDetail = ({eventId}) => {

  const navigate = useNavigate();
  const {event, isFetching, error} = useFetchEventDetail(eventId);
  
  const eventAgenda = [
    {'title':'Agenda 1','start' : Date().toString(), 'duration' : '30 min', 'description' : 'Agenda 1 start at morning'},
    {'title':'Agenda 2','start' : Date().toString(), 'duration' : '1 h', 'description' : 'Agenda 2 start at afternoon'}
  ]

  // const [event, setEvent] = useState()
  const [user, setUser] = useState(getUser())
  const [registered, setRegistered] = useState(false)
  // const [registerUser, { registerLoading }] = useRegisterAttendeeMutation();
  // const [deRegisterUser, { deRegisterLoading }] = useDeRegisterAttendeeMutation();
  // const [deleteEvent, { deleteLoading }] = useDeleteEventMutation();
  const [errorMsg, setErrorMessage] = useState("")

  useEffect(() => {
    if (event && user){
      // Am I registered to this event?
      //setRegistered(!!event.attendees.find(_user => _user.id === user.id))
    }
  }, [event, user]);


  // const handleRegister = async () =>{
  //   setErrorMessage("")
  //   if (!user)
  //     navigate('/login')
  //   if (registered){
  //     await deRegisterUser({eventId:event.id, userId:user.id}).then((res)=>{
  //       if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
  //     })
  //   }else{
  //     await registerUser({eventId: event.id, userId: user.id}).then((res)=>{
  //       if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
  //     })
  //   }
  // }

  // const handleDelete = async () =>{
  //   setErrorMessage("")
  //   if (event.user_id.id !== user.id) {
  //     // User can only delete their events
  //     setErrorMessage("Permission denied!")
  //     return
  //   }
  //   // Calls delete event API
  //   await deleteEvent(event.id).then(function (res){
  //     if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
  //     else navigate('/events')
  //   })
  // }

  const handleEdit = async () => {
    navigate(`/dashboard/my-events/${event?.id}`)
  }

  return (
    <div>
      {
        isFetching ? <EventHighlightLoader/> : <div
          className="w-full flex flex-col sm:flex-row events-header  pt-20 imaage">

          {/* header   */}
          <div
            className="w-full sm:w-1/2 text-white gap-8 flex flex-col px-16 sm:px-12 justify-center text-2xl ">
            <h1
              className="text-2xl lg:text-4xl font-medium ">{event?.title}</h1>
            <span className="flex gap-6">
                        <CalendarDays/>
                        <p>{formatDate(event?.eventDate)}</p>
                    </span>
            <span className="flex gap-6">
                        <MapPin/>
                        <p>{event.eventVenueAddress}</p>
                    </span>
          </div>
          
          {
            user && event?.user_id?.id === user.id ?

              // {/* buton edit, delete, register  //todo : remove this*/}
              <div className="w-full sm:w-1/2 mt-5 sm:mt-0 flex flex-col justify-center">
                <div className="flex justify-start flex-wrap items-center">

                  <button className="bg-gray-800 px-4 py-2 text-white" onClick={handleEdit}><EditOutlined/> Edit
                  </button>
                  
                  
                  <button className="bg-red-700 px-4 py-2 text-white ml-4" >
                    {deleteLoading ? <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/> : <><DeleteOutlined/> Delete</>}
                  </button>

                </div>
                {errorMsg && <Alert className="mt-4 max-w-[350px]" message={errorMsg} type="error" />}
              </div>
              :
              // button register
              <div
                className="w-full sm:w-1/2 flex justify-center  items-center mt-5 sm:mt-0">
                  <button className="bg-gray-600 px-4 py-2 text-white" ><DoneOutlined/> Publish </button>
              </div>
          }
          
        </div>
      }

      <div className="p-5 px-16 box-content">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          {
            isFetching ? <EventContentLoader/> :
              <div
                className="w-full sm:w-[70%] mr-5 flex flex-col gap-5">
                <h1
                  className="uppercase text-gray-600 text-xl">Description</h1>
                <p className="text-base mt-3 w-full">
                  {event?.description}
                </p>
                {
                  eventAgenda.length ? <h1
                    className="text-4xl font-medium mt-2 text-gray-600">Agendas</h1> : ""
                }

                {eventAgenda.map((track, index) => (
                  <div key={index}
                       className="flex flex-col border-s-8 p-3 border">
                    <p>{formatDate(track.start_date)}</p>
                    <p className="text-primary">{track.title}</p>
                    <p>
                      {track?.user_id?.name}
                      <span
                        className="text-gray-500"><span
                        className="text-2xl mx-2">.</span> {track.duration} hrs
                                  </span>
                    </p>
                  </div>
                ))}
              </div>
          }
          {
            isFetching ? <EventOrganizerLoader/> :
              <div
                className="w-full sm:w-[30%] mt-5 sm:mt-0 text-sm flex flex-col gap-4 border-s-2 border-primary p-3">
                <h1 className="uppercase text-gray-600 text-xl">Organizer</h1>
                <p className="text-xl">{event?.user_id?.name}</p>
                <span className="flex gap-4">
                            <Phone size={18} strokeWidth={1}/>
                            <p>{event?.user_id?.phone}</p>
                        </span>
                <span className="flex gap-4">
                            <Mail size={18} strokeWidth={1}/>
                            <p>{event?.user_id?.email}</p>
                        </span>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
