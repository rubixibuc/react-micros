import { store, actions } from "coreRedux";
export { Core1 } from "./components/Core1";

store.dispatch(
  actions.addRoutes({
    routes: [
      {
        core1: {
          path: "/core1",
          component: "Core1"
        }
      }
    ]
  })
);
