/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { FontColor } from 'styles/variables';
import { getData } from 'util/appConfigHelper';
import { AdyenStyled, ConfirmButtonStyled } from './AdyenStyled';

const COMPONENT_CONTAINER_ID = 'component-container';
const PAYMENT_METHOD_CARD = 'card';

class Adyen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    if (window.AdyenCheckout === undefined) {
      this.loadAdyenStylesheet()
        .then(this.loadAdyenScript)
        .then(this.renderCheckout)
        .then(() => {
          this.setState({
            isLoaded: true
          });
        });
    } else {
      this.renderCheckout();
      this.setState({
        isLoaded: true
      });
    }
  }

  onError = e => {
    const { error, fieldType } = e;
    window.dispatchEvent(
      new CustomEvent('MSSDK:Adyen-error', {
        detail: {
          error,
          fieldType
        }
      })
    );
  };

  getAdyenEnv = () =>
    getData('CLEENG_ENVIRONMENT') === 'production' ? 'live' : 'test';

  loadAdyenStylesheet = () => {
    const ADYEN_STYLESHEET_HREF = `https://checkoutshopper-${this.getAdyenEnv()}.adyen.com/checkoutshopper/sdk/3.11.4/adyen.css`;
    return new Promise((resolve, reject) => {
      const linkEl = document.createElement('link');
      linkEl.onload = resolve;
      linkEl.onerror = reject;
      linkEl.rel = 'stylesheet';
      linkEl.href = ADYEN_STYLESHEET_HREF;
      document.body.append(linkEl);
    });
  };

  // we won't test chain loading resources from Adyen
  /* istanbul ignore next */
  loadAdyenScript = () => {
    const ADYEN_SCRIPT_HREF = `https://checkoutshopper-${this.getAdyenEnv()}.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js`;
    return new Promise((resolve, reject) => {
      const scriptEl = document.createElement('script');
      scriptEl.onload = resolve;
      scriptEl.onerror = reject;
      scriptEl.src = ADYEN_SCRIPT_HREF;
      document.body.append(scriptEl);
    });
  };

  renderCheckout = () => {
    const { onSubmit, onChange } = this.props;
    const configuration = {
      showPayButton: false,
      hasHolderName: true,
      holderNameRequired: true,
      environment: this.getAdyenEnv(),
      clientKey:
        this.getAdyenEnv() === 'live'
          ? 'live_BQDOFBYTGZB3XKF62GBYSLPUJ4YW2TPL'
          : 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K',
      onSubmit,
      onChange,
      onError: this.onError
    };

    const cardConfiguration = {
      styles: {
        base: {
          color: FontColor
        }
      }
    };

    this.checkout = new window.AdyenCheckout(configuration)
      .create(PAYMENT_METHOD_CARD, cardConfiguration)
      .mount(`#${COMPONENT_CONTAINER_ID}`);
  };

  render() {
    const { isLoaded } = this.state;
    const { t, isPaymentProcessing, isCheckout } = this.props;
    const myAccountProps = {
      size: 'normal',
      width: '60%',
      margin: 'auto'
    };
    const confirmButtonText = isCheckout ? t('Complete purchase') : t('Update');

    return (
      <AdyenStyled isMyAccount={!isCheckout}>
        <div id={COMPONENT_CONTAINER_ID} />
        {isLoaded && (
          <ConfirmButtonStyled>
            <Button
              size="big"
              {...(isCheckout ? {} : myAccountProps)}
              theme="confirm"
              onClickFn={() => this.checkout.submit()}
              disabled={isPaymentProcessing}
            >
              {isPaymentProcessing ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                confirmButtonText
              )}
            </Button>
          </ConfirmButtonStyled>
        )}
      </AdyenStyled>
    );
  }
}
Adyen.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  isPaymentProcessing: PropTypes.bool,
  isCheckout: PropTypes.bool
};

Adyen.defaultProps = {
  t: k => k,
  onChange: () => {},
  isPaymentProcessing: false,
  isCheckout: true
};

export { Adyen as PureAdyen };

export default withTranslation()(labeling()(Adyen));
