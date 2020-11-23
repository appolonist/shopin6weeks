import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../_helpers';
import Logo from './Logo';

const setUp = (props={}) => {
    const component = shallow(<Logo {...props} />);
    return component;
};

describe('Logo Component', () => {

    let component;
    beforeEach(() => {
        component = setUp(); 
    });

    it('Should render without errors', () => {
        const wrapper = findByTestAtrr(component, 'logoComponent');
        expect(wrapper.length).toBe(1);
    });

    it('Should render a logo', () => {
        const logo = findByTestAtrr(component, 'logoLink');
        expect(logo.length).toBe(1);
    });

});