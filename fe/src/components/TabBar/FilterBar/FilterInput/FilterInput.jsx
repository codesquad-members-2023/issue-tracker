import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as Search } from '../../../../assets/search.svg';
import { ALL, CLOSED, OPENED } from '../../../../constants';

// TODO: 모든 필터옵션에 대해 하도록 추후 수정
const helper = ({ state }) => {
  if (state === ALL) return '';
  if (state === OPENED) return 'is:open';
  if (state === CLOSED) return 'is:close';
  return '';
};

const FilterInput = ({ filterOptions }) => {
  const [inputValue, setInputValue] = useState(helper(filterOptions));

  // ?: useEffect를 제대로 사용한건지?
  useEffect(() => {
    setInputValue(helper(filterOptions));
  }, [filterOptions]);

  return (
    <FilterInputBox>
      <SearchImage />
      <input
        placeholder="Search all issues"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </FilterInputBox>
  );
};

export default FilterInput;

const SearchImage = styled(Search)`
  stroke: ${({ theme }) => theme.color.neutralTextWeak};
`;

const FilterInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;

  background: ${({ theme }) => theme.color.neutralBackgroundBold};
  border-radius: 0px 11px 11px 0px;
  padding: 6px 24px;

  input {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    width: 400px;
    border: none;
    font-size: ${({ theme }) => theme.fontSize.M.size};
    line-height: ${({ theme }) => theme.fontSize.M.lineHeight};
  }
`;
