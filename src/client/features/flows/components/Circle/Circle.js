import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { camelise } from '../../../../utils/svg';
import { actionCreators as flowActions, selector } from '../..';
import { connect } from 'react-redux';


class Circle extends Component {

	constructor(props) {
		super(props);

	}


	renderControls(r) {

		const style = {
			stroke: "black",
			strokeWidth: 1,
			fill: '#3f51b5',
		}

		const rotatestyle = {
			stroke: "black",
			strokeWidth: 1,
			fill: 'red',
		}

		const linestyle = {
			stroke: "#3f51b5",
			strokeWidth: 2,
		}

		return <g>
			<circle style={rotatestyle} cx={0} cy={-r - 40} r={6} onMouseDown={this._onRotate} />
			<line style={linestyle} x1={0} x2={0} y1={-r - 40 + 6} y2={-r} />
			<circle style={style} cx={-r} cy={-r} r={6} onMouseDown={this._onExpand} />
			<circle style={style} cx={r} cy={r} r={6} onMouseDown={this._onExpand} />
			<circle style={style} cx={r} cy={-r} r={6} onMouseDown={this._onExpand} />
			<circle style={style} cx={-r} cy={r} r={6} onMouseDown={this._onExpand} />
		</g>
	}

	shouldComponentUpdate(nextProps, nextState) {

		return this.props.template != nextProps.template || this.props.selected != nextProps.selected;
	}

	render() {

		const { id, template, selected } = this.props;
		const { cx, cy, r, style, transform = "translate(0,0)" } = template;
		const amSelected = selected.indexOf(id) != -1;

		const _style = camelise(style);

		const _selectedstyle = {
			stroke: "#3f51b5",
			strokeWidth: 2,
			fill: 'none',
		}

		const sw = _style.strokeWidth ? Number(sw) ? Number(sw) : 0 : 0;

		const selectedr = Number(r) + 2 + sw / 2;


		return <g transform={`translate(${cx},${cy}) ${transform}`}>
			<circle cx={0} cy={0} r={r} style={_style}></circle>
			{amSelected && <circle cx={0} cy={0} r={selectedr} style={_selectedstyle}></circle>}
			{amSelected && this.renderControls(selectedr)}
		</g>
	}

}

export default connect(selector, (dispatch) => ({
	actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Circle);