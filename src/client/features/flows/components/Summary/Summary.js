import React, { Component } from 'react';
import Rect from "../Rect";
import Path from "../Path";
import Ellipse from '../Ellipse';
import Text from '../Text';

export default class Summary extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { w, h, options = {} } = this.props;

        const rect = {
            x: 0,
            y: 0,
            width: 122,
            height: 132,
            style: { fill: options.background || "#47c0a0" }
        }

        const path = {
            d: "M59.532,71.917L59.532,103.809",
            style: { fill: "none", stroke: "#fff", strokeWidth: "2.5px" }
        }

        const e1 = {
            cx: 61.416,
            cy: 30.946,
            rx: 21.429,
            ry: 20.745,
            style: {
                fill: "#464646",
                stroke: "#fff",
                strokeWidth: "0.9px",
            }
        }

        const e2 = {
            cx: 59.43,
            cy: 87.776,
            rx: 9.124,
            ry: 8.704,
            style: {
                fill: "#464646",
                stroke: "#fff",
                strokeWidth: "0.8px",
            }
        }

        const txt1 = {
            x: 59.495,
            y: 66.833,
            text: options.attribute || "",
            style: {
                fontFamily: `'Futura-Medium', 'Futura', sans-serif`,
                fontWeight: 500,
                fontSize: `10.846px`,
                fill: "#fff",
                textAnchor: "middle"
            }
        }
        const txt2 = {
            x: 60.148,
            y: 119.053,
            text: options.output || "",
            style: {
                fontFamily: `'Futura-Medium', 'Futura', sans-serif`,
                fontWeight: 500,
                fontSize: `10.846px`,
                fill: "#fff",
                textAnchor: "middle"
            }
        }
        return <svg id="svgchart" width={w} height={h} viewBox={`0 0 ${123} ${132}`} preserveAspectRatio="none">
            <g>
                <Rect template={rect} />
                <Path template={path} />
                <Ellipse template={e1} />
                <Ellipse template={e2} />
                <Text template={txt1} />
                <Text template={txt2} />
            </g>
        </svg >
    }
}