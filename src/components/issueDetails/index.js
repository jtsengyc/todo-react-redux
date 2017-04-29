import React, { PropTypes } from 'react';
import moment from 'moment';
import $ from 'jquery';
import {Avatar, IssueLabels} from '../';

function IssueDetails({issueObj, commentArr}) {
  return (
    <div className='issue-details'>
      <div className='issue-header'>
        <div className='issue-title-bar'>
          <div className='issue-number'>Issue Number: {issueObj.number}</div>
          <div className='issue-title-holder'>
            <h2>{issueObj.title}</h2>
            <span className='issue-state'>Status: {issueObj.state}</span>
          </div>
          <IssueLabels issueLabelArr={issueObj.labels} />
        </div>
        <Avatar userObj={issueObj.user} />
      </div>
      <div className='issue-details-body'>
        <h3 className='issue-details-body-header'>Issue Details:</h3>
        <div
          className='issue-details-body-content'
          dangerouslySetInnerHTML={{__html: parseBodyToHtml(issueObj.body)}}>
        </div>
      </div>
      {commentArr.length ? (
        <div className='issue-comments'>
          <h3 className='issue-comments-header'>Comments:</h3>
          <div className='issue-comments-body'>
            {commentArr.map((comment, idx) => (
              <div key={idx} className='issue-comment'>
                <Avatar userObj={comment.user} />
                <span className='issue-comment-date'>
                  {moment(comment.updated_at).local().format('MMM D, YYYY - h:mm a')}
                </span>
                <div
                  className='issue-comment-body'
                  dangerouslySetInnerHTML={{__html: parseBodyToHtml(comment.body)}}>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : ''}
    </div>
  );
}

function parseBodyToHtml(body) {
  let htmlResult = body.split(/\r\n|\r|\n/g);
  let outputHtml = [];
  let codeOpenTagUsed = false;
  for (let i = 0; i < htmlResult.length; i++) {
    if (htmlResult[i].indexOf('###') === 0) { // handle title
      outputHtml.push(`<b>${htmlResult[i].slice(4)}</b>`);
    } else if (htmlResult[i].indexOf('```') === 0) { // handle code block
      if (codeOpenTagUsed) {
        outputHtml.push('</code>');
      } else {
        outputHtml.push('<code>');
      }
      codeOpenTagUsed = !codeOpenTagUsed;
    } else if (htmlResult[i].indexOf('@') !== -1 && !codeOpenTagUsed) { // handle github handler
      outputHtml.push(htmlResult[i].replace(/@([\-\w]+)/g, '<a target=\'_blank\' href=\'//github.com/$1\'>@$1</a>'));
    } else {
      outputHtml.push($('<div/>').text(htmlResult[i]).html());
    }
  }

  return outputHtml.join('<br />');
}

IssueDetails.propTypes = {
  issueObj: PropTypes.object.isRequired,
  commentArr: PropTypes.array.isRequired
};

export default IssueDetails;
