import React from 'react';



class AlbumShowItem extends React.Component {
    constructor(props) {
        super(props); 

        
    }


    componentDidMount() {
        this.props.fetchUser(this.props.album.artist_id).then((res) => {
                if(document.readyState === 'complete') {
                    let li = document.querySelector('.album-header-img');

                    li.style.background = `url(${res['user'].photo}) no-repeat 50%`;
                    li.backgroundSize = 'contain';
                 
                }     
        }); 
    }


    render() {
        
       return( <React.Fragment>
                    <li>

                    </li>
        </React.Fragment>)
    }

}

export default AlbumShowItem;