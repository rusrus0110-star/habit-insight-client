import { Card, Col, Row, Typography } from "antd";

const { Title, Paragraph } = Typography;

export const DashboardPage = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Paragraph type="secondary">
        Overview of habits, completions, streaks and mood statistics.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <Card title="Total habits">Coming soon</Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card title="Total completions">Coming soon</Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card title="Best streak">Coming soon</Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card title="Average mood">Coming soon</Card>
        </Col>
      </Row>
    </div>
  );
};
