import { createStructuredSelector, createSelector } from 'reselect';
import { get, post } from '../../utils/net';

const FLOW_DATA = 'databox-data-tracker/flows/FLOW_DATA';

export const NAME = 'flows';

const initialState = {
    flows: {},
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {


        case FLOW_DATA:
            return state

        default:
            return state;
    }
}

function newFlow(flow) {
    return {
        type: FLOW_DATA,
        flow,
    }
}

const flows = (state) => state[NAME].flows;

export const selector = createStructuredSelector({
    flows,
});

export const actionCreators = {
    newFlow
};

