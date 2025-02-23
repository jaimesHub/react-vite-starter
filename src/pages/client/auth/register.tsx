import { Button, Divider, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';

type FieldType = {
    fullName: string;
    email: string;
    password: string;
    phone: string;
};

const RegisterPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log(values);
        setIsSubmit(true);
    };

    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Register</h2>
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
                                rules={[{ required: true, message: 'Fullname is required!' }]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Email is required!' },
                                    { type: "email", message: "Format is invalid!" }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Password is required!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }} //whole column
                                label="Phone number"
                                name="phone"
                                rules={[{ required: true, message: 'Phone number is required!' }]}
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
    );
};

export default RegisterPage;