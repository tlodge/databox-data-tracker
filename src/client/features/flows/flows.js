import { createStructuredSelector, createSelector } from 'reselect';
import { get, post } from '../../utils/net';
//import * as WebSocket from 'ws';
import { convertToJSON } from '../../utils/svg';
import { behaviour, family, ownership, physical, professional, contact, biometric, consumption, credentials, criminal, education, ethnicity, finances, health, history, home, preferences, religion, sexual, social, state, tracking, summary } from './svgs'

const parser = new DOMParser();

const FLOW_DATA = 'databox-data-tracker/flows/FLOW_DATA';
const CONNECTING_TO_SERVER = 'databox-data-tracker/flows/CONNECTING_TO_SERVER';
const CREATING_TEMPLATES = 'databox-data-tracker/flows/CREATING_TEMPLATES';
const ADD_TEMPLATE = 'databox-data-tracker/flows/ADD_TEMPLATE';


export const NAME = 'flows';

const initialState = {
    flows: {},
    templates: {},
    summary: {},
    w: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 2,
    h: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 8,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case ADD_TEMPLATE:
            return {
                ...state,
                templates: {
                    ...state.templates,
                    [action.name]: {
                        template: action.template,
                        animate: Object.keys(action.animate).length > 0 ? action.animate : null,
                    }
                }
            }




        case FLOW_DATA:
            return state

        default:
            return state;
    }
}

function newFlow(flow) {
    console.log("seen new flow", flow);
    return {
        type: FLOW_DATA,
        flow,
    }
}

function connectingToServer() {
    return {
        type: CONNECTING_TO_SERVER,
    }
}

function connectToServer() {

    console.log("ok connect to server has been called!!!");
    
    return (dispatch, getState) => {
        dispatch(connectingToServer());
        let pathname = "";

        const paths = window.location.pathname.split("/");

        if (paths.length > 1) {
            if (paths[paths.length - 2] != "") {
                pathname = `/${paths[paths.length - 2]}`;
            }
        }

       /* let ws = new WebSocket(`wss://${window.location.host}${pathname}/ui/ws`);
      
        ws.onopen = function(evt) {
            console.log("OPEN");
            ws.send("this is my first message!!");
        }
        
        ws.onclose = function(evt) {
          console.log("CLOSE");
          ws = null;
        }
      
        ws.onmessage = function(evt) {
          console.log("RESPONSE: " + evt.data);
        }
      
        ws.onerror = function(evt) {
          console.log("ERROR: " + evt.data);
        }*/

        /*const socket = io('/databox-data-tracker', { path: `${pathname}/ui/socket.io` });

        socket.on("connect", function () {
            socket.emit("join", "webapp");
        });

        socket.on("data", function (data) {
            dispatch(newFlow(data));
        });*/
    }
}

function creatingTemplates() {
    return {
        type: CREATING_TEMPLATES,
    }
}

function addTemplate(name, template, animate = {}) {
    return {
        type: ADD_TEMPLATE,
        name,
        template,
        animate
    }
}


function createTemplates() {



    return (dispatch, getState) => {

        dispatch(creatingTemplates());

        [{ key: "physical", value: physical },
        { key: "family", value: family },
        { key: "professional", value: professional },
        { key: "ownership", value: ownership },
        { key: "contact", value: contact },
        { key: "behaviour", value: behaviour },
        { key: "biometric", value: biometric },
        { key: "consumption", value: consumption },
        { key: "credentials", value: credentials },
        { key: "criminal", value: criminal },
        { key: "education", value: education },
        { key: "ethnicity", value: ethnicity },
        { key: "finances", value: finances },
        { key: "health", value: health },
        { key: "history", value: history },
        { key: "home", value: home },
        { key: "preferences", value: preferences },
        { key: "religion", value: religion },
        { key: "sexual", value: sexual },
        { key: "social", value: social },
        { key: "state", value: state },
        { key: "tracking", value: tracking }
        ].map((t) => {
            const { key, value } = t;
            const { from, ...rest } = value;
            const template = _createTemplate(from);
            dispatch(addTemplate(key, template, rest));
        });
    }
}

const _createTemplate = (tmpl, ) => {
    const doc = parser.parseFromString(tmpl, "image/svg+xml");
    const root = doc.childNodes;
    let svg;

    for (var item of root) {
        if (item.nodeName === "svg" && item.childNodes.length > 0) {
            svg = item;
            break;
        }
    }

    return convertToJSON(svg.childNodes);
}

const flows = (state) => state[NAME].flows;
const templates = (state) => state[NAME].templates;
const w = (state) => state[NAME].w;
const h = (state) => state[NAME].h;

export const selector = createStructuredSelector({
    flows,
    templates,
    w,
    h
});

export const actionCreators = {
    newFlow,
    connectToServer,
    createTemplates,
};

