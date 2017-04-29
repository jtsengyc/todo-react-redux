import React, { PropTypes } from 'react';
import {Avatar, IssueLabels} from '../';

function IssueRow({issueObj, handleDisplayIssue}) {
  return (
    <li className='issue-row' onClick={() => handleDisplayIssue(issueObj.number)}>
      <div className='issue-number'>{issueObj.number}</div>
      <div className='issue-title-bar'>
        <span className='issue-title-holder'>
          <span className='issue-title'>{issueObj.title}</span>
          <IssueLabels issueLabelArr={issueObj.labels} />
        </span>
        <Avatar userObj={issueObj.user} />
      </div>
      <div className='issue-summary'>{getSummary(issueObj.body)}</div>
    </li>
  );
}

function getSummary(str) {
  const shortStr = str.slice(0, 140);
  let reg = /\s/gi;
  let lastIdx = -1;
  while (reg.exec(shortStr)) {
    lastIdx = reg.lastIndex - 1;
  }
  return shortStr.slice(0, lastIdx);
}


IssueRow.propTypes = {
  issueObj: PropTypes.object.isRequired,
  handleDisplayIssue: PropTypes.func.isRequired
};

export default IssueRow;
