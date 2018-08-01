import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { camelise } from '../../../../utils/svg';
import { actionCreators as flowActions, selector } from '../..';
import { connect } from 'react-redux';

class Rect extends Component {

	constructor(props) {
		super(props);
	}



	render() {

		const { x, y, rx = 0, ry = 0, width, height, style, transform = "translate(0,0)" } = this.props.template;
		const _style = camelise(style);



		return <g transform={`translate(${x},${y}) ${transform}`}>
			<rect rx={rx} ry={ry} x={0} y={0} width={width} height={height} style={_style} />
		</g>

	}
}

export default connect(selector, (dispatch) => ({
	actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Rect);