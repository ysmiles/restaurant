import React from 'react';
import { Field, reduxForm } from 'redux-form';

function CheckoutForm(props) {
  const { handleSubmit } = props;

  return (
    <div className="CheckoutUserForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="order[name]">Your Address:</label>
          <br />
          (if different from your default address)
          <br />
          <Field name="address" component="input" type="text" />
        </div>

        {/* <div>
          <label htmlFor="order[email]">Your Email:</label>
          <br />
          <Field email="order[email]" component="input" type="email" />
        </div> */}

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
