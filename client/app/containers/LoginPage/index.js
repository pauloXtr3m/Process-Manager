/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoginPage,
  makeSelectAuthenticated,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectAuthFailed, makeSelectAuthFailedMessage
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {Alert, Button, Form, InputGroup, Jumbotron} from "react-bootstrap";
import FormControlIntl from "../../components/FormControlIntl";
import {changeEmail, changePassword, login} from "./actions";
import {Redirect} from "react-router-dom";

const key = 'login';


export function LoginPage({ authFailed, authFailedMessage, authenticated, onChangeEmail, onChangePassword, onLogin}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  if(authenticated){
    return <Redirect to='/' />
  }
  return (
    <div>
      <Jumbotron>
        <h1><FormattedMessage {...messages.presentationTitle} /></h1>
        <p>
          <FormattedMessage {...messages.presentationDetail} />
        </p>
      </Jumbotron>

      <Alert show={authFailed} variant='danger'>
        {authFailedMessage}
      </Alert>

        <label><FormattedMessage {...messages.emailLabel} /></label>
        <InputGroup>
          <FormControlIntl type="email" onChange={onChangeEmail} details={messages.emailDescription}/>
        </InputGroup>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>

        <label><FormattedMessage {...messages.passwordLabel} /></label>
        <InputGroup>
          <FormControlIntl type="password" details={messages.passwordDescription}
                           onChange={onChangePassword}/>
        </InputGroup>
        <InputGroup>
          <Button style={{margin: 16}} variant="primary" type="submit" onClick={onLogin}>
            <FormattedMessage {...messages.submitButton} />
          </Button>
        </InputGroup>
    </div>
  );
}

LoginPage.propTypes = {
  authFailed: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  authFailed: makeSelectAuthFailed(),
  authFailedMessage: makeSelectAuthFailedMessage(),
  authenticated: makeSelectAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => {
      if(evt && evt.target)
        return dispatch(changeEmail(evt.target.value))
    },
    onChangePassword: evt => {
      if(evt && evt.target)
        return dispatch(changePassword(evt.target.value))
    },
    onLogin: () => dispatch(login()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
