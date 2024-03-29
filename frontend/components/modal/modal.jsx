import React from 'react';
import { closeModal, openModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session_form/login_container';
import SignupFormContainer from '../session_form/signup_container';
import {login} from '../../actions/session_actions';


import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

 function Modal({ modal, closeModal, openModal, boolean, signin }){
    let component;
    
    // switches on string argument that's put into the `openModal(case)` function
    switch (modal) {
        case 'signup-modal':
            component = 
                <React.Fragment>
            
                 <div className='modal-header'>Welcome to groovecamp</div>
                    <div className='sign-up-modal'>
                      <div className='modal-form-div'>
                        <form className='modal-form'>
                          <ul>
                                <li className='flex-item'>
                                    <div className='icon-1'></div>
                
                                    <div>
                                        <a className='signup-fan-button' onClick={() => openModal('signup-user')}>Sign up as a fan</a>
                                        <div className='fan-account-text'>
                                            Sign up as a fan
                                            Follow your favorite artists, keep a wishlist, get instant streaming of your purchases, showcase your collection, and explore the music of like-minded fans</div>
                                   </div>
                                </li>

                                <li className='flex-item'>
                                    <div className='icon-2'></div>

                                    <div>
                                        <a className=' signup-fan-button signup-artist-button' onClick={() => openModal('signup-artist')}>Sign up as a artist</a>
                                        <div className='fan-account-text'>Sell directly to your fans with total control over your music and pricing. Easy access to your customers’ data, real-time stats, music chart reporting, and more.</div>
                                    </div>
                                </li>

                                <li className='flex-item'>
                                    <div className='icon-3'></div>

                                    <div>
                                        <a className='signup-fan-button signup-demo-button' onClick={() => signin({ username: "Motohiro Hata", password: '123456'}).then(closeModal)}>Curious? Try a demo</a>
                                        <div className='fan-account-text'>Curious? Try a demo of the site. You can listen to hours of music, see all of groovecamps bands and artist, and much much more.</div>
                                    </div>
                                </li>
                          </ul>
                      </form>
                    </div>
                 </div>
               
            </React.Fragment>
            break;
        case 'login':
            component = <LoginFormContainer />;
            break;
        case 'signup-user':
            component = <SignupFormContainer artist_check={false}/>; // pass in prop to form artist check: false for user, 
            break;
        case 'signup-artist':
            component = <SignupFormContainer artist_check={true} />; // pass in prop to form artist check: true for artist, 
            break;    
        default:
            return null;
    }
     
    return (
        
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        openModal: (action) => dispatch(openModal(action)),
        signin: (user) => dispatch(login(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
