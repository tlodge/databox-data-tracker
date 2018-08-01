import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { camelise, componentsFromTransform } from '../../../../utils/svg';
import { actionCreators as flowActions, selector, NAME } from '../..';
import { connect } from 'react-redux';
import Circle from '../Circle';
import Line from '../Line';
import Ellipse from '../Ellipse';
import Path from '../Path';
import Rect from '../Rect';
import Text from '../Text';

class Group extends Component {

	constructor(props) {
		super(props);
	}


	renderChildren(children) {





		return Object.keys(children).map((k) => {
			const template = children[k];

			const id = template.id;

			const props = {
				template, selected: []
			}

			switch (template.type) {

				case "circle":
					return <Circle key={id} {...props} />

				case "ellipse":
					return <Ellipse key={id} {...props} />

				case "rect":
					return <Rect key={id}  {...props} />

				case "text":
					return <Text key={id} {...props} />

				case "line":
					return <Line key={id} {...props} />

				case "path":
					return <Path key={id} {...props} />

				case "group":
					return <Group key={id} {...{ ...this.props }} />

				default:
					return null;
			}
		});
	}

	render() {

		const { id, template } = this.props;



		const { x = 0, y = 0, width, height, style, transform = "translate(0,0)" } = template;

		const _style = camelise(style);

		const { scale = 1, rotate, translate } = componentsFromTransform(transform.replace(/\s+/g, ""));
		const [degrees, rx, ry] = rotate || [0, 0, 0];
		const [tx = 0, ty = 0] = translate || [0, 0];

		const dtx = (Number(x) / Number(scale)) + Number(tx);
		const dty = (Number(y) / Number(scale)) + Number(ty);

		const _transform = `scale(${scale}),translate(${dtx},${dty}),rotate(${degrees},${Number(rx)},${Number(ry)})`;

		return <g style={_style} transform={_transform}>
			{this.renderChildren(template.children)}
		</g>


	}

}

export default connect(selector, (dispatch) => ({
	actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Group);