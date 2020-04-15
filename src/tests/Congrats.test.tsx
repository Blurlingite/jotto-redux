import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Congrats from "../components/Congrats";

const defaultProps = { success: false };
/**
 * Factory function to create a ShallowWrapper for Congrats component
 * @function
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  // give default props using above const so I don't need to update every test when props change (...defaultProps)
  // also add in any props that were passed in (...props), NOTE: if you pass in a success prop in this
  // case, it will override the defaultProps declared above b/c it also has a success prop, which may be what you want
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};
test("renders without error", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});
test("renders no text when 'success' prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});
test("renders non-empty congrats message when 'success' prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  // we expect to have text when success is true, so make sure the length of text is not 0
  expect(message.text().length).not.toBe(0);
});
test("does not throw warning with expected props", () => {
  // const expectedProps = { success: false };
  checkProps(Congrats, defaultProps);
});
