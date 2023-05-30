import { styled } from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { ReactComponent as Search } from '../../../../assets/search.svg';
import { generateQueryString } from '../../../../utils/utils';
import { MainPageContext } from '../../../../context/MainPage/MainPageContext';

// TODO(덴): api 객체 형태에 맞게 상태 수정 작업 진행 했으나 리팩 필요해보임.
const changeAssigneeIdToName = (allUsers, filterOptions) => {
  const currentFilterOptions = { ...filterOptions };
  allUsers.forEach((userInfo) => {
    if (userInfo.id === filterOptions.assignee) {
      currentFilterOptions.assignee = userInfo.nickname;
    }
  });
  return currentFilterOptions;
};

const getModifiedQueryString = (queryString) => {
  const queryStringParts = queryString.replaceAll('=', ':').split('&');
  const firstPart = queryStringParts[0];

  let modifiedFirstPart = firstPart;
  if (firstPart.endsWith('true')) {
    modifiedFirstPart = 'is:open';
  } else if (firstPart.endsWith('false')) {
    modifiedFirstPart = 'is:closed';
  }

  queryStringParts[0] = modifiedFirstPart;
  return queryStringParts.join(' ');
};

const FilterInput = () => {
  const { allUsers, filterOptions } = useContext(MainPageContext);
  const [inputValue, setInputValue] = useState('');

  // ?: useEffect를 제대로 사용한건지?
  useEffect(() => {
    const modifiedFilterOptions = changeAssigneeIdToName(
      allUsers,
      filterOptions,
    );
    const queryString = generateQueryString(modifiedFilterOptions);
    const modifiedQueryString = getModifiedQueryString(queryString);
    setInputValue(modifiedQueryString);
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
