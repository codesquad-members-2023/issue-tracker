import {
  CommentBody,
  CommentBox,
  CommentHeaderBox,
  TimeStampBox,
  UserImageBox,
  DetailContentBox,
  HeaderInfoBox,
} from './style';
import Label from '@components/common/label';
import TextArea from '@components/common/textArea';
import Header from '@components/header';
import Sidebar from '@components/issueForm/issueFormMainContent/mainContentSidebar/Sidebar';

const CommentHeader = ({ userImage, assignee, timeStamp }) => {
  return (
    <CommentHeaderBox>
      <HeaderInfoBox>
        <UserImageBox userImage={userImage} />
        <span>{assignee}</span>
        <TimeStampBox>{timeStamp}</TimeStampBox>
      </HeaderInfoBox>
      <Label title="작성자" bgColor="none" borderColor="gray" border="true" />
    </CommentHeaderBox>
  );
};

const DetailContent = ({ description, dateTime, name, imgUrl }) => {
  return (
    <DetailContentBox>
      <div>
        <CommentBox>
          <CommentHeader userImage={imgUrl} assignee={name} timeStamp={dateTime} />
          <CommentBody>{description}</CommentBody>
        </CommentBox>
        <TextArea />
      </div>
      <Sidebar />
    </DetailContentBox>
  );
};

export default DetailContent;
