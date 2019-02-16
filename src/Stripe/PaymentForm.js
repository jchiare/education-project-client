import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import ".././App/App.css";

const createOptions = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#9e2146"
    }
  }
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = { complete: false };
  }

  async submit(ev) {
    ev.preventDefault();
    const { token } = await this.props.stripe.createToken();
    const response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripe_token: token.id
      })
    });

    const data = await response.json();

    if (response.ok) {
      this.setState({ complete: true });
    } else {
      alert(data.error);
    }
  }

  render() {
    // if stripe doesn't render the card payment section
    if (!this.props.stripe) return <h1>Payment form not actived</h1>;
    // if the user has already purposed something
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div>
        <form onSubmit={this.submit}>
          <label>
            Card details
            <CardElement {...createOptions} />
          </label>
          <button>Pay</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
