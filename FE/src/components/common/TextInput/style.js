import styled, { css } from 'styled-components';

const inputFont = css`
  color: ${({ isfocused, hasvalue, theme }) => {
    return theme.colors.neutral.text[hasvalue || isfocused ? 'strong' : 'weak'];
  }};
  font-size: ${({ theme }) => theme.fontSize.M.fontSize};
  line-height: ${({ theme }) => theme.fontSize.M.lineHeight};
  font-weight: 400;
`;

const defaultLabelFont = css`
  color: ${({ theme }) => theme.colors.neutral.text.default};
  font-size: ${({ theme }) => theme.fontSize.S.fontSize};
  line-height: ${({ theme }) => theme.fontSize.S.lineHeight};
  font-weight: 400;
`;

const labelFontTransition = css`
  color: ${({ theme }) => theme.colors.neutral.text.weak};
  font-size: ${({ hasvalue, isfocused, theme }) => {
    return theme.fontSize[hasvalue || isfocused ? 'S' : 'M'].fontSize;
  }};
  line-height: ${({ hasvalue, isfocused, theme }) => {
    return theme.fontSize[hasvalue || isfocused ? 'S' : 'M'].lineHeight;
  }};
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  transform: translateY(${({ hasvalue, isfocused }) => (hasvalue || isfocused ? '0' : '50%')});
  transition: transform 200ms;
`;

const $Label = styled.label`
  min-width: ${({ styletype }) => (styletype === 'both' ? 'fit-content' : '100%')};
  padding-right: 13px;
  ${({ styletype }) => (styletype === 'onlyLabel' ? labelFontTransition : defaultLabelFont)}
`;

const $Input = styled.input`
  width: 100%;

  ${inputFont}
`;

const onlyLabelText = css`
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 56px;
`;

const onlyPlaceholderText = css`
  flex-direction: row;
  align-items: center;

  height: 40px;
`;

const bothLabelTextAndPlaceholderText = css`
  flex-direction: row;
  align-items: center;

  height: 40px;
`;

const $TextInput = styled.div`
  display: flex;

  ${({ styletype }) => {
    if (styletype === 'both') return bothLabelTextAndPlaceholderText;
    if (styletype === 'onlyLabel') return onlyLabelText;
    if (styletype === 'onlyPlaceholder') return onlyPlaceholderText;
    return '';
  }}

  width: 100%;

  padding: 0 24px;
  border: 1px solid
    ${({ isfocused, theme }) => (isfocused ? theme.colors.neutral.border.active : 'transparent')};
  border-radius: 14px;
  background-color: ${({ isfocused, theme }) => {
    return theme.colors.neutral.background[isfocused ? 'strong' : 'bold'];
  }};

  opacity: ${({ disabled }) => (disabled ? 0.32 : 1)};
`;

export { $TextInput, $Label, $Input };
