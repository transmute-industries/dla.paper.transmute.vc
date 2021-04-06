import { handleActions } from "redux-actions";

import { actions } from "./actions";

// import users from "../data/users.json";

const initialState = {
  user: { id: "" },
  users: [],
};

export const reducer = handleActions(
  {
    [actions.selectUser]: (state, { payload }) => {
      return {
        ...state,
        user: payload,
      };
    },
    [actions.addContentToWallet]: (state, { payload }) => {
      const { holder, content } = payload;
      let existing = state.actors[holder] || [];
      return {
        ...state,
        actors: {
          ...state.actors,
          [holder]: Array.from(new Set([...existing, ...content])),
        },
      };
    },
  },

  initialState
);
