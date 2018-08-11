export const routingReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "ADD_ROUTES":
      return { ...state, routes: [...state.routes, ...payload.routes] };
    default:
      return state;
  }
};
