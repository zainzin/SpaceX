import React, {Component} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import LaunchesFilterForm from './LaunchesFilterForm';
import axois from 'axios';
import {
    LATEST_LAUNCHES_URL, 
    PAST_LAUNCHES_URL, 
    FUTURE_LAUNCHES_URL,
    ALL_LAUNCHES_URL
} from '../constants';

class Launches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            launches: [],
            fetched: false,
            LAUNCHES_URL: LATEST_LAUNCHES_URL
        }
    }

    componentWillMount() {
        this.getLaunches(this.props.location.search);
    }

    routeQueryChanged(queryParam) {
        this.getLaunches(queryParam);
    }

    routeUrlFetchChanged(option) {
        let newUrl;
        if (option === 'past') {
            newUrl = PAST_LAUNCHES_URL;
        } else if (option === 'future') {
            newUrl = FUTURE_LAUNCHES_URL;
        } else {
            newUrl = LATEST_LAUNCHES_URL;
        }
        this.setState({LAUNCHES_URL: newUrl}, () => {
            this.getLaunches(this.props.location.search);
        });
    }

    getLaunches(queryParam) {
        let url;
        if (queryParam.includes('rocket_id')) {
            url = ALL_LAUNCHES_URL;
        } else {
            url = this.state.LAUNCHES_URL;
        }
        
        queryParam = queryParam ? queryParam : '';
        axois.get(`${url}${queryParam}`).then((launchesResp) => {
            let launches = Array.isArray(launchesResp.data) ? launchesResp.data : [launchesResp.data];
            this.setState({launches});
        }).catch((error) => {
            alert(error);
        })
    }

    render() {
        const { launches } = this.state;
        
        return (
            <div>
                <LaunchesFilterForm onRouteUrlChange={this.routeUrlFetchChanged.bind(this)} onRouteQueryChanged={this.routeQueryChanged.bind(this) }/>
                <ReactTable
                data={launches}
                columns={[
                    {
                    columns: [
                        {
                            Header: "Flight Number",
                            accessor: "flight_number",
                            Footer: () => <div style={{ textAlign: "center" }}>Flight Number</div>
                        },
                        {
                        Header: "Rocket Name",
                        accessor: "rocket.rocket_name",
                        Footer: () =>
                            <div style={{ textAlign: "center" }}>Rocket Name</div>
                        },
                        {
                        Header: "Launch Year",
                        accessor: "launch_year",
                        Footer: () =>
                            <div style={{ textAlign: "center" }}>Launch Year</div>
                        }
                    ]
                    },
                    {
                    columns: [
                        {
                            Header: "Rocket Type",
                            accessor: "rocket.rocket_type",
                            Footer: () =>
                                <div style={{ textAlign: "center" }}>Rocket Type</div>
                        }
                    ]
                    },
                    {
                    columns: [
                        {
                        expander: true,
                        Header: () => <strong>More</strong>,
                        width: 65,
                        Expander: ({ isExpanded, ...rest }) =>
                            <div>
                            {isExpanded
                                ? <span>&#x2299;</span>
                                : <span>&#x2295;</span>}
                            </div>,
                        style: {
                            cursor: "pointer",
                            fontSize: 25,
                            padding: "0",
                            textAlign: "center",
                            userSelect: "none"
                        }
                        }
                    ]
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
                SubComponent={(row) => <div style={{padding: '10px'}}>{row.original.details ? row.original.details : 'No Details'}</div>}
                />
            </div>
        )
    }
}

export default Launches;
