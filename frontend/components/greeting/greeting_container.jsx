import {connect } from 'react-redux'
import React from 'react'
import { signout, login } from '../../actions/session_actions';
import GreetingIndex from './greeting_index';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStoreToProps = (store, props) => {
    return {
        currentUser: store.entities.users[store.session.id]
    };
};

const mapActionsToProps = (dispatch, props) => {
    return {
      signout: () => dispatch(signout()),
      openModal: modal => dispatch(openModal(modal)),
      closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStoreToProps, mapActionsToProps)(GreetingIndex);