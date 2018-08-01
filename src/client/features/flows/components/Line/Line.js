import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { camelise } from '../../../../utils/svg';
import { actionCreators as flowActions, selector } from '../..';
import { connect } from 'react-redux';

class Line extends Component {

	constructor(props) {
		super(props);
	}


	render() {

		const { id, template } = this.props;
		const { x1, x2, y1, y2, style } = template;
		const _style = camelise(style);

		return <line x1={x1} x2={x2} y1={y1} y2={y2} style={_style} />
	}

}

export default connect(selector, (dispatch) => ({
	actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Line);