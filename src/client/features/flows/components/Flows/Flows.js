import React, { Component } from 'react';
import { actionCreators as flowActions, selector } from '../../';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Flows extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return <div> flows overview </div>
    }
}

export default connect(selector, (dispatch) => ({
    actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Flows);