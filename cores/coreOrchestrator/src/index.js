import { store, actions } from "coreRedux";

export const routes = [
  {
    component: "Core1",
    core: "core1",
    route: {
      path: "/core1"
    }
  }
];

store.dispatch(
  actions.addRoutes({
    routes
  })
);
