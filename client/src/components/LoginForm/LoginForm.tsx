import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './LoginForm.module.css';


export type LoginFormData = {
  login: string;
  password: string;
};

type FormProps = {
  onSubmit: (data: LoginFormData) => void;
  loading: boolean;
};

const LoginForm: React.FC<FormProps> = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: LoginFormData) => {
      console.log('Submitted values:', values);
    onSubmit(values);
  };

  return (
    <Form form={form} name="login" layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Логин"
        name="login"
        rules={[
          { required: true, message: 'Пожалуйста, введите логин!' },
          { pattern: /^[a-z0-9]{6,20}$/, message: 'Логин должен содержать от 6 до 20 символов.' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
