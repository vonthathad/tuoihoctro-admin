import React, { Component, PropTypes } from 'react';
import styles from './VideoScreenShotter.css';
class VideoScreenShotter extends Component {
  constructor(props) {
    super(props);
    this.snap = this.snap.bind(this);
    this.getThisShot = this.getThisShot.bind(this);
  }
  componentDidMount() {
    this.videoRef.addEventListener('loadedmetadata', () => {
      const ratio = this.videoRef.videoWidth / this.videoRef.videoHeight;
      const w = this.videoRef.videoWidth - 100;
      const h = parseInt(w / ratio, 10);
      this.outputRef.width = w;
      this.outputRef.height = h;
    });
  }
  getThisShot(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.getResult(e, this.outputRef.src);
  }
  snap(e) {
    e.preventDefault();
    e.stopPropagation();
    // const context = this.canvasRef.getContext('2d');
    // context.fillRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    // context.drawImage(this.videoRef, 0, 0, this.canvasRef.width, this.canvasRef.height);

    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = this.outputRef.width;
    cropCanvas.height = this.outputRef.height;


    cropCanvas.getContext('2d').drawImage(this.videoRef, 0, 0, this.outputRef.width, this.outputRef.height);
    // window.open(cropCanvas.toDataURL('image/jpeg'));
    this.outputRef.src = cropCanvas.toDataURL('image/jpeg');
  }
  render() {
    const { inputSrc, anonymous } = this.props;
    return (
      <div>
        {/* <canvas crossOrigin="anonymous" ref={canvasRef => { this.canvasRef = canvasRef; }}></canvas>*/}
        <img crossOrigin={anonymous ? 'anonymous' : ''} ref={outputRef => { this.outputRef = outputRef; }} alt="Result" />
        {anonymous ?
          <video loop controls crossOrigin="anonymous" ref={videoRef => { this.videoRef = videoRef; }} src={inputSrc} type="video/mp4" >
          </video>
        :
          <video loop controls ref={videoRef => { this.videoRef = videoRef; }} src={inputSrc} type="video/mp4">
          </video>
        }
        <button onClick={this.snap}>Take screen shot</button>
        <button onClick={this.getThisShot}>Get this shot</button>
      </div>
    );
  }
}

VideoScreenShotter.propTypes = {
  getResult: PropTypes.func,
  inputSrc: PropTypes.string,
  anonymous: PropTypes.boolean,
};

export default VideoScreenShotter;
