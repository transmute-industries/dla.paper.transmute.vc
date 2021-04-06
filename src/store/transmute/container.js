
import { compose } from 'recompose';
import { connect } from 'react-redux';


import {actions} from './actions'
import {handlers} from './handlers'

// Redux
const redux = connect((args) => args, { ...actions });

// Containers
export const container = compose(redux, handlers);
