import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { camelise } from '../../../../utils/svg';
import { actionCreators as flowActions, selector } from '../..';
import { connect } from 'react-redux';
import { Spring, animated } from 'react-spring'
import { interpolate } from 'flubber'


class Path extends Component {

	componentWillMount() {
		const { id, template, animate } = this.props;
		const { d, style } = template;


		if (animate) {
			this.setState({
				from: d,
				to: animate.d
			});
		}
	}

	reset = () => { this.setState({ from: this.state.to, to: this.state.from }) }
	render() {

		const { id, template, to } = this.props;
		const { d, style } = template;


		let _style = camelise(style);
		if (this.state && this.state.from && this.state.to) {
			const interpolator = interpolate(this.state.from || d, this.state.to, { maxSegmentLength: 1.0 })
			return <Spring reset native from={{ t: 0 }} to={{ t: 1 }} onRest={this.reset}>
				{({ t }) => <animated.path d={t.interpolate(interpolator)} style={_style} />}
			</Spring>
		} else {
			return <path d={d} style={_style} />
		}
	}
}

export default connect(selector, (dispatch) => ({
	actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Path);