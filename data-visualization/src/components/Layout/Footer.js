import styled from 'styled-components';

const Wrapper = styled.footer`
  padding: 1rem 0;
  text-align: center;
`;

function Footer() {
  return (
    <Wrapper>
      <p>2025 &copy; Hrithik P Gowda. All rights reserved.</p>
    </Wrapper>
  );
}

export default Footer;
