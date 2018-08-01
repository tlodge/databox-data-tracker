import React, { Component } from 'react';
import { actionCreators as flowActions, selector } from '../../';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Circle from '../Circle';
import Ellipse from '../Ellipse';
import Group from '../Group';
import Path from '../Path';
import Rect from '../Rect';
import Text from '../Text';
import Line from '../Line';
import Summary from '../Summary';

//import Physical from '../Physical';
//import physical from '../../../../svgs/physical.svg';




class Flows extends Component {

    constructor(props) {
        super(props);
        this.renderTemplate = this.renderTemplate.bind(this);
        this.renderSummary = this.renderSummary.bind(this);
    }

    renderTemplate(template, animate = {}) {


        const props = {
            id: template.id,
            template,
            animate: animate[template.id],
        }


        switch (template.type) {

            case "circle":

                return <Circle key={template.id} {...props} />

            case "ellipse":
                return <Ellipse key={template.id} {...props} />

            case "rect":
                return <Rect key={template.id} {...props} />

            case "path":
                return <Path key={template.id} {...props} />

            case "text":
                return <Text key={template.id} {...props} />

            case "line":
                return <Line key={template.id} {...props} />

            case "group":
                return <Group key={template.id} {...props} />

        }

        return null;

    }

    componentDidMount() {


        this.props.actions.connectToServer();
        this.props.actions.createTemplates();

    }

    renderFiller(w, h) {
        const style = {
            width: `${3 * (w + 2)}px`,
            height: h,
            padding: 0,
            margin: 0,
            display: "inline-block"
        }
        return <div style={style}></div>
    }

    renderSummary(w, h) {


        const cellh = h - 36 / 2;
        const cell = {
            height: cellh,
            width: w + 2,
            display: 'inline-block',
            padding: 0,
            margin: 0,
        }

        const style = {
            width: `${3 * (w + 2)}px`,
            position: 'absolute',
            top: `${h}px`,
            left: `${2 + (w + 2) * 2}px`,
            height: h * 2,
            padding: 0,
            margin: 0,
        }


        const items = [
            { attribute: "EYE COLOUR", output: "EXPORT", background: "#47C0A0" },
            { attribute: "AGE", output: "EXPORT", background: "#C589A9" },
            { attribute: "EYE COLOUR", output: "EXPORT", background: "#FFD38F" },
            { attribute: "EYE COLOUR", output: "EXPORT", background: "#FFD38F" },
            { attribute: "EYE COLOUR", output: "EXPORT", background: "#47C0A0" },
            { attribute: "EYE COLOUR", output: "EXPORT", background: "#C589A9" },

        ].map((option, i) => {

            const cell = {
                position: 'absolute',
                height: cellh,
                top: `${Math.floor(i / 3) * cellh}px`,
                left: `${i % 3 * (w + 2)}px`
            }
            return <div style={cell}>
                <Summary w={w} h={cellh} options={option} />
            </div>
        });

        const footer = {
            position: 'absolute',
            top: h * 2 - 36,
            height: 36,
            width: `${3 + (3 * w)}px`,
            background: "black",
        }

        return <div style={style}>
            {items}
            <div style={footer}></div>
        </div>

    }

    render() {
        const { templates, w, h } = this.props;
        const ratio = 145 / 119

        let cellw = Math.floor(w / 7);
        let cellh = Math.floor(cellw * ratio);

        if (cellh * 4 > h) {
            cellh = Math.floor(h / 4);
            cellw = Math.floor((1 / ratio) * cellh);
        }


        const items = Object.keys(templates || {}).map(k => {
            const t = templates[k].template;


            const a = templates[k].animate || {};
            //if (k == "physical") {
            //    return <Physical template={t} id={t.id} selected={[]} />
            // }
            //else {
            const vignette = Object.keys(t).map(i => this.renderTemplate(t[i], { [i]: a[i] }));
            return <svg id="svgchart" width={cellw} height={cellh} viewBox={`0 0 ${119} ${145}`}>
                {vignette}
            </svg>
            //}

        });



        const parent = {
            height: h,
            width: w,
            overflow: "auto",
        }

        const row = {
            height: `${cellh}px`,
            width: w,
        }


        const cell = {
            width: `${cellw}px`,

            display: "inline-block",
            height: 'inherit',
            padding: 0,
            margin: 0,
            border: "1px solid white"
        }



        return <div style={parent}>


            <div style={row}>
                {items.slice(0, 7).map((item) => (<div style={cell}>{item}</div>))}
            </div>
            <div style={row}>
                {items.slice(7, 9).map((item) => (<div style={cell}>{item}</div>))}
                {this.renderFiller(cellw, cellh)}
                {items.slice(9, 11).map((item) => (<div style={cell}>{item}</div>))}
            </div>

            <div style={row}>
                {items.slice(11, 13).map((item) => (<div style={cell}>{item}</div>))}
                {this.renderFiller(cellw, cellh)}
                {items.slice(13, 15).map((item) => (<div style={cell}>{item}</div>))}
            </div>
            <div style={row}>
                {items.slice(15, 22).map((item) => (<div style={cell}>{item}</div>))}
            </div>

            {this.renderSummary(cellw, cellh)}
        </div>


    }

}

export default connect(selector, (dispatch) => ({
    actions: bindActionCreators(flowActions, dispatch)
}), null, { withRef: true })(Flows);