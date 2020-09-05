import React from "react";
import { shallow, mount } from "enzyme";
import App from './App';

it("renders without crashing", () => {
  const wrapper = mount(<App />);
  expect(wrapper.state("error")).toEqual(null);
});
