import $ from 'jquery';

const BASE_URL = 'https://api.github.com/repos/rails/rails';
export function getTotalIssueCount() {
  const url = BASE_URL;
  return new Promise((resolve, reject) => {
    $.get(url)
      .done(result => {
        // console.debug(result);
        if (result.open_issues_count) {
          resolve(result.open_issues_count);
        } else {
          resolve(0);
        }
      }).fail(result => {
        console.error('failed fetching repo data from github');
        reject(result);
      });
  });
}

export function getIssueList(pageNumber) {
  const url = BASE_URL + '/issues?per_page=25&page=' + pageNumber;
  return new Promise((resolve, reject) => {
    $.get(url)
      .done(result => {
        // console.debug(result);
        if (result) {
          resolve(result);
        } else {
          resolve([]);
        }
      }).fail(result => {
        console.error('failed fetching issue listing from github');
        reject(result);
      });
  });
}

export function getIssueDetails(issueId) {
  const url = BASE_URL + '/issues/' + issueId;
  // also need to get comments
  return new Promise((resolve, reject) => {
    $.get(url)
      .done(result => {
        // console.debug(result);
        if (result) {
          resolve(result);
        } else {
          resolve({});
        }
      }).fail(result => {
        console.error('failed fetching issue details from github');
        reject(result);
      });
  });
}

export function getIssueComments(issueId, maxComments) {
  const url = BASE_URL + '/issues/' + issueId + '/comments?per_page=100';
  let apiCalls = [];
  let pageNum = 1;
  while (maxComments > 0) {
    apiCalls.push($.get(url + '&page=' + pageNum++));
    maxComments -= 100;
  }
  return new Promise((resolve, reject) => {
    $.when(...apiCalls).then(
      function onComplete() {
        // console.debug(arguments);
        let results = [];
        for (let i = 0; i < apiCalls.length; i++) {
          if (!!arguments[i] && !!arguments[i][0]) {
            results = results.concat(arguments[i]);
          }
        }
        resolve(results);
      },
      error => {
        console.error('failed fetching issue comments from github');
        reject(error);
      }
    );
  });
}
