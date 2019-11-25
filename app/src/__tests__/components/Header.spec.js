require('../helpers/enzyme-setup');
import { Header } from '../../components/Header';
import React from 'react';
let wrapper;
const mockFilterAddresses = jest.fn();
describe('Header', () => {

    beforeEach(()=> {
        wrapper = shallow(<Header filterAddresses={mockFilterAddresses} location={{pathname: '/'}}/>);
    })

    it('filters addresses when typing in the search box', () => {

        expect(wrapper.exists()).toBe(true);

        wrapper.find('input').simulate('change', {
            target: { value: 'hello there'}
        });
        expect(mockFilterAddresses).toBeCalledWith('hello there');
        
        wrapper.find('input').simulate('change', {
            target: { value: 'new search'}
        });
        expect(mockFilterAddresses).toBeCalledWith('new search');
    })
})