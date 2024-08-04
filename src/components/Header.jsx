import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  height: 75vh;
`;

const Navigation = styled.nav`
  position: absolute;
  top: 20px;
`;

const StyledNavLink = styled(NavLink)`
  position: relative;
  text-transform: uppercase;
  margin: 30px 10px;
  padding: 10px 20px;
  text-decoration: none;
  color: #242222;
  font-size: 18px;
  font-weight: 600;
  transition: 0.5s;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-top: 2px solid #242222;
    border-bottom: 2px solid #242222;
    transform: scaleY(2);
    opacity: 0;
    transition: 0.3s;
  }

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #242222;
    transform: scale(0);
    opacity: 0;
    transition: 0.3s;
    z-index: -1;
  }

  &:hover {
    color: #fff;

    &:before {
      transform: scaleY(1);
      opacity: 1;
    }

    &:after {
      transform: scaleY(1);
      opacity: 1;
    }
  }
`;

const Title = styled.h1`
  color: #242222;
  font-size: calc(30px + 3vw);
  width: 65%;
  padding: 200px 0 200px 0;
  text-align: center;
  background: url('/butterflies.svg') right center no-repeat;
  background-size: 40%;

  @media (max-width: 900px) {
    width: 75%;
    font-size: 40px;
  }
`;

function Header() {
    return (
        <HeaderContainer>
            <Navigation>
                <StyledNavLink to={`/`}>
                    About me
                </StyledNavLink>
                <StyledNavLink to={`/projects`}>
                    Projects
                </StyledNavLink>
            </Navigation>
            <Title>Emmalee Gomez</Title>
        </HeaderContainer>
    );
}

export default Header;
