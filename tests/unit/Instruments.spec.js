import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Instruments from '@/views/Instruments.vue'

global.fetch = require('node-fetch').default;

const instrumentsMock = [
  {
    "ticker": "ALPHA",
    "price": 3150.67, 
    "assetClass": "Credit"
  }, 
  {
    "ticker": "BETA",
    "price": -791.37,
    "assetClass": "Equities"
  },
  {
    "ticker": "ZETA",
    "price": 2150.67, 
    "assetClass": "Macro"
  },
];
const sorted = {
    key: 'assetClass',
    isAsc: false
};
  
describe('Instruments table', () => {
    
  // Basic test, display the list ordered by names in ascending order
    it('should display the financial instruments', (done) => {
      let wrapper = shallowMount(Instruments);
      wrapper.setData({instrumentlist: instrumentsMock});
      wrapper.vm.$nextTick(() => {
          //check if table DOM is painted
        expect(wrapper.findAll('tbody#instrumentBody > tr').length).to.equal(3);
        //check if computed properties is ok
        expect(wrapper.vm.sortedInstruments).to.equal(instrumentsMock);
        done()
      })
      wrapper.destroy();
    });
    // Test that the list is reversed when ordering in descending order
    it('should reverse the instruments list when ordering by Asset class in descending order', (done) => {
      let wrapper = shallowMount(Instruments);
      wrapper.setData({sort: sorted, instrumentlist: instrumentsMock});
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.sortedInstruments).to.equal(instrumentsMock.reverse());
        done()
      })
      wrapper.destroy();
    });
     // Test that the list is color coded as per asset class
    it('should check if rows are color coded by asset class', (done) => {
      let wrapper = shallowMount(Instruments);
      let sortAsc = {
        key: 'assetClass',
        isAsc: true
      };
      wrapper.setData({sort: sortAsc, instrumentlist: instrumentsMock});
      wrapper.vm.$nextTick(() => {
        let rows = wrapper.findAll('tbody#instrumentBody > tr');
        expect(rows.at(0).element._prevClass).to.equal('table-success'); // Credit = Green
        expect(rows.at(1).element._prevClass).to.equal('table-primary'); // Equities = Green
        expect(rows.at(2).element._prevClass).to.equal('table-light'); // Macro = White
        done()
      })
      wrapper.destroy();
    });
      // Test that the price is color coded blue if positive or red if negative
    it('should check if the price is color coded blue if positive or red if negative', (done) => {
      let wrapper = shallowMount(Instruments);
      wrapper.setData({sort: {
        key: 'assetClass',
        isAsc: true
      }, instrumentlist: instrumentsMock});
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.sortedInstruments.length).to.equal(3);
        let price = wrapper.findAll('tbody#instrumentBody > tr');
        expect(price.at(0).findAll('td').at(1).element._prevClass).to.equal('text-primary');
        expect(price.at(1).findAll('td').at(1).element._prevClass).to.equal('text-danger');
        done()
      })
      wrapper.destroy();
    });
});

