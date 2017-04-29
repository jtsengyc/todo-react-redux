import React, { PropTypes } from 'react';
import IssueRow from '../issueRow';

function IssueList({issueArr, handleDisplayIssue}) {
  return (
    <ul className='issue-list'>
      {issueArr.map((issue, idx) => (
        <IssueRow key={idx} issueObj={issue} handleDisplayIssue={handleDisplayIssue} />
      ))}
    </ul>
  );
}

IssueList.propTypes = {
  issueArr: PropTypes.array.isRequired,
  handleDisplayIssue: PropTypes.func.isRequired
};

export default IssueList;
