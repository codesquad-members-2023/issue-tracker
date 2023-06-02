import React from 'react';

interface Props {
  issueCount: number;
  onPageClick: (page: number) => void;
}

const PageNation: React.FC<Props> = ({ issueCount, onPageClick }) => {
  const page = Math.ceil(issueCount / 10);

  return (
    <div className="mt-5 flex justify-center">
      {Array.from({ length: page }, (_, index) => {
        const pageNum = index + 1;
        return (
          <button
            className="mr-5 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100"
            key={index}
            onClick={() => onPageClick(pageNum)}
          >
            <span className="text-lg text-gray-600">{pageNum}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PageNation;
