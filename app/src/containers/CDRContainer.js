import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import CDRPage from './../pages/CDRPage';

class CDRContainer extends Component {
    render() {
        if (this.props.dashboardQuery && this.props.dashboardQuery.loading) {
            return <div>Loading data ........</div>
        }
        if (this.props.dashboardQuery && this.props.dashboardQuery.error) {
            return <div>Error : {this.props.dashboardQuery.error}</div>
        }
        console.log(this.props.cdrQuery);
        return (
            <CDRPage data={this.props.cdrQuery.cdr}/>
        );
    }
};
export const CDR_DATA_QUERY = gql`
  query cdrQuery {
    cdr{
    id
    cdrHeaders{
      id
      key
      label
      sortable
    }
    cdrData{
      id
      callType
      startTime
      duration
      operatorId
      dialledNumber
      callerNumber
      inboundRate
      inboundCharge
      outboundRate
      outboundCharge
    }
  }
  }
`
export default graphql(CDR_DATA_QUERY, {name: 'cdrQuery'})(CDRContainer)