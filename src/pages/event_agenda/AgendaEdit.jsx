import React, { useState } from "react";
import { Form, Modal, Input, DatePicker, Row, Col, InputNumber, message } from "antd";
import { EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

import { useUpateAgenda } from "../../hooks/useAgenda";

const AgendaEdit = ({ agenda , handelFetchAgendas}) => {

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { handleUpateAgenda, isLoading } = useUpateAgenda(async () => {
        await handelFetchAgendas();
        setIsModalVisible(false);
    });

    const onSetValueToForm = () => {

        console.log(agenda);

        const defaultValue = {
            title: agenda.title,
            agendaNo: agenda.agendaNo,
            agendaDate: dayjs(agenda.agendaDate),
            agendaDuration: agenda.agendaDuration,
            description: agenda.description,
            eventId: agenda.eventId
        }
        form.setFieldsValue(defaultValue);
    };

    const showModal = () => {
        onSetValueToForm();
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        handleUpateAgenda({ ...values, id: agenda.id, eventId : Number(agenda.eventId) });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="flex flex-col items-end gap-6">

            <EditOutlined
                className="text-xl cursor-pointer"
                onClick={showModal}
            />

            <Modal
                title="Update Agenda"
                open={isModalVisible}

                onCancel={handleCancel}
                cancelButtonProps={{ className: "bg-gray-300 hover:bg-gray-400" }}

                onOk={() => form.submit()}
                okText="Update"
                okButtonProps={{ className: "bg-blue-600 hover:bg-blue-700" }}

                width={800}
                confirmLoading={isLoading}
            >

                <div >
                    <Form form={form} layout="vertical"
                        onFinish={handleOk}


                    >

                        <Form.Item name="title" label="Agenda Title" rules={[{ required: true }]}>
                            <Input className="h-[40px]" />
                        </Form.Item>

                        <Row gutter={16}>

                            <Col span={8}>
                                <Form.Item name="agendaNo" label="Agenda No" rules={[{ required: true }]}>
                                    <InputNumber className="w-full h-[40px]" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="agendaDate" label="Select Date Time" rules={[{ required: true }]}>
                                    <DatePicker showTime className="w-full h-[40px]" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="agendaDuration" label="Duration" rules={[{ required: true }]}>
                                    <Input className="w-full h-[40px]" />
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

export default AgendaEdit;
