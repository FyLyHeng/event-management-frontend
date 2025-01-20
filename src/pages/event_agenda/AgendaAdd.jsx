import React, { useState } from "react";
import dayjs from "dayjs";
import { Form, Button, Modal, Input, InputNumber, DatePicker, Row, Col, Select } from "antd";

import { useCreateAgenda } from '../../hooks/useAgenda';

const AgendaAdd = ({ eventId, handelFetchAgendas }) => {

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { handleCreateAgenda, isLoading } = useCreateAgenda(async () => {
        await handelFetchAgendas();
        setIsModalVisible(false);
    });

    const onSetValueToForm = () => {
        console.log("init-form-var :" + eventId);
        const defaultValue = {
            title: "Agenda 1",
            agendaNo: 1,
            agendaDate: dayjs(),
            agendaDuration: "15",
            description: "pls input agenda detail!",
            eventId: eventId
        }
        form.setFieldsValue(defaultValue);
    };

    const showModal = () => {
        onSetValueToForm();
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        console.log(values);
        handleCreateAgenda({ ...values, eventId: Number(eventId) });

    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="flex flex-col items-end gap-6">
            <Button
                type="primary"
                onClick={showModal}
                className="w-[120px] text-center h-[45px] hover:bg-gray-950"
            >
                + Add agenda
            </Button>

            <Modal
                title="Add New Agenda"
                open={isModalVisible}

                onCancel={handleCancel}
                cancelButtonProps={{ className: "bg-gray-300 hover:bg-gray-400" }}

                onOk={() => form.submit()}
                okText="Add"
                okButtonProps={{ className: "bg-blue-600 hover:bg-blue-700" }}

                width={800}
                confirmLoading={isLoading}
            >

                <div >

                    <Form form={form} layout="vertical" onFinish={handleOk}>

                        <Form.Item name="title" label="Agenda Title" rules={[{ required: true }]}>
                            <Input className="h-[40px]" />
                        </Form.Item>

                        <Row gutter={16}>

                            <Col span={8}>
                                <Form.Item name="agendaNo" label="Agenda No" rules={[{ required: true }]}>
                                    <InputNumber min={1} max={20} defaultValue={1} className="w-full h-[40px]" />
                                </Form.Item>

                            </Col>
                            <Col span={8}>
                                <Form.Item name="agendaDate" label="Agenda Start Date" rules={[{ required: true }]}>
                                    <DatePicker showTime className="w-full h-[40px]" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="agendaDuration" label="Duration" rules={[{ required: true }]}>
                                    
                                    <InputNumber min={1} max={20} className="w-full h-[40px]"
                                        
                                        addonAfter={
                                            <Select defaultValue="Hour">
                                                <Option value="min">Min</Option>
                                                <Option value="hour">Hour</Option>
                                                <Option value="day">Day</Option>
                                            </Select>
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <Input.TextArea rows={4} />
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default AgendaAdd;
