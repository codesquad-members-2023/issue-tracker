import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@components/common/layout/PageLayout';
import DetailHeader from '@components/issueDetail/detailHeader';
import DetailContent from '@components/issueDetail/detailContent';
import apiUrl from '@utils/api/api';
import getTimeElapsed from '@utils/api/timeElapsed';

const IssueDetail = () => {
  const [detailContent, setDetailContent] = useState(null);
  const { id } = useParams();

  const fetchDetailContent = async () => {
    const response = await fetch(`${apiUrl}/issues/${id}`);
    const detailData = await response.json();
    setDetailContent(detailData);
  };

  useEffect(() => {
    fetchDetailContent();
  }, []);
  return (
    <PageLayout>
      {detailContent && (
        <React.Fragment>
          <DetailHeader
            id={detailContent.id}
            issueTitle={detailContent.title}
            dateTime={getTimeElapsed(detailContent.createDateTime)}
            writer={detailContent.writer.name}
            state={detailContent.status}
          />
          <DetailContent
            description={detailContent.description}
            imgUrl={detailContent.writer.imgUrl}
            name={detailContent.writer.name}
            dateTime={getTimeElapsed(detailContent.createDateTime)}
          />
        </React.Fragment>
      )}
    </PageLayout>
  );
};

export default IssueDetail;
