import { css, styled } from 'styled-components';

export const UserIcon = ({ imgSrc, large }) => {
  return <UserIconImg src={imgSrc} $large={large} alt="user icon" />;
};

const UserIconImg = styled.img`
  ${({ $large }) => {
    return $large
      ? css`
          width: 32px;
          height: 32px;
        `
      : css`
          width: 20px;
          height: 20px;
        `;
  }}

  border-radius: 50%
`;
