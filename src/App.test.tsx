import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Child from "./Child";


describe('Testing App Component', () => {
    it('should render App', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
    });

    it('render click button', () => {
        const wrapper = shallow(<App />);
        const buttonElem = wrapper.find("#clickMe");
        expect(buttonElem).toHaveLength(1);
        expect(buttonElem.text()).toBe("Click Me");
    });

    it('on click of button counter increases', () => {
        const wrapper = shallow(<App />);
        const buttonElem = wrapper.find("#clickMe");
        buttonElem.simulate("click");

        expect(wrapper.state("clickCount")).toBe(1);
        const text = wrapper.find("p").text();
        expect(text).toEqual("You clicked me :: 1");
    });

    // This test will fail, props cannot be tested on the tested component, Its anti-pattern and not supported
    // https://github.com/enzymejs/enzyme/issues/331#issuecomment-230578503
    xit('passing props to component', () => {
        const props = {
            customProp: 1,
        }
        const wrapper = shallow(<App customProp={props.customProp} />);

        const buttonElem = wrapper.find("#clickMe");
        buttonElem.simulate("click");

        expect(wrapper.props().customProp).toBe(1);
        const text = wrapper.find("p").text();
        expect(text).toEqual("You clicked me :: 1");
    });

    it('renders Child component', () => {
        // https://pretagteam.com/question/how-to-test-child-component-method-with-enzyme

        const wrapper = shallow(<App />);

        expect(wrapper.containsMatchingElement(<Child />)).toEqual(true);

        expect(wrapper.find(Child)).toHaveLength(1);

        expect(wrapper.find(Child).props().initialCounterValue).toEqual(100);

        expect(wrapper.find(Child).props().initialCounterValue).toEqual(wrapper.state("countValueFromChild"));
    });


    it('trigger Child component event callback method in App', () => {
        // https://thewebdev.info/2021/05/08/how-to-check-if-a-function-is-called-on-a-component-jest/

        const wrapper = shallow(<App />);

        const instance = wrapper.instance()

        const spy = jest.spyOn(instance, "onCounterUpdate" as any); // casting function name as any to avoid ts error

        instance.forceUpdate();

        wrapper.find(Child).props().counterUpdateCallback(101);

        expect(spy).toHaveBeenCalled();
    });

});