import React, { Component } from 'react';
import SVG from '../SVG';


export default class Physical extends SVG {

    constructor(props) {
        super(props);
    }

    render() {
        const { id, template, selected } = this.props;

        let _path;

        const vignette = Object.keys(template).map((k) => {
            const t = template[k];
            if (t.id == "waist") {
                _path = t;
            }
            return this.renderTemplate(t)
        });

        return <svg id="svgchart" width={238} height={290} viewBox={`0 0 ${119} ${145}`}>
            {vignette}
        </svg >
    }
}