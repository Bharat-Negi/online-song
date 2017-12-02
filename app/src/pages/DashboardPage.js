import React, { Component } from 'react'
import { Grid, Row } from 'react-bootstrap';
// call page from other file
import LeftBar from '../components/leftnav/leftbar'
import RightSection from '../components/rightarea/rightscetion'

class DashboardPage extends Component {

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row className="mainArea">
                        <LeftBar />
                        <RightSection />
                    </Row>
                </Grid> 
            </div>
        )
    }

}

export default DashboardPage