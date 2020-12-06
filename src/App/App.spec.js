import React from "react";
import { testRender, store } from '../_helpers';
import App from './App';



describe('App Component', () => {
  it('Should render without errors', () => {
      const testStore = store;
      const { getByTestId } = testRender(<App />, {testStore});
      const appComponent = getByTestId("appComponent");
      expect(appComponent.length).toBe(1);
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
