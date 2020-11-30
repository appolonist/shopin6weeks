import React, { Children } from "react";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import { findByTestAtrr, testStore } from '../_helpers';
import App from './App';
import configureStore from 'redux-mock-store';


const setUp = (initialState={}) => {

  const store = testStore(initialState);
  const wrapper = shallow(<Provider store={store}><App /></Provider>).childAt(0);
  console.log(wrapper.debug());
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
      const component = findByTestAtrr(wrapper, 'appComponent');
      expect(component.length).toBe(0);
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
