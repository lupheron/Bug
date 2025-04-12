import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import css from "../../../assets/css/index.module.css";
import { useAuth } from '../AuthStore';
import { useForm } from 'antd/es/form/Form';

function Register() {
    const { handleRegister } = useAuth();
    const [members, setMembers] = useState([{ key: 0 }, { key: 1 }]);
    const [form] = useForm();

    const handleAddMember = () => {
        setMembers([...members, { key: members.length }]);
    };

    const handleRemoveMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    return (
        <div className={css.register_container}>
            <Form
                className={css.auth_form}
                layout="vertical"
                onFinish={(values) => {
                    handleRegister(values);
                    form.resetFields();
                    setMembers([{ key: 0 }, { key: 1 }]);
                }}
                form={form}
            >
                <h1>Family Registration</h1>

                <Form.Item
                    label="Primary User's Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                {members.map((member, index) => (
                    <Form.Item
                        key={member.key}
                        label={`Family Member ${index + 1}`}
                        name={`member_${index}`}
                        rules={[{ required: true, message: 'Please enter the member name!' }]}
                    >
                        <Input
                            placeholder={`Enter name of family member ${index + 1}`}
                            addonAfter={
                                <Button
                                    type="text"
                                    danger
                                    onClick={() => handleRemoveMember(index)}
                                >
                                    Remove
                                </Button>
                            }
                        />
                    </Form.Item>
                ))}

                <Button type="dashed" onClick={handleAddMember} block>
                    <PlusCircleOutlined style={{ color: "blue" }} /> Add Member
                </Button>

                <Form.Item style={{ marginTop: '20px' }}>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;
