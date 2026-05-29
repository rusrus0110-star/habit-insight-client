import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Typography } from "antd";

import { useAuth } from "../../features/auth/use_auth";
import type { LoginPayload } from "../../features/auth/auth_types";

const { Title, Paragraph } = Typography;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: LoginPayload) => {
    setIsSubmitting(true);

    try {
      await login(values);
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Title level={2}>Login</Title>
        <Paragraph type="secondary">
          Sign in to manage your habits and analytics.
        </Paragraph>

        <Form<LoginPayload>
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email.",
              },
              {
                type: "email",
                message: "Please enter a valid email.",
              },
            ]}
          >
            <Input placeholder="ruslan@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password.",
              },
            ]}
          >
            <Input.Password placeholder="Your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            Login
          </Button>
        </Form>

        <Paragraph className="auth-switch">
          No account yet? <Link to="/register">Create account</Link>
        </Paragraph>
      </Card>
    </div>
  );
};
