import { store, actions } from "coreRedux";

export const routes = [
  {
    component: "Core1",
    componentCore: "1",
    requiredCores: ["1"],
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
