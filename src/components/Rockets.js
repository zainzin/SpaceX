import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import axios from 'axios';
import {ROCKETS_URL} from '../constants';

class Rockets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rockets: [],
            expandedRows : [],
            fetched: false
        }
    }

    getRocketsData() {
        axios.get(ROCKETS_URL).then((rockets) => {
            this.setState({rockets: rockets.data, fetched: true});
        }).catch((error) => {
            alert(error);
        });
    }

    componentWillMount() {
        this.getRocketsData();
    }

    render() {
        const {rockets} = this.state;        
        return (
            <div>
                <ReactTable
                data={rockets}
                columns={[
                    {
                    columns: [
                        {
                            Header: "Id",
                            accessor: "id",
                            Footer: () => <div style={{ textAlign: "center" }}>Id</div>
                        },
                        {
                        Header: "Name",
                        accessor: "name",
                        Footer: () =>
                            <div style={{ textAlign: "center" }}>Name</div>
                        },
                        {
                        Header: "Type",
                        accessor: "type",
                        Footer: () =>
                            <div style={{ textAlign: "center" }}>Type</div>
                        }
                    ]
                    },
                    {
                    columns: [
                        {
                            Header: "Country",
                            accessor: "country",
                            Footer: () =>
                                <div style={{ textAlign: "center" }}>Country</div>
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
                SubComponent={(row) => <div style={{padding: '10px'}}>{
                    <div>
                        <div>Height: {row.original.height.meters}m {row.original.height.feet}ft</div>
                        <div>Mass: {row.original.mass.kg}kg {row.original.mass.lb}lb</div>
                        <div>Diameter: {row.original.diameter.meters}m {row.original.diameter.feet}ft</div>
                        <div>Country: {row.original.country}</div>
                        <Link to={`/launches?rocket_id=${row.original.id}`}>View Launches</Link>
                    </div>
                }</div>}
                />
            </div>
        );
    }
}

export default Rockets;