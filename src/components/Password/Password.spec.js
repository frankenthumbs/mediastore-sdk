/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
import { PurePassword } from './Password';
import { WrapStyled } from './PasswordStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<Password/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<PurePassword />);
      expect(wrapper.find(WrapStyled)).toHaveLength(1);
      expect(wrapper.find(MyAccountInput)).toHaveLength(3);
    });
  });
});
