import { App, Button, Divider, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';
import type { FormProps } from 'antd';
import { loginAPI } from '@/services/api';

type FieldType = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { message, notification } = App.useApp();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await loginAPI(username, password);
        setIsSubmit(false);
        if (res?.data) {
            localStorage.setItem('access_token', res.data.access_token);
            message.success('Account login successful!');
            navigate('/');
        } else {
            notification.error({
                message: "An error occurred.",
                // description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                description: "Error while login!",
                duration: 5
            });
        }
    };
    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Login</h2>
                            <Divider />
                        </div>
                        <Form
                            name="login-form"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="username" // using username instead of email
                                rules={[
                                    { required: true, message: "Email cannot be empty!" },
                                    { type: "email", message: "Email is not in correct format!" }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Password cannot be blank!" }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Sign In
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal" style={{ textAlign: "center" }}>
                                Don't have an account?
                                <span>
                                    <Link to='/register' > Register </Link>
                                </span>
                            </p>
                            <br />
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
}
export default LoginPage;