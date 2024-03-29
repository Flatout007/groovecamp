import React from 'react';
import { connect } from 'react-redux';
import AlbumIndex from './album_index';
import { requestAlbums } from '../../actions/album_actions';
import { deleteAlbum } from '../../actions/album_actions';
import {requestUser} from '../../actions/session_actions';
 
/*
Export a container component for `AlbumIndex` that maps an array of all
users from the store as an `users` prop. Additionally, it should map in
functions that will dispatch `requestAllUsers` and any other actions to the store as
props of the same name.
*/

const mapStoreToProps = (store, props) => {
    return {
        albums: Object.values(store.entities.albums),
        users: Object.values(store.entities.users)
    };
};

const mapActionsToProps = (dispatch, props) => {
    return {
        requestAlbums: () => dispatch(requestAlbums()),
        deleteAlbum: (albumId) => dispatch(deleteAlbum(albumId)),
        requestUser: (artistId) => dispatch(requestUser(artistId))
    };
};

export default connect(mapStoreToProps, mapActionsToProps)(AlbumIndex);
