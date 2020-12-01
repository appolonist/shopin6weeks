import React, { Children } from "react";
import * as redux from "react-redux";
import { shallow } from "enzyme";
import { findByTestAtrr, testStore } from '../_helpers';
import App from './App';
import configureStore from 'redux-mock-store';
import { render } from "@testing-library/react";

const setUp = (initialState={}) => {

  const store = testStore(initialState);
  const wrapper = render(<redux.Provider store={store}><App /></redux.Provider>);
   return wrapper;
};

describe('App Component', () => {
  let wrapper;
  beforeEach(()=> {
        wrapper = setUp({
        authentication: {},
        registration: {},
        productCreation: {},
        products: {},
        users: {},
        alert: {}
      });
      
    });
  it('Should render without errors', () => {
      const component = wrapper.find(`[data-test='appComponent']`);
      expect(component.length).toBe(1);
  });

  // it('exampleMethod_updatesState Method should update state as expected', () => {
  //     const classInstance = wrapper.instance();
  //     classInstance.exampleMethod_updatesState();
  //     const newState = classInstance.state.hideBtn;
  //     expect(newState).toBe(true);
  // });

  // it('exampleMethod_returnsAValue Method should return value as expected', () => {
  //     const classInstance = wrapper.instance();
  //     const newValue = classInstance.exampleMethod_returnsAValue(6);
  //     expect(newValue).toBe(7);
  // });
});
