import React from 'react';
import { Field, reduxForm } from 'redux-form';

function CheckoutForm(props) {
  const { handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="order[name]">Your Name:</label>
          <br />
          <Field name="order[name]" component="input" type="text" />
        </div>

        <div>
          <label htmlFor="order[email]">Your Email:</label>
          <br />
          <Field email="order[email]" component="input" type="email" />
        </div>

        <div>
          <button type="submit">Submit order</button>
        </div>
      </form>
    </div>
  );
}

CheckoutForm = reduxForm({
  form: 'checkout'
})(CheckoutForm);

export default CheckoutForm;
