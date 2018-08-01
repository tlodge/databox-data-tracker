import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { camelise } from '../../../../utils/svg';
import { actionCreators as flowActions, selector } from '../..';
import { connect } from 'react-redux';

class Text extends Component {

	static defaultProps = {
		transform: "translate(0,0)"
	};


	constructor(props) {
		super(props);
	}



	render() {

		const { template } = this.props;
		const { x, y, text, style } = template;

		const _style = camelise(style);

		return <g transform={this.props.transform}>
			<text x={x} y={y} style={_style}>{text}</text>
		</g>
	}


}
export default connect(selector, (dispatch) => ({
	actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Text);