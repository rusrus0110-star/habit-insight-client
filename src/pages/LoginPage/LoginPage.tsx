import { useState } from "react";
import { Button, Card, Divider, Form, Input, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/use_auth";
import type { LoginPayload } from "../../features/auth/auth_types";
import styles from "./LoginPage.module.css";

const { Title, Paragraph, Text } = Typography;

const DEMO_CREDENTIALS: LoginPayload = {
  email: "demo@habitinsight.dev",
  password: "Demo123456",
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm<LoginPayload>();

  const handleSubmit = async (values: LoginPayload) => {
    setIsSubmitting(true);

    try {
      await login(values);
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);

    try {
      form.setFieldsValue(DEMO_CREDENTIALS);
      await login(DEMO_CREDENTIALS);
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Text className={styles.badge}>Habit Insight</Text>

          <Title className={styles.title}>
            Track habits, streaks, mood and long-term consistency.
          </Title>

          <Paragraph className={styles.description}>
            A full-stack habit analytics app with authentication, protected
            routes, MongoDB data, progress history and dashboard insights.
          </Paragraph>

          <div className={styles.featureList}>
            <Text>JWT authentication</Text>
            <Text>MongoDB progress tracking</Text>
            <Text>Dashboard and analytics</Text>
            <Text>30-day habit history chart</Text>
          </div>
        </div>
      </section>

      <aside className={styles.authPanel}>
        <Card className={styles.authCard}>
          <Space direction="vertical" size="large" className={styles.cardInner}>
            <div>
              <Title level={3} className={styles.cardTitle}>
                Demo access
              </Title>

              <Paragraph type="secondary" className={styles.cardText}>
                Use the demo account to explore the app with preloaded habit
                data.
              </Paragraph>
            </div>

            <Button
              type="primary"
              size="large"
              block
              loading={isSubmitting}
              onClick={handleDemoLogin}
            >
              Try demo account
            </Button>

            <div className={styles.demoCredentials}>
              <Text type="secondary">Demo credentials</Text>
              <Text code>demo@habitinsight.dev</Text>
              <Text code>Demo123456</Text>
            </div>

            <Divider plain>or login manually</Divider>

            <Form<LoginPayload>
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={DEMO_CREDENTIALS}
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
                <Input placeholder="demo@habitinsight.dev" />
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
                <Input.Password placeholder="Demo123456" />
              </Form.Item>

              <Button
                type="default"
                htmlType="submit"
                block
                loading={isSubmitting}
              >
                Login
              </Button>
            </Form>

            <Text type="secondary" className={styles.registerText}>
              Need your own account? <Link to="/register">Create account</Link>
            </Text>
          </Space>
        </Card>
      </aside>
    </div>
  );
};
