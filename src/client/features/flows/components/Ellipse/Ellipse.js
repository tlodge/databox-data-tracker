import React, { Component } from 'react';
import { camelise } from '../../../../utils/svg';
import { bindActionCreators } from 'redux';
import { actionCreators as flowActions, selector } from '../..';
import { connect } from 'react-redux';

class Ellipse extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		const { template } = this.props;
		const { cx, cy, rx, ry, style, transform = "translate(0,0)" } = template;
		const _style = camelise(style);

		return <g transform={`translate(${cx},${cy}) ${transform}`}>
			<ellipse cx={0} cy={0} rx={rx} ry={ry} style={_style} />
		</g>

	}

}

export default connect(selector, (dispatch) => ({
	actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Ellipse);