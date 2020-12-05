import React from "react";
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../_reducers';
import { middlewares } from './store';
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};

export function testRender(component, { store, ...otherOpts }) {
    return render(<Provider store={store}>{component}</Provider>, otherOpts);
  }