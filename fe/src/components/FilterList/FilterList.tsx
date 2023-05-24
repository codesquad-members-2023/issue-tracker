import React, { useEffect, useRef, useState } from 'react';

import FilterItem, { FilterItemRaw } from '@common/FilterItem/FilterItem';

interface Props {
  title: string;
  items: FilterItemRaw[];
  isOpen: boolean;
}

const FilterList: React.FC<Props> = ({ title, items, isOpen }) => {
  // const ref = useRef<HTMLDivElement>(null);
  // const [isOpened, setIsOpened] = useState(isOpen);
  const [checkedItem, setCheckedItem] = useState(0);

  const onItemClick = (id: number) => {
    setCheckedItem(id);
    // toggleOpen();
    // TODO(Lily): id 또는 item title을 위로 보내서 어떤 필터를 적용시킬지 알아야 된다.
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: { target: any }) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setIsOpened(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // const toggleOpen = () => {
  //   setIsOpened(!isOpened);
  // };

  return (
    <>
      {isOpen && (
        <div
          // ref={ref}
          className="absolute top-12 z-10 flex w-60 flex-col items-center rounded-lg border"
        >
          <div className="w-full rounded-t-lg bg-gray-100 py-2 pl-4 text-left text-sm">
            {title} 필터
          </div>
          <div className="w-full rounded-b-lg bg-white">
            {/* TODO(Lily): 담당자, 레이블, 마일스톤 없는 이슈 추가 */}
            {items.map(item => {
              const { id, name, imgUrl, backgroundColor } = item;
              const isChecked = id === checkedItem ? true : false;

              return (
                <button
                  key={id}
                  className="flex w-full items-center justify-between border-t text-gray-700"
                  onClick={() => onItemClick(id)}
                >
                  <FilterItem
                    id={id}
                    name={name}
                    isChecked={isChecked}
                    imgUrl={imgUrl}
                    width={20}
                    height={20}
                    backgroundColor={backgroundColor}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterList;
