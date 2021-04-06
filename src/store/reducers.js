
import { connectRouter } from 'connected-react-router';
import history from './history';
import { transmute } from './transmute'

export const reducers = {
  router: connectRouter(history),
  transmute: transmute.reducer,
}