import React, { Component, PropTypes } from 'react';
import * as gitApis from 'src/gitApis';
import {IssueList, Paginator, Loader} from 'src/components';

export default class ListView extends Component {
  static propTypes = {
    pageNumber: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    handleDisplayIssue: PropTypes.func.isRequired,
    handleTogglePage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      issueList: [],
      isLoading: true
    };
  }

  componentDidMount() {
    // fetch issue list from git api
    this.fetchIssueList(this.props.pageNumber);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageNumber !== this.props.pageNumber) {
      this.fetchIssueList(nextProps.pageNumber);
    }
  }

  fetchIssueList(pageNumber) {
    this.setState({isLoading: true});
    gitApis.getIssueList(pageNumber).then(
      issueList => {
        this.setState({issueList, isLoading: false});
      },
      error => {
        console.error(error);
        console.error('failed fetching issue list');
      }
    );
  }

  render() {
    const {
      issueList,
      isLoading
    } = this.state;

    const {
      pageNumber,
      maxPage,
      handleDisplayIssue,
      handleTogglePage
    } = this.props;
    return (
      <div>
        {isLoading ?
          <Loader /> :
          <IssueList issueArr={issueList} handleDisplayIssue={handleDisplayIssue} />
        }
        <Paginator
          maxPage={maxPage}
          pageNumber={pageNumber}
          handleTogglePage={handleTogglePage}
        />
      </div>
    );
  }
}
