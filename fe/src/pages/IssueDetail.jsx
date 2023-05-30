import { styled } from 'styled-components';
import CommentList from '../components/CommentList/CommentList';
import SideBar from '../components/SideBar/SideBar';
import { Button } from '../components/common';

const IssueDetail = () => {
  return (
    <>
      <HeaderButtonsBox>
        <HeaderBox>
          <IssueDetailHeader>
            FE 이슈트래커 디자인 시스템 구현
          </IssueDetailHeader>
          <IssueNumberSpan>#2</IssueNumberSpan>
        </HeaderBox>
        <ButtonsBox>
          <Button
            type="outlineButton"
            size="S"
            gap="4px"
            color="accentBorderWeak"
          >
            제목 편집
          </Button>
          <button type="button">이슈 닫기</button>
        </ButtonsBox>
      </HeaderButtonsBox>
      <IssueInfoBox>
        <button type="button">열린 이슈</button>
        <IssueInfoSpan>
          이 이슈가 3분 전에 sam님에 의해 열렸습니다
        </IssueInfoSpan>
        <IssueInfoSpan>코멘트 2개</IssueInfoSpan>
      </IssueInfoBox>
      <SectionBox>
        <IssueDetailCommentList />
        <SideBar />
      </SectionBox>
    </>
  );
};

export default IssueDetail;

const HeaderButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderBox = styled.div`
  display: flex;
  gap: 8px;

  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.XXL.size};
  line-height: ${({ theme }) => theme.fontSize.XXL.lineHeight};
`;

const IssueDetailHeader = styled.h1`
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const IssueNumberSpan = styled.span`
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const ButtonsBox = styled.div`
  display: flex;
  gap: 8px;
`;

const IssueInfoBox = styled.div`
  display: flex;
  gap: 8px;
`;

const IssueInfoSpan = styled.span`
  color: ${({ theme }) => theme.color.neutralTextWeak};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  font-weight: 400;
`;

const SectionBox = styled.section`
  display: flex;
  gap: 34px;

  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.color.neutralBorder};
`;

const IssueDetailCommentList = styled(CommentList)`
  flex-grow: 3;
`;
