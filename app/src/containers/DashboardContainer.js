import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import DashboardPage from './../pages/DashboardPage';

class DashboardContainer extends Component {
    render() {
        if (this.props.dashboardQuery && this.props.dashboardQuery.loading) {
            return <div>Loading data ........</div>
        }
        if (this.props.dashboardQuery && this.props.dashboardQuery.error) {
            return <div>Error : {this.props.dashboardQuery.error}</div>
        }
        console.log(this.props.dashboardQuery);
        return (
            <DashboardPage users={this.props.dashboardQuery.users} mygrouplist={this.props.dashboardQuery.mygrouplist} callWaiting={this.props.dashboardQuery.callWaiting} />
        );
    }
};
export const DASHBOARD_DATA_QUERY = gql`
  query dashboardQuery {
    users{
      uid
      email
      username
    }
    mygrouplist{
    id
    groupName
    users{
      uid
      avatarUrl
      name
    }
  }
  callWaiting{
    id
    name
    number
    location
  }
  callscriptlist{
    id
    campaign_name
    short_desc
    script_description
  }
  }
`
export default graphql(DASHBOARD_DATA_QUERY, {name: 'dashboardQuery'})(DashboardContainer)