
export function camelise(style) {

    style = style || {};

    return Object.keys(style).reduce((acc, key) => {
        acc[camelCase(key)] = style[key];
        return acc;
    }, {});

}

export function componentsFromTransform(a) {
    a = a.replace(/\s+/g, "");
    var b = {};
    for (var i in a = a.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
        var c = a[i].match(/[\w\.\-]+/g);
        b[c.shift()] = c;
    }

    return b;
}

export function convertToJSON(nodeList) {

    const items = {};

    for (var item of nodeList) {
        const id = item.id || generateId();

        switch (item.nodeName) {

            case "g":

                const children = convertToJSON(item.childNodes);
                //const bounds = calculateBounds(children, Number.MAX_VALUE, -1, Number.MAX_VALUE, -1);

                items[id] = {
                    id,
                    type: "group",
                    label: `group:${id}`,
                    x: 0,
                    y: 0,
                    // width: 0,//bounds.width,
                    //height: 0,//bounds.height,
                    style: {
                        fill: item.style.fill,
                        stroke: item.style.stroke,
                        'stroke-width': item.style.strokeWidth.trim() === "" ? 0 : item.style.strokeWidth,
                        opacity: 1,
                    },
                    children
                }

                break;

            case "ellipse":

                items[id] = {
                    id,
                    type: "ellipse",
                    label: `ellipse:${id}`,
                    cx: item.cx.baseVal.value,
                    cy: item.cy.baseVal.value,
                    rx: item.rx.baseVal.value,
                    ry: item.ry.baseVal.value,
                    style: {
                        fill: item.style.fill,
                        stroke: item.style.stroke.trim() === "" ? "none" : item.style.stroke,
                        'stroke-width': item.style.strokeWidth.trim() === "" ? 0 : item.style.strokeWidth,
                        opacity: 1,
                    }
                };

                break;

            case "circle":

                items[id] = {
                    id,
                    label: `circle:${id}`,
                    type: "circle",
                    cx: item.cx.baseVal.value,
                    cy: item.cy.baseVal.value,
                    r: item.r.baseVal.value,
                    style: {
                        fill: item.style.fill,
                        stroke: item.style.stroke.trim() === "" ? "none" : item.style.stroke,
                        'stroke-width': item.style.strokeWidth.trim() === "" ? 0 : item.style.strokeWidth,
                        opacity: 1,
                    }
                };
                break;

            case "rect":

                items[id] = {
                    id,
                    label: `rect:${id}`,
                    type: "rect",
                    x: item.x.baseVal.value,
                    y: item.y.baseVal.value,
                    width: item.width.baseVal.value,
                    height: item.height.baseVal.value,
                    style: {
                        fill: item.style.fill,
                        stroke: item.style.stroke.trim() === "" ? "none" : item.style.stroke,
                        'stroke-width': item.style.strokeWidth.trim() === "" ? 0 : item.style.strokeWidth,
                        opacity: 1,
                    }
                };

                break;

            case "line":

                items[id] = {
                    id,
                    label: `line:${id}`,
                    type: "line",
                    x1: item.x1.baseVal.value,
                    y1: item.y1.baseVal.value,
                    x2: item.x2.baseVal.value,
                    y2: item.y2.baseVal.value,
                    style: {
                        fill: item.style.fill,
                        stroke: item.style.stroke.trim() === "" ? "none" : item.style.stroke,
                        'stroke-width': item.style.strokeWidth.trim() === "" ? 0 : item.style.strokeWidth,
                        opacity: 1,
                    }
                };
                break;

            case "path":

                items[id] = {
                    id,
                    label: `path:${id}`,
                    type: "path",
                    d: item.attributes.d.nodeValue.replace(/([MmLlHhVvCcSsQqTtAaZz])/g, ' $1 ').trim(),
                    style: {
                        fill: item.style.fill,
                        stroke: item.style.stroke.trim() === "" ? "none" : item.style.stroke,
                        'stroke-width': item.style.strokeWidth.trim() === "" ? 0 : item.style.strokeWidth,
                        opacity: 1,
                    }
                };
                break;

            case "text":

                items[id] = {
                    id,
                    label: `text:${id}`,
                    type: "text",
                    x: item.x.baseVal[0].value,
                    y: item.y.baseVal[0].value,
                    text: item.textContent,
                    style: {
                        fill: item.style.fill,
                        stroke: item.style.stroke.trim() === "" ? "none" : item.style.stroke,
                        'stroke-width': item.style.strokeWidth.trim() === "" ? 0 : item.style.strokeWidth,
                        opacity: 1,
                        textAnchor: "start",
                        fontFamily: "Futura",
                        fontSize: 10,
                    }
                };
                break;

        }
    }
    return items;
}

const circleBounds = (item) => {

    const sw = _strokewidth(item.style["stroke-width"]);
    return {
        x: item.cx - item.r,
        y: item.cy - item.r,
        width: item.r * 2 + sw,
        height: item.r * 2 + sw,
    }
}

const lineBounds = (item) => {
    return {
        x: Math.min(item.x1, item.x2),
        y: Math.min(item.y1, item.y2),
        width: Math.abs(item.x2 - item.x1),
        height: Math.abs(item.y2 - item.y1)
    }
}

const ellipseBounds = (item) => {
    const sw = _strokewidth(item.style["stroke-width"]);
    return {
        x: item.cx - item.rx,
        y: item.cy - item.ry,
        width: item.rx * 2 + sw,
        height: item.ry * 2 + sw,
    }
}

const rectBounds = (item) => {

    return {
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height
    }
}

const textBounds = (item) => {


    return {
        x: item.x,
        y: item.y,
        width: 100,
        height: 12,
    }
}

const pathBounds = (item) => {

    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute("d", item.d);
    const sw = _strokewidth(item.style["stroke-width"]);
    const pathLength = path.getTotalLength();
    const precision = 8;

    // linear scan for coarse approximation
    let miny = Number.MAX_VALUE;
    let minx = Number.MAX_VALUE;
    let maxx = -Number.MAX_VALUE;
    let maxy = -Number.MAX_VALUE;

    for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
        let point = path.getPointAtLength(scanLength);
        miny = Math.min(miny, point.y);
        minx = Math.min(minx, point.x);
        maxy = Math.max(maxy, point.y);
        maxx = Math.max(maxx, point.x);
    }


    return { x: minx, y: miny, width: (maxx - minx) + sw, height: (maxy - miny) + sw };
}


const _minMax = (bounds, minmax) => {

    const { minX, maxX, minY, maxY } = minmax;

    return {
        minX: Math.min(bounds.x, minX),
        maxX: Math.max(bounds.x + bounds.width, maxX),
        minY: Math.min(bounds.y, minY),
        maxY: Math.max(bounds.y + bounds.height, maxY)
    }
}

const calculateBounds = (nodes, minX = Number.MAX_VALUE, maxX = -1, minY = Number.MAX_VALUE, maxY = -1) => {
    return { x: 0, y: 0, width: 0, height: 0 };

    const _minmax = Object.keys(nodes).reduce((acc, key) => {

        const item = nodes[key];

        const minmax = {
            minX: acc.minX,
            maxX: acc.maxX,
            minY: acc.minY,
            maxY: acc.maxY
        };

        switch (item.type) {

            case "group":
                return _minMax(calculateBounds(item.children, acc.minX, acc.maxX, acc.minY, acc.maxY), minmax);

            case "circle":
                return _minMax(circleBounds(item), minmax);

            case "ellipse":
                return _minMax(ellipseBounds(item), minmax);

            case "line":
                return _minMax(lineBounds(item), minmax);

            case "path":
                return _minMax(pathBounds(item), minmax);

            case "rect":
                return _minMax(rectBounds(item), minmax);

            case "text":
                return _minMax(textBounds(item), minmax);

        }

    }, { minX: minX, minY: minY, maxX: maxX, maxY: maxY });


    return {
        x: _minmax.minX,
        y: _minmax.minY,
        width: _minmax.maxX - _minmax.minX,
        height: _minmax.maxY - _minmax.minY
    }
}

const generateId = () => {
    return (1 + Math.random() * 4294967295).toString(16).replace(".", "");
}

const _strokewidth = (str = "") => {
    return Math.round(`${str}`.replace("px", ""));
}

const camelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    }).replace(/[-_]+/g, "");
}