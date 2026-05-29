import { Card, Col, Row, Typography } from "antd";

const { Title, Paragraph } = Typography;

export const AnalyticsPage = () => {
  return (
    <div>
      <Title level={2}>Analytics</Title>
      <Paragraph type="secondary">
        Productivity insights based on habits, completions and mood.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Longest streak">Coming soon</Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Best day">Coming soon</Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Best month">Coming soon</Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Mood correlation">Coming soon</Card>
        </Col>
      </Row>
    </div>
  );
};
