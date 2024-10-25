import styled from 'styled-components';
import { useEffect, useState } from 'react';

const HeaderContainer = styled.header`
    background: aquamarine;
    width: 100%;
    height: 120px;
    top: 0;
`;

const HeaderContent = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    background: antiquewhite;
`;

const HeaderNav = styled.ul`
    height: 40px;
    background: brown;
    display: flex;
    flex-wrap: wrap;

    li {
        width: 80px;
        background: darksalmon;
    }
`;

const HeaderLogo = styled.div`
    height: 80px;
    background: darkblue;
    color: white;
`;

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) setUsername(name);
  }, [username]);
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderNav>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
        </HeaderNav>
        <HeaderLogo>
          {username}
        </HeaderLogo>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;