import React, {Component} from 'react';
import {COMPANY_INFO_URL, ALERT_ERROR_MSG} from '../constants';
import axios from 'axios';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyInfo: {
                founder: null,
                vehicles: null,
                launch_sites: null,
                test_sites: null,
                summary: null,
                headquarters: {
                    address: null,
                    city: null,
                    state: null
                }
            },
            fetched: false
        }
    }

    componentWillMount() {
        this.getCompanyData();
    }

    getCompanyData() {
        axios.get(COMPANY_INFO_URL).then(({data}) => {
            this.setState({companyInfo: data, fetched: true});
        }).catch((error) => {
            alert(ALERT_ERROR_MSG);
            this.setState({fetched: false});
        });
    }

    populateData() {
        const companyInfo = this.state.companyInfo;
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>SpaceX</h1>
                    <p>{companyInfo['summary']}</p> 
                    <p>Founded by: {companyInfo['founder']}</p>
                    <p>Vehicles: {companyInfo['vehicles']}</p>
                    <p>Launch Sites: {companyInfo['launch_sites']}</p>
                    <p>Test Sites: {companyInfo['test_sites']}</p>
                    <p>Head Quarters: {companyInfo['headquarters']['address']} {companyInfo['headquarters']['city']}
                    ,{companyInfo['headquarters']['state']}</p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.fetched ? this.populateData() : <h3>Loading...</h3>}
            </div>
        )
    }
}

export default Home;
