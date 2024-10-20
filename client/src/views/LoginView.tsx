import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import LoginForm, { LoginFormData } from "../components/LoginForm/LoginForm";
import { BASE_URL } from "../services/api";



const LoginView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    const authRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/auth`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (response.status !== 200) {
          const responseData = await response.json();
          throw Error(responseData.message);
        }
        message.success("Пользователь успешно вошел!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (e) {
        if (e instanceof Error) {
          message.error(e.message);
        }
      } finally {
        setLoading(false);
      }
    };
    authRequest();
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
};

export default LoginView;
