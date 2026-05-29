import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Typography } from "antd";

import { useAuth } from "../../features/auth/use_auth";
import type { RegisterPayload } from "../../features/auth/auth_types";

const { Title, Paragraph } = Typography;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: RegisterPayload) => {
    setIsSubmitting(true);

    try {
      await register(values);
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Title level={2}>Create account</Title>
        <Paragraph type="secondary">
          Register to start tracking habits and progress.
        </Paragraph>

        <Form<RegisterPayload>
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name.",
              },
              {
                min: 2,
                message: "Name must be at least 2 characters.",
              },
            ]}
          >
            <Input placeholder="Ruslan" />
          </Form.Item>

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
              {
                min: 8,
                message: "Password must be at least 8 characters.",
              },
            ]}
          >
            <Input.Password placeholder="Minimum 8 characters" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            Create account
          </Button>
        </Form>

        <Paragraph className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </Paragraph>
      </Card>
    </div>
  );
};
