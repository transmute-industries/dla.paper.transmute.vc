
import { withHandlers } from 'recompose';

export const handlers = withHandlers({
    doWork: ({ transmute }) => async (
        args
      ) => {
          console.log('doWork', transmute, args)
      }
});

