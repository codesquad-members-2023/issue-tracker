import { useState } from 'react';
import {
  ControlButtonBox,
  IssueNumberBox,
  IssueTitleBox,
  IssueInfoBox,
  LayoutStyle,
  Line,
} from './style';
import Button from '@components/common/button';
import EditIcon from '@assets/icons/EditIcon.svg';
import DirectoryIcon from '@assets/icons/DirectoryIcon.svg';
import Label from '@components/common/label';
import InputText from '@components/common/inputText';

const DetailHeader = ({ id, issueTitle, dateTime, writer, state }) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(issueTitle);
  const handleClick = () => {
    setEdit((prevState) => !prevState);
  };

  const handleUpload = () => {
    setInput(e.target.value);
  };

  const labelTitle = state ? '열린 이슈' : '닫힌 이슈';
  const labelBgColor = state ? 'blue' : 'navy';

  return (
    <>
      <LayoutStyle>
        {!isEdit ? (
          <>
            <IssueTitleBox>
              <span>{title}</span>
              <IssueNumberBox>#{id}</IssueNumberBox>
            </IssueTitleBox>
            <ControlButtonBox>
              <Button
                type="outline"
                size="medium"
                icon={EditIcon}
                title="제목 편집"
                onClick={handleClick}
              />
              <Button type="outline" size="medium" icon={DirectoryIcon} title="이슈 닫기" />
            </ControlButtonBox>
          </>
        ) : (
          <>
            <InputText title={title} setTitle={setTitle} />
            <ControlButtonBox>
              <Button
                type="outline"
                size="medium"
                icon={EditIcon}
                title="편집 취소"
                onClick={handleClick}
              />
              <Button
                type="container"
                size="medium"
                icon={EditIcon}
                title="편집 완료"
                onClick={handleClick}
              />
            </ControlButtonBox>
          </>
        )}
      </LayoutStyle>

      <IssueInfoBox>
        <Label title={labelTitle} bgColor={labelBgColor} />
        <span>
          이 이슈가 {dateTime}에 {writer}님에 의해 열렸습니다.
        </span>
      </IssueInfoBox>
      <Line />
    </>
  );
};

export default DetailHeader;
