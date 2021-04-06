
import { createAction } from 'redux-actions';

const selectOrganization = createAction('selectOrganization', (payload) => payload);

const selectUser = createAction('selectUser', (payload) => payload);

const addContentToWallet = createAction('addContentToWallet', (payload) => payload);

export const actions = {
  selectOrganization,
  selectUser,
  addContentToWallet
};
