import styled from 'styled-components';

import Layout from '../src/components/Layout/Layout';
import Card from '../src/components/Card/Card';
import { CardsWrapper } from '../src/components/Card/Card';

const Wrapper = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem 5rem;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  .emoji {
    display: inline-block;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  font-weight: 300;
  color: #f0f0f0;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #e0e0e0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

function Home() {
  const cards = [
    {
      icon: '🏭',
      title: 'Production Control Center',
      description: 'Live Steel Production Tracking',
      link: '/real-time-dashboard',
      stats: [
        { value: '5.1K', label: 'Daily Tons' },
        { value: '94.8%', label: 'Efficiency' }
      ]
    },
    {
      icon: '⚡',
      title: 'Efficiency Analytics',
      description: 'Performance & Energy Optimization',
      link: '/real-time-dashboard?view=efficiency',
      stats: [
        { value: '892MW', label: 'Power Usage' },
        { value: '97.2%', label: 'Uptime' }
      ]
    },
    {
      icon: '🎯',
      title: 'Quality Assurance',
      description: 'Material Quality & Standards',
      link: '/real-time-dashboard?view=quality',
      stats: [
        { value: '99.2%', label: 'Quality Score' },
        { value: '0.03%', label: 'Defect Rate' }
      ]
    },
    {
      icon: '🌱',
      title: 'Environmental Monitor',
      description: 'Emissions & Sustainability Metrics',
      link: '/real-time-dashboard?view=environmental',
      stats: [
        { value: '2.1t', label: 'CO₂/ton' },
        { value: '15%', label: 'Reduction' }
      ]
    },
    {
      icon: '🔧',
      title: 'Equipment Performance',
      description: 'Machinery Health & Maintenance',
      link: '/real-time-dashboard?view=equipment',
      stats: [
        { value: '8/24', label: 'Active Lines' },
        { value: '96.5%', label: 'Health Score' }
      ]
    },
    {
      icon: '📈',
      title: 'Production Trends',
      description: 'Analytics & Forecasting',
      link: '/real-time-dashboard?view=trends',
      stats: [
        { value: '+12%', label: 'Growth' },
        { value: '4.2K', label: 'Forecast' }
      ]
    },
    {
      icon: '💰',
      title: 'Cost Analysis',
      description: 'Financial Performance & ROI',
      link: '/real-time-dashboard?view=costs',
      stats: [
        { value: '$2.4M', label: 'Daily Revenue' },
        { value: '23%', label: 'Profit Margin' }
      ]
    },
    {
      icon: '📊',
      title: 'Executive Summary',
      description: 'KPI Dashboard & Reports',
      link: '/real-time-dashboard?view=summary',
      stats: [
        { value: '98.1%', label: 'Overall Score' },
        { value: '12', label: 'Active KPIs' }
      ]
    },
  ];

  return (
    <Layout headTitle="Steel Production Analytics">
      <Wrapper>
        <HeroSection>
          <Title>
            <span className="emoji">🏭</span> Steel Production Analytics
          </Title>
          <Subtitle>
            Advanced real-time monitoring and analytics platform for steel manufacturing. 
            Monitor production efficiency, quality metrics, and operational performance with cutting-edge data visualization.
          </Subtitle>
        </HeroSection>

        <StatsSection>
          <StatCard>
            <StatNumber>5.1K</StatNumber>
            <StatLabel>Daily Production (tons)</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>94.8%</StatNumber>
            <StatLabel>Overall Efficiency</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>99.2%</StatNumber>
            <StatLabel>Quality Score</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>2.1</StatNumber>
            <StatLabel>CO₂ Emissions (t/t)</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>8/24</StatNumber>
            <StatLabel>Active Production Lines</StatLabel>
          </StatCard>
        </StatsSection>

        <SectionTitle>🚀 Dashboard Analytics</SectionTitle>
        <CardsWrapper>
          {cards.map((card, i) => (
            <Card
              icon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
              stats={card.stats}
              key={i}
            />
          ))}
        </CardsWrapper>
      </Wrapper>
    </Layout>
  );
}

export default Home;
