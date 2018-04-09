import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Helpers} from '../Helpers';

class LaunchesFilterForm extends Component {
    helpers;

    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.helpers = new Helpers(context);

        this.state = {
            launch_success: this.helpers.queryParamExistInUrl('launch_success'),
            core_reuse: this.helpers.queryParamExistInUrl('core_reuse'),
            launch_year: this.helpers.queryValueParamExistInUrl('launch_year')
        }
    }

    checkboxQueryHandle(element) {
        if (element.checked) {
            this.helpers.setOrUpdateQueryParam(element.value, true, (queryParam) => this.props.onRouteQueryChanged('?'+queryParam));
        } else {
            this.helpers.removeQueryParam(element.value, (queryParam) => this.props.onRouteQueryChanged('?'+queryParam));
        }
        this.setState({[element.value]: !this.state[element.value]});
    }

    pastFutureRadio(event) {
        this.props.onRouteUrlChange(event.value);
    }

    removeRocketIdParam() {
        this.helpers.removeQueryParam('rocket_id', (queryParam) => {
            this.props.onRouteQueryChanged('?'+queryParam);
        })
    }

    onYearEntered(event) {
        const valueEntered = event.target.value;
        if(event.key === 'Enter'){
            if (valueEntered && valueEntered <= new Date().getFullYear() && valueEntered > 1990) {
                this.helpers.setOrUpdateQueryParam('launch_year', valueEntered, (queryParam) => this.props.onRouteQueryChanged('?'+queryParam));
                this.setState({launch_year: valueEntered});
            } else if (!valueEntered) {
                this.helpers.removeQueryParam('launch_year', (queryParam) => this.props.onRouteQueryChanged('?'+queryParam));
                this.setState({launch_year: ''});
            } else {
                alert('Check the year entered and try again');
            }
        }
    }

    render() {
        return (
            <div className="form-check form-check-inline">
                <div>
                <input onChange={(evt) => this.checkboxQueryHandle(evt.target)} checked={this.state.launch_success} className="form-check-input" type="checkbox" value="launch_success" />
                <label className="form-check-label">Launch Success</label>
                </div>

                <div className="form-check form-check-inline">
                <input onChange={(evt) => this.checkboxQueryHandle(evt.target)} checked={this.state.core_reuse} className="form-check-input" type="checkbox" value="core_reuse" />
                <label className="form-check-label">Launches with reused cores</label>
                </div>

                <div className="form-check form-check-inline">
                <input onChange={(evt) => this.pastFutureRadio(evt.target)} className="form-check-input" type="radio" name="inlineRadioOptions" value="past" />
                <label className="form-check-label">Past</label>
                </div>

                <div className="form-check form-check-inline">
                <input onChange={(evt) => this.pastFutureRadio(evt.target)} className="form-check-input" type="radio" name="inlineRadioOptions" value="future" />
                <label className="form-check-label">Future</label>
                </div>

                <div className="form-group">
                    <label>Year</label>
                    <input onChange={(evt) => this.setState({launch_year: evt.target.value})} value={this.state.launch_year} onKeyPress={(event) => this.onYearEntered(event)} max={new Date().getFullYear()} min="1990" type="number" className="form-control" placeholder="Enter year" />
                </div>

                {this.helpers.queryParamExistInUrl('rocket_id') ? 
                <h4 style={{marginLeft: '50px'}}>
                    <span className="badge badge-secondary">{this.helpers.queryValueParamExistInUrl('rocket_id')} <span style={{cursor: 'pointer'}} onClick={() => this.removeRocketIdParam()}>X</span>
                </span></h4>
                : ''}
            </div>
        )
    }
}

export default LaunchesFilterForm;