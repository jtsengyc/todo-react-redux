import React, { Component } from 'react';
import {Header, Loader} from './components';
import {ListView, IssueView} from './pages';
import * as gitApis from './gitApis';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      maxPage: 1,
      displayIssueNumber: null,
      isLoading: true
    };
  }

  componentDidMount() {
    // fetch repo info (number of issue) api call
    gitApis.getTotalIssueCount().then(
      count => {
        this.setState({maxPage: Math.ceil(count / 25), isLoading: false});
      },
      error => {
        console.error('failed fetching repo count');
        console.error(error);
      }
    );
  }

  handleTogglePage(pageNumber) {
    this.setState({pageNumber});
  }

  handleDisplayIssue(issueNum) {
    this.setState({displayIssueNumber: issueNum});
  }

  render() {
    const {
      pageNumber,
      maxPage,
      displayIssueNumber,
      isLoading
    } = this.state;

    return (
      <div>
        <Header />
        {isLoading ?
          <Loader /> :
          (
            displayIssueNumber ?
              <IssueView
                issueId={displayIssueNumber}
                handleDisplayIssue={::this.handleDisplayIssue}
              /> :
              <ListView
                pageNumber={pageNumber}
                maxPage={maxPage}
                handleDisplayIssue={::this.handleDisplayIssue}
                handleTogglePage={::this.handleTogglePage}
              />
          )
        }
      </div>
    );
  }
}
