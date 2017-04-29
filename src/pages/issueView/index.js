import React, { Component, PropTypes } from 'react';
import * as gitApis from 'src/gitApis';
import {IssueDetails, Loader} from 'src/components';

export default class IssueView extends Component {
  static propTypes = {
    issueId: PropTypes.number.isRequired,
    handleDisplayIssue: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      issueDetails: {},
      issueComments: [],
      isLoading: true
    };
  }

  componentDidMount() {
    gitApis.getIssueDetails(this.props.issueId).then(
      issueDetails => {
        if (issueDetails.comments) {
          gitApis.getIssueComments(this.props.issueId, issueDetails.comments).then(
            issueComments => {
              this.setState({issueDetails, issueComments, isLoading: false});
            },
            error => {
              console.error('failed fetching issue comments');
              console.error(error);
            }
          );
        } else {
          this.setState({issueDetails, isLoading: false});
        }
      },
      error => {
        console.error('failed fetching issue details');
        console.error(error);
      }
    );
  }

  render() {
    const {
      issueDetails,
      issueComments,
      isLoading
    } = this.state;

    const {
      handleDisplayIssue
    } = this.props;
    // move the detail rendering into some component class
    return (
      <div>
        {isLoading ?
          <Loader /> :
          <IssueDetails issueObj={issueDetails} commentArr={issueComments} />
        }
        <div className='returnBtn' onClick={() => handleDisplayIssue('')}>Return</div>
      </div>
    );
  }
}
