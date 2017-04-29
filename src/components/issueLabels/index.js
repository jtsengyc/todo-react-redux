import React, { PropTypes } from 'react';

function IssueLabels({issueLabelArr}) {
  return (
    <span className='issue-labels'>
      {issueLabelArr.map((labelObj, idx) => (
        <span key={idx} className='issue-label'>{labelObj.name}</span>
      ))}
    </span>
  );
}

IssueLabels.propTypes = {
  issueLabelArr: PropTypes.array.isRequired
};

export default IssueLabels;
