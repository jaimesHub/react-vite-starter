import { Button, Divider, Form, Input, App } from 'antd';
import type { FormProps } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { registerAPI } from '@/services/api';

type FieldType = {
    fullName: string;
    email: string;
    password: string;
    phone: string;
};

const RegisterPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const { message } = App.useApp();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { email, fullName, password, phone } = values;

        const res = await registerAPI(fullName, email, password, phone);
        if (res.data) {
            //success
            message.success("User registration successful!");
            navigate("/login");
        } else {
            //error
            // message.error(res.message);
            message.error("Error while register!");
        }
        setIsSubmit(false);
    };

    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Register Account</h2>
                            <Divider />
                        </div>
                        <Form
                            name="form-register"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Full name"
                                name="fullName"
                                rules={[{ required: true, message: 'Name cannot be left blank!' }]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Email cannot be empty!' },
                                    { type: "email", message: "Email is not in correct format!" }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Password cannot be blank!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Phone number"
                                name="phone"
                                rules={[{ required: true, message: 'Phone number cannot be blank!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Create account
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal" style={{ textAlign: "center" }}>
                                Already have an account?
                                <span>
                                    <Link to='/login' > Login </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default RegisterPage;