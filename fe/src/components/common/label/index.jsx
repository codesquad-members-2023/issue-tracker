import { LabelBox, ContentLayoutStyle } from './style';

const Label = ({ title, bgColor, icon, border }) => {
  return (
    <LabelBox bgColor={bgColor} border={border}>
      <ContentLayoutStyle>
        <img src={icon} />
        <span>{title}</span>
      </ContentLayoutStyle>
    </LabelBox>
  );
};

export default Label;
