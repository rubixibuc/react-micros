export const routingReducer = (state = { routes: [] }, { type, payload }) => {
  switch (type) {
    case "ADD_ROUTES":
      return { ...state, routes: [...state.routes, ...payload.routes] };
    default:
      return state;
  }
};
