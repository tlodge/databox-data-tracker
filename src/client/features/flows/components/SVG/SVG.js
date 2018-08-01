import React, { Component } from 'react';
import { camelise } from '../../../../utils/svg';

import Circle from '../Circle';
import Ellipse from '../Ellipse';
import Group from '../Group';
import Path from '../Path';
import Rect from '../Rect';
import Text from '../Text';
import Line from '../Line';

export default class SVG extends Component {

    constructor(props) {
        super(props);
        this.renderTemplate = this.renderTemplate.bind(this);
    }

    renderTemplate(template) {
        console.log("rendering template", template);

        const props = {
            id: template.id,
            template,
            selected: [],
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

    render() {
        return null;
    }
}