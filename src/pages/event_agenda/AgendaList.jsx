import React from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { useFetchAgendaByEvent } from '../../hooks/useAgenda';
import AgendaAdd from './AgendaAdd';
import AgendaEdit from './AgendaEdit';


const AgendaList = ({ eventId }) => {

    const { handelFetchAgendas,agendas } = useFetchAgendaByEvent(eventId);

    const handleDeleteAgenda = (agendaId) => {
        // Handle delete logic
    };

    return (
        <div>
            <div className='max-h-[calc(100vh-250px)] overflow-auto mb-12'>
                {agendas.map((agenda, index) => (

                    <div key={index} className="flex justify-between border-s-8 border mb-4 p-3 px-8">
                        <div className="flex flex-col">
                            <p className="text-primary font-bold">{agenda.title}</p>
                            <p>{agenda.description}</p>
                        </div>

                        <div className="flex flex-col items-end gap-6">

                            <AgendaEdit agenda={agenda} handelFetchAgendas = {handelFetchAgendas}></AgendaEdit>

                            <DeleteOutlined
                                className="text-xl cursor-pointer text-red-600"
                                onClick={() => handleDeleteAgenda(agenda.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <AgendaAdd eventId={eventId} handelFetchAgendas={handelFetchAgendas} />
        </div>
    )
};

export default AgendaList;


