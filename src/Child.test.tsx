import React from "react";
import { mount, shallow } from "enzyme";
import Child from "./Child";


describe('Testing Child Component', () => {
    it('should render Child', () => {
        const wrapper = shallow(<Child />);
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
    });

    it('render click button', () => {
        const wrapper = shallow(<Child />);
        const buttonElem = wrapper.find("#clickMe");
        expect(buttonElem).toHaveLength(1);
        expect(buttonElem.text()).toBe("Click Me");
    });

    it('on click of button counter increases', () => {
        const wrapper = shallow(<Child />);
        const buttonElem = wrapper.find("#clickMe");
        buttonElem.simulate("click");

        expect(wrapper.state("clickCount")).toBe(1);
        const text = wrapper.find("p").text();
        expect(text).toEqual("You clicked me :: 1");
    });


    it('passing props to component', () => {
        const props = {
            initialCounterValue: 100,
        }
        const wrapper = shallow(<Child {...props} />);

        const buttonElem = wrapper.find("#clickMe");
        buttonElem.simulate("click");

        // expect(wrapper.props().initialCounterValue).toBe(100); // This does not work in Shallow https://github.com/enzymejs/enzyme/issues/331#issuecomment-230578503

        expect(wrapper.state("clickCount")).toBe(101); // As per the logic 100 (initial from props) + 1 (on click)
    });

    it('passing props to component and testing using mount', () => {
        const props = {
            initialCounterValue: 100,
        }
        const wrapper = mount(
            <Child {...props}/>
        );

        expect(wrapper.props().initialCounterValue).toEqual(100);
    });

});