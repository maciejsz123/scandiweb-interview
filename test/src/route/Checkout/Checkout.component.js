import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component';
import './Checkout.extension.style.scss';
import ContentWrapper from 'Component/ContentWrapper';

export class Checkout extends SourceCheckout {

  renderProgressBar() {
    return(
      <div id="progress">
        <div id='progress-bar'>
          <div id='bar-done' className='done-0'></div>
          <div id='bar-remaining' className='remaining-0'></div>
        </div>
        <ul id="progress-status">
          <li className={`progress-step ${this.props.checkoutStep === 'SHIPPING_STEP' || this.props.checkoutStep === 'BILLING_STEP' || this.props.checkoutStep === 'DETAILS_STEP' ? 'active' : ''}`}>
            <div className='progress-step-circle'>
              <div className='progress-step-number'>
                {
                  this.props.checkoutStep === 'BILLING_STEP' || this.props.checkoutStep === 'DETAILS_STEP' ?
                  <div className='check'></div> :
                  '1'
                }
              </div>
            </div>
            <span><b>Shipping</b></span>
          </li>
          <li className={`progress-step ${this.props.checkoutStep === 'BILLING_STEP' || this.props.checkoutStep === 'DETAILS_STEP' ? 'active' : ''}`}>
            <div className='progress-step-circle'>
              <div className='progress-step-number'>
                {
                  this.props.checkoutStep === 'DETAILS_STEP' ?
                  <div className='check'></div>  :
                  '2'
                }
              </div>
            </div>
            <span><b>Review & Payments</b></span>
          </li>
        </ul>
      </div>
    )
  }

  barProgression() {
    let barDone = document.getElementById('bar-done');
    let barRemaining = document.getElementById('bar-remaining');
    let bar = document.getElementById('progress-bar');
    if(!bar) return;

    if(this.props.checkoutStep === 'SHIPPING_STEP') {
      setTimeout( () => {
        barDone.classList.remove('done-0');
        barDone.classList.add('done-1');
        barRemaining.classList.remove('remaining-0');
        barRemaining.classList.add('remaining-1');
      }, 0)
    } else if(this.props.checkoutStep === 'BILLING_STEP') {
      barDone.classList.remove('done-1');
      barDone.classList.add('done-2');
      barRemaining.classList.remove('remaining-1');
      barRemaining.classList.add('remaining-2');
    } else if(this.props.checkoutStep === 'DETAILS_STEP') {
      barDone.classList.remove('done-2');
      barDone.classList.add('done-3');
      barRemaining.classList.remove('remaining-2');
      barRemaining.classList.add('remaining-3');
    }
  }

  render() {
    this.barProgression();
    return (
        <main block="Checkout">
          { this.renderProgressBar() }
            <ContentWrapper
              wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
              label={ __('Checkout page') }
            >
                { this.renderSummary(true) }
                <div block="Checkout" elem="Step">
                    { this.renderTitle() }
                    { this.renderGuestForm() }
                    { this.renderStep() }
                    { this.renderLoader() }
                </div>
                <div>
                    { this.renderSummary() }
                    { this.renderPromo() }
                    { this.renderCoupon() }
                </div>
            </ContentWrapper>
        </main>
    );
  }

}


export default Checkout;
