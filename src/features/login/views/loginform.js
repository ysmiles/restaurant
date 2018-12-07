import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Login ID</label>
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
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
        <Link to="/register" style={{ float: 'right', padding: '15px' }}>
          Register
        </Link>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'loginform'
})(LoginForm);
