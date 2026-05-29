import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChartOutlined,
  HomeOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography } from "antd";

import { useAuth } from "../../features/auth/use_auth";
import styles from "./AppLayout.module.css";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout className={styles.layout}>
      <Sider breakpoint="lg" collapsedWidth="0" className={styles.sider}>
        <div className={styles.logo}>
          <Title level={4} className={styles.logoTitle}>
            Habit Insight
          </Title>
          <Text className={styles.logoSubtitle}>Analytics Tracker</Text>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "/habits",
              icon: <UnorderedListOutlined />,
              label: <Link to="/habits">Habits</Link>,
            },
            {
              key: "/analytics",
              icon: <BarChartOutlined />,
              label: <Link to="/analytics">Analytics</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className={styles.header}>
          <div>
            <Text type="secondary">Signed in as</Text>
            <Text strong className={styles.userName}>
              {user?.name}
            </Text>
          </div>

          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Header>

        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
