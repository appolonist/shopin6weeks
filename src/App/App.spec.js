import { App } from './App';
import { shallow } from "enzyme";
import { findByTestAtrr, testStore } from '../_helpers';
import React from "react";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn().mockImplementation(selector => selector())),
  useDispatch: () => jest.fn()
}));

const setUp = (initialState={}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<App store={store} />).childAt(0).dive();
  console.log(wrapper.debug());

  return wrapper;
};

describe('App Component', () => {
   let wrapper;
   beforeEach(() => {
      const initialState = {
        authentication: {},
        registration: {},
        productCreation: {},
        products: {},
        users: {},
        alert: {}
      }
       wrapper = setUp(initialState);
    
  });
  it('Should render without errors', () => {
      const component = findByTestAtrr(wrapper, 'appComponent');
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
