import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Button, Alert, DatePicker, Input, Select, Upload, Spin } from 'antd';


import { useFetchEventDetail } from '../../../hooks/useEvent';
import { useFetchVenues } from '../../../hooks/useVenue';
import AgendaList from '../../event_agenda/AgendaList';

import { formatDate, getUser } from '../../../helpers/utils';
import dayjs from 'dayjs'

const { RangePicker } = DatePicker;

const EventEdit = ({ eventId }) => {

  const [errorMsg, setErrorMessage] = useState('');
  const [infoMsg, setInfoMessage] = useState('');

  const navigate = useNavigate();
  const user = getUser();
  const [form] = Form.useForm();

  const onSetValueToForm = (event) => {
    const defaultValues = {
      title: event?.title || '',
      description: event?.description || '',
      dates: [
        event?.eventDate ? dayjs(event.eventDate) : null,
        event?.eventDate ? dayjs(event.eventDate) : null,
      ],
      venue_id: event?.venue_id?.id || '',
    };
    form.setFieldsValue(defaultValues);

  };
  const onFinish = async (antData) => {
    // Handle form submission logic here
  };
  
  const { venues } = useFetchVenues();
  const { isLoading } = useFetchEventDetail(eventId, onSetValueToForm);




  return (
    <div className="flex justify-between flex-wrap">
      {/* Event Form */}
      <div className="lg:h-screen w-full lg:w-1/2 px-10">
        <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
          {/* Form Fields */}

          <Form.Item name="title" label="Event Title" rules={[{ required: true }]}>
            <Input className="h-[40px]" />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="dates" label="Dates" rules={[{ required: true }]}>
            <RangePicker showTime className="h-[40px]" />
          </Form.Item>

          <Form.Item name="venue_id" label="Venue" rules={[{ required: true }]}>
            <Select
              options={venues.map((venue) => ({ label: venue.name, value: venue.name }))}
              showSearch
              className="w-full h-[40px]"
              placeholder="Select a venue"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[120px] text-center h-[40px]"
              disabled={isLoading}
            >
              {isLoading ? <Spin indicator={<LoadingOutlined spin />} /> : 'Update'}
            </Button>
          </Form.Item>
          
        </Form>
      </div>

      {/* Agenda Section */}

      <div className="w-full lg:w-1/2 px-10">
        <h2 className="mb-4 text-lg">Event Agenda</h2>
        <AgendaList eventId={eventId} />
      </div>
    </div>
  );
};

export default EventEdit;
