import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  margin: 1rem;
  min-height: 200px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const CardTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-align: center;
  margin-bottom: 1rem;
`;

const CardStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatItem = styled.div`
  text-align: center;
  
  .stat-value {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    display: block;
  }
  
  .stat-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }
`;

const Card = ({ icon, title, description, stats, onClick, bgUrl, chartType, link }) => {
  const handleClick = () => {
    if (link) {
      window.location.href = link;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      {icon && <CardIcon>{icon}</CardIcon>}
      {bgUrl && (
        <CardIcon>
          <img src={bgUrl} alt={title} style={{ width: '60px', height: '60px', opacity: 0.8 }} />
        </CardIcon>
      )}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{chartType || description}</CardDescription>
      {stats && (
        <CardStats>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </StatItem>
          ))}
        </CardStats>
      )}
    </CardContainer>
  );
};

// Wrapper for cards grid
export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  padding: 0 2rem;
`;

export default Card;
