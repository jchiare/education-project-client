import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../Stripe/PaymentForm";
import { PizzaOrderForm } from "../PizzaOrder/PizzaOrderForm";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe("pk_test_ykmAFdExAYtRqxOEC5dUXccd")
      });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe("pk_test_ykmAFdExAYtRqxOEC5dUXccd")
        });
      });
    }
  }
  render() {
    return (
      <div className="main">
        <h1>Operation Pizza</h1>

        <PizzaOrderForm />

        <StripeProvider stripe={this.state.stripe}>
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default App;
