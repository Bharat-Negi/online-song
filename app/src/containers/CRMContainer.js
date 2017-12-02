import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import CRMPage from './../pages/CRMPage';

class CRMContainer extends Component {
    render() {
        if (this.props.dashboardQuery && this.props.dashboardQuery.loading) {
            return <div>Loading data ........</div>
        }
        if (this.props.dashboardQuery && this.props.dashboardQuery.error) {
            return <div>Error : {this.props.dashboardQuery.error}</div>
        }
        console.log(this.props.cdrQuery);
        return (
            <CRMPage data={this.props.cdrQuery.crmlist}/>
        );
    }
};
export const CRM_DATA_QUERY = gql`
  query crmQuery {
    crmlist{
    id
    person_name
    company_name
    corporate_city
    contact_list
    crm_cpd_email_id
    crm_cpd_email_id
    ref_number
    call_status
  }
  }
`
export default graphql(CRM_DATA_QUERY, {name: 'crmQuery'})(CRMContainer)