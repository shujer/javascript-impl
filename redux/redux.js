const createStore = (reducer, preloadState, enhancer) => {
  if (typeof preloadState === "function" && enhancer === undefined) {
    enhancer = preloadState;
    preloadState = undefined;
  }
  if (enhancer) {
    return enhancer(createStore)(reducer, preloadState);
  }
  let state = preloadState;
  const listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
    return action;
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };
  return { getState, dispatch, subscribe };
};
const compose = (...fns) => {
  if (fns.length === 0) return (s) => s;
  if (fns.length === 1) return fns[0];
  return fns.reduce((a, b) => {
    return (...args) => a(b(...args));
  });
};
const applyMiddleware = (...middlewares) => {
  return (createStore) =>
    (...args) => {
      let store = createStore(...args);
      let dispatch = () => {
        throw new Error(
          "Dispatching while constructing your middleware is not allowed. " +
            "Other middleware would not be applied to this dispatch."
        );
      };
      const middlewareApi = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args),
      };
      let enhanceDispatchers = middlewares.map((middleware) =>
        middleware(middlewareApi)
      );
      dispatch = compose(...enhanceDispatchers)(store.dispatch);
      return { ...store, dispatch };
    };
};

// test
const reducer = (prevState = 0, action) => {
  switch (action.type) {
    case "ADD":
      return prevState + 1;
    case "MINUS":
      return prevState - 1;
    default:
      return prevState;
  }
};

const logger1 = (middlewareAPI) => (next) => (action) => {
  console.log("start dispatch 1 : ", action);
  let result = next(action);
  return result;
};

const logger2 = (middlewareAPI) => (next) => (action) => {
  console.log("start dispatch 2: ", action);
  let result = next(action);
  return result;
};

const store = createStore(reducer, applyMiddleware(logger1, logger2));
let unsubscribe = store.subscribe(() => {
  console.log("listen ", store.getState());
});
store.dispatch({ type: "ADD" });
store.dispatch({ type: "ADD" });
unsubscribe();
store.dispatch({ type: "MINUS" });
