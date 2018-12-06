import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <div>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Area</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option />
            <option value="SJ">San Jose</option>
            <option value="SF">San Francisco</option>
            <option value="LA">Los Angeles </option>
          </Field>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Register
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
        <Link to="/login" style={{ float: 'right', padding: '15px' }}>
          Go back to login
        </Link>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple' // a unique identifier for this form
})(SimpleForm);
