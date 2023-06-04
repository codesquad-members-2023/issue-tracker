import styled from 'styled-components';

export const CommentBox = styled.div`
  width: 958px;
  height: 125px;
`;

export const CommentHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  width: 958px;
  height: 64px;
  border-radius: 16px 16px 0px 0px;
  border: solid 1px ${({ theme }) => theme.COLOR.GRAY300};
  border-bottom: none;
  background-color: ${({ theme }) => theme.COLOR.GRAY200};
`;

export const CommentBody = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  width: 958px;
  height: 60px;
  border-radius: 0px 0px 16px 16px;
  border: solid 1px ${({ theme }) => theme.COLOR.GRAY300};
  color: ${({ theme }) => theme.COLOR.GRAY700};
  background-color: ${({ theme }) => theme.COLOR.GRAY50};
`;

export const TimeStampBox = styled.span`
  color: ${({ theme }) => theme.COLOR.GRAY600};
`;

export const UserImageBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${({ userImage }) => userImage});
`;

export const DetailContentBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderInfoBox = styled.div`
  display: flex;
  gap: 8px;
`;
