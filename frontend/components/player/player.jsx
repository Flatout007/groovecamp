import React from 'react';
import {withRouter} from 'react-router-dom';
import SongIndexItem from '../song/song_index_item';



class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {playing: false,  trackSwitch: false, percent: 0, mousedown: null, current: '00:00' };
        this.audio = null;

        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handleAudioSelection = this.handleAudioSelection.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleSeekBar = this.handleSeekBar.bind(this);
        this.handleSrcubbing = this.handleSrcubbing.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
       
    }


    handleFilterSongsById() {
        return this.props.songs.filter(ele => { return (parseFloat(ele.album_id) === parseFloat(this.props.match.params.id)) });

    }


    handleUserSongs() {
        return this.handleFilterSongsById().map((ele, idx, arr) => {
            return <SongIndexItem
               key={ele.id}
               songs={arr}
               song={ele}
               playing={this.state.playing}
               requestUser={this.props.requestUser}
               artist={this.props.artist}
               handlePlay={this.handlePlayPause.bind(this)}
            //    requestAllUsers={this.props.requestAllUsers}
            />
        }); 
    }

    handleTitle() {
        let songTitle = document.querySelector('.song-info__title');
        let audio = document.querySelector('.audio');
        let source = audio.querySelector('source');
        let title = source.src.split('/')[source.src.split('/').length - 1];

        songTitle.innerHTML = decodeURI(title.replace('.mp3', ''))
        
        // console.log(decodeURI(title.replace('.mp3', '')));

    }

    handleUserFiles() {
        return this.handleFilterSongsById();
  
    }

    
    handleAudioSelection() {
       let audio = document.querySelector('.audio');
       return audio;
    }


    handlePlayPause() {
        this.audio = this.handleAudioSelection();
        let source = this.audio.querySelector('source');
        const action = this.audio.paused ? 'play' : 'pause';
        this.setState({playing: this.audio.paused ? true : false});
        this.audio[action]();
    }
    

    handleDuration() {
        let d = document.querySelector('.audio');
        let p = document.querySelector('.duration');
        if(d.duration !== null) p.innerHTML = this.handleDurationConversion(d.duration);
    }


    handleBack() {
        this.audio = this.handleAudioSelection();
        let audioSource = this.audio.querySelector('source');
        const currentTrackId = parseInt(audioSource.dataset.trackid);
        const prevTrackId = currentTrackId <= 0 ? (0).toString() : (currentTrackId - 1).toString();
        const prevTrack = this.handleUserFiles()[prevTrackId];
        this.handleTrackChange(prevTrack);
    }


    handleNext() {
        this.audio = this.handleAudioSelection();
        let audioSource = this.audio.querySelector('source');
        const currentTrackId = parseInt(audioSource.dataset.trackid);
        const nextTrackId = currentTrackId === this.handleUserFiles().length - 1 || this.handleUserFiles().length === 1 ? '0' : (currentTrackId + 1).toString();
        const nextTrack = this.handleUserFiles()[nextTrackId];
        this.handleTrackChange(nextTrack);
    }


    handleTrackChange(track) {
        if(this.state.playing) this.setState({trackSwitch: true});
        this.audio = this.handleAudioSelection();
        let audioSource = this.audio.querySelector('source');
        audioSource.setAttribute('src', track.audioUrl);
        audioSource.dataset.trackid = this.handleUserFiles().indexOf(track);
        this.audio.load();


        if(this.state.playing) this.audio.play();
    }


    handleDurationConversion(seconds) {
        this.handleTitle();
        let sec = Math.floor(seconds);
        let min = Math.floor(sec / 60);

        
        min = min >= 10 ? min : `0${min}`;
        sec = Math.floor(sec % 60);
        sec = sec >= 10 ? sec : `0${sec}`;
        return `${min}:${sec}`;
    }


    handleSrcubbing(e) {
        this.audio = this.handleAudioSelection();
        let progress = document.querySelector('.progress');
        const scrubTime = (e.nativeEvent.offsetX / progress.offsetWidth) * this.audio.duration;
        this.audio.currentTime = scrubTime;
       
    }


    handleSeekBar(e) {
        e.preventDefault();
        e.stopPropagation()
        this.progressBar = document.querySelector('.progress__filled');
        let audio = this.handleAudioSelection();
        this.setState({percent: (audio.currentTime / audio.duration) * 100});
        this.progressBar.style.flexBasis = `${this.state.percent}%`;
        this.setState({ current: this.handleDurationConversion(audio.currentTime)});
       
        
        if( audio.currentTime === audio.duration && this.props.songs.length > 1) {       
            this.setState({trackSwitch: true});
            this.handleNext();
        } else if (audio.currentTime === audio.duration && this.props.songs.length <= 1) {
            Promise.resolve(this.setState({ current: `0:00` })).then(this.setState({ playing: false })).then(this.setState({ percent: 0 }));
            this.progressBar.style.flexBasis = `0%`;
            
        }
    }


    // handleArrowsOnFirstSong() {
      
    // }


    render() {
        if(!this.handleUserFiles()[0]) return null;
        if(!this.props.songs[0]) return null;
        // if (!this.props.songs[0]) return null;
        

        return(
            <div className="player">
                        <audio onLoadedMetadata={this.handleDuration} preload='metadata' onTimeUpdate={this.handleSeekBar} className="player__audio audio viewer">
                                    <source src={this.handleUserFiles()[0].audioUrl} type="audio/mpeg" data-trackid="0"/>
                        </audio>
            <div className='song-stats'>
                        <p className="song-info__title">{this.handleUserFiles()[0].title}</p> &nbsp;

                        {this.state.playing === false && this.state.percent === 0 ? <p className='current'>00:00</p> : <p className='current'>{this.state.current}</p>} &nbsp;
                        
                        <p className='slash'>/</p> &nbsp;
                        <p className="duration">0:30</p>       
            </div>
            <div        onMouseDown={() => this.setState({ mousedown: true })} 
                        onMouseUp={() => this.setState({ mousedown: false })}
                        onMouseLeave={() => this.setState({ mousedown: false})}
                        onMouseMove={(e) => this.state.mousedown ? this.handleSrcubbing(e) : null}
                        className="progress">
                        <div className="progress__filled"></div>
                        <a className='thumb'></a>
            </div>
                        <div className="player-controls">
                                    <div onClick={this.handlePlayPause} className="play-container">
                                                {this.state.playing === true ? <li className="pause-button"></li> : <li className='play'></li>}
                                    </div>  
                   
                                    {/* {this.handleArrowsOnFirstSong()} */}
                                    <li onClick={this.handleBack} className='backward rotate-right'></li>
                                    <li onClick={this.handleNext} className='forward'></li>
                                    {/* <div onClick={this.handleBack} className="backward"><p>╹</p><p>◀</p><p>◀</p></div>
                                    <div onClick={this.handleNext} className="forward rotate-right"><p>╹</p><p>◀</p><p>◀</p></div> */}
                            
                        </div>
                        <div className='songs'>
                            <ol>
                                
                            {this.handleUserSongs()}

                            </ol>
                        </div>
            
            </div>)
                
            

    }
    
}

export default withRouter(Player);



