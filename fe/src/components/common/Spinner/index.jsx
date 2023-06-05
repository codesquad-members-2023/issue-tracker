import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerCircle = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 50px;
  height: 50px;
  border: 3px solid #0099ff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const Spinner = () => (
  <SpinnerContainer>
    <SpinnerCircle />
  </SpinnerContainer>
);
