import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import sun from '../../../assets/sun.svg';
import moon from '../../../assets/moon.svg';

const Toggle = () => {
  const { id, setTheme } = useContext(ThemeContext);
  // TODO: props theme에 따라 경로 분기 처리
  const imgSrc = id === 'lightTheme' ? sun : moon;

  return <ToggleIconImg onClick={setTheme} src={imgSrc} alt="toggleIcon" />;
};

export default Toggle;

const ToggleIconImg = styled.img`
  width: 32px;
  height: 32px;
`;
