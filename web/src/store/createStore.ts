import {
  compose, createStore, applyMiddleware, Reducer,
} from 'redux';

export default (reducers: Reducer, middlewares: any) => {
  const enhancer = process.env.NODE_ENV === 'development'
    ? compose(
      console.tron.createEnhancer(),
      applyMiddleware(...middlewares),
    )
    : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
