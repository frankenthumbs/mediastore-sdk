/* eslint-disable react/jsx-props-no-spreading */
// import React from 'react';
// import { mount } from 'enzyme';
import Button from 'components/Button/Button';
import { mountComponentHelper } from 'test/testComponentHelper';
import ThankYouPage from './ThankYouPage';

const renderComponent = mountComponentHelper(ThankYouPage);

describe('<ThankYouPage/>', () => {
  const { wrapper } = renderComponent();
  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(Button).exists()).toEqual(true);
    });
  });
});
