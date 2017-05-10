import React, { Component, PropTypes } from 'react';
import styles from './ImageCropper.css';
import img from './img.png';
class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerTop: 0,
      containerLeft: 0,
    };

    this.origSrc = new Image();
    this.origSrc.crossOrigin = 'anonymous';
    this.constrain = false;
    this.minWidth = 60;
    this.minHeight = 60;
    this.maxWidth = 800;
    this.maxHeight = 900;
    this.resizeCanvas = document.createElement('canvas');
    this.eventState = {};
    this.initContainerTop = 0;

    this.startResize = this.startResize.bind(this);
    this.endResize = this.endResize.bind(this);
    this.saveEventState = this.saveEventState.bind(this);
    this.resizing = this.resizing.bind(this);
    this.resizeImage = this.resizeImage.bind(this);
    this.startMoving = this.startMoving.bind(this);
    this.endMoving = this.endMoving.bind(this);
    this.moving = this.moving.bind(this);

    this.handleCropButtonClicked = this.handleCropButtonClicked.bind(this);
    this.handleGetCropClicked = this.handleGetCropClicked.bind(this);
  }
  componentDidMount() {
    // this.origSrc.src = this.resizeImageRef.src;
    this.resizeContainerRef.addEventListener('mousedown', this.startResize);
    this.resizeContainerRef.addEventListener('mousedown', this.startMoving);
  }
  componentWillReceiveProps({ resultWidth, resultHeight, inputSrc }) {
    // this.overlayInnerRef.setAttribute('data-height', '100px');
    // console.log(`height: ${nextProps.resultWidth + 4}px`);

    // Nạp hình
    this.origSrc.src = inputSrc;

    document.styleSheets[0].addRule(`.${styles['overlay-inner']}::before`, `height: ${resultHeight + 4}px`);
    document.styleSheets[0].addRule(`.${styles['overlay-inner']}::after`, `height: ${resultHeight + 4}px`);
    document.styleSheets[0].addRule(`.${styles.overlay}::before`, `width: ${resultWidth + 4}px`);
    document.styleSheets[0].addRule(`.${styles.overlay}::after`, `width: ${resultWidth + 4}px`);
    this.setState({
      resultWidth,
      resultHeight,
    });

    const rect = this.resizeContainerRef.getBoundingClientRect();
    this.initContainerTop = rect.top + document.body.scrollTop;
    this.resizeImageOnce = false;
  }
  handleCropButtonClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    const rectOverlay = this.overlayRef.getBoundingClientRect();
    const rectContainer = this.resizeContainerRef.getBoundingClientRect();
    const left = rectOverlay.left - rectContainer.left;
    const top = rectOverlay.top - rectContainer.top;
    // const width = this.overlayRef.offsetWidth;
    // const height = this.overlayRef.offsetHeight;
    const width = this.state.resultWidth;
    const height = this.state.resultHeight;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = width;
    cropCanvas.height = height;


    cropCanvas.getContext('2d').drawImage(this.resizeImageRef, left, top, width, height, 0, 0, width, height);
    // window.open(cropCanvas.toDataURL('image/jpeg'));
    this.outputRef.src = cropCanvas.toDataURL('image/jpeg');
  }
  handleGetCropClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.getResult(e, this.outputRef.src);
  }
  startResize(e) {
    e.preventDefault();
    e.stopPropagation();
    this.saveEventState(e);
    document.addEventListener('mousemove', this.resizing);
    document.addEventListener('mouseup', this.endResize);
  }
  endResize(e) {
    e.preventDefault();
    document.removeEventListener('mouseup', this.endResize);
    document.removeEventListener('mousemove', this.resizing);
  }
  saveEventState(e) {
    // save the initial event details and container state
    this.eventState.containerWidth = this.resizeContainerRef.offsetWidth;
    this.eventState.containerHeight = this.resizeContainerRef.offsetHeight;
    const rect = this.resizeContainerRef.getBoundingClientRect();
    this.eventState.containerLeft = rect.left + document.body.scrollLeft;
    this.eventState.containerTop = rect.top + document.body.scrollTop;

    const leftMinus = this.resizeContainerRef.style.left ? (this.resizeContainerRef.offsetLeft - parseInt(this.resizeContainerRef.style.left.replace('px', ''), 10)) : this.resizeContainerRef.offsetLeft;
    const topMinus = this.resizeContainerRef.style.top ? (this.resizeContainerRef.offsetTop - parseInt(this.resizeContainerRef.style.top.replace('px', ''), 10)) : this.resizeContainerRef.offsetTop;
    // this.eventState.containerLeft -= leftMinus;
    // this.eventState.containerTop -= topMinus;

    this.eventState.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + document.body.scrollLeft;
    this.eventState.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + document.body.scrollTop;

    this.eventState.evnt = e;
  }
  resizing(e) {
    const mouse = {};
    let width = 0;
    let height = 0;
    let left = 0;
    let top = 0;

    mouse.x = (e.clientX || e.pageX) + document.body.scrollLeft;
    mouse.y = (e.clientY || e.pageY) + document.body.scrollTop;

    if (this.hasClass(this.eventState.evnt.target, styles['resize-handle-se'])) {
      // width = mouse.x - this.eventState.containerLeft;
      // height = mouse.y - this.eventState.containerTop;
      left = this.eventState.containerLeft;
      top = this.eventState.containerTop;
      this.endMoving(e);
    } else if (this.hasClass(this.eventState.evnt.target, styles['resize-handle-sw'])) {
      // width = this.eventState.containerWidth - (mouse.x - this.eventState.containerLeft);
      // height = mouse.y - this.eventState.containerTop;
      left = mouse.x;
      top = this.eventState.containerTop;
      this.endMoving(e);
    } else if (this.hasClass(this.eventState.evnt.target, styles['resize-handle-nw'])) {
      // width = this.eventState.containerWidth - (mouse.x - this.eventState.containerLeft);
      // height = this.eventState.containerHeight - (mouse.y - this.eventState.containerTop);
      left = mouse.x;
      top = mouse.y;
      if (this.constrain || e.shiftKey) {
        top = mouse.y - ((width / this.origSrc.width * this.origSrc.height) - height);
      }
      this.endMoving(e);
    } else if (this.hasClass(this.eventState.evnt.target, styles['resize-handle-ne'])) {
      // width = mouse.x - this.eventState.containerLeft;
      // height = this.eventState.containerHeight - (mouse.y - this.eventState.containerTop);
      left = this.eventState.containerLeft;
      top = mouse.y;
      if (this.constrain || e.shiftKey) {
        top = mouse.y - ((width / this.origSrc.width * this.origSrc.height) - height);
      }
      this.endMoving(e);
    }
    if (this.constrain || e.shiftKey) {
      height = width / this.origSrc.width * this.origSrc.height;
    }
    if (width > this.minWidth && height > this.minHeight && width < this.maxWidth && height < this.maxHeight) {
      this.resizeImage(width, height);
    //   this.resizeContainerRef.style.left = left;
    //   this.resizeContainerRef.style.top = top;
      this.setState({
        containerLeft: left,
        containerTop: top,
      });
    }
  }
  resizeImage(width, height) {
    this.resizeCanvas.width = width;
    this.resizeCanvas.height = height;
    this.resizeCanvas.getContext('2d').drawImage(this.origSrc, 0, 0, width, height);
    this.resizeImageRef.setAttribute('src', this.resizeCanvas.toDataURL('image/jpeg'));
  }
  startMoving(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.resizeImageOnce) {
    // resize image first
      this.resizeImage(this.state.resultWidth, this.state.resultWidth / this.origSrc.width * this.origSrc.height);
      this.resizeImageOnce = true;
    }
    this.saveEventState(e);
    document.addEventListener('mousemove', this.moving);
    document.addEventListener('mouseup', this.endMoving);
  }
  endMoving(e) {
    e.preventDefault();
    document.removeEventListener('mousemove', this.moving);
    document.removeEventListener('mouseup', this.endMoving);
  }
  moving(e) {
    const mouse = {};
    e.preventDefault();
    e.stopPropagation();
    mouse.x = (e.clientX || e.pageX) + window.pageXOffset;
    mouse.y = (e.clientY || e.pageY) + window.pageYOffset;
    this.resizeContainerRef.style.left = mouse.x - (this.eventState.mouse_x - this.eventState.containerLeft);
    this.resizeContainerRef.style.top = mouse.y - (this.eventState.mouse_y - this.eventState.containerTop);
    this.setState({
      // containerLeft: mouse.x - (this.eventState.mouse_x - this.eventState.containerLeft),
      containerTop: mouse.y - this.eventState.mouse_y + this.eventState.containerTop - this.initContainerTop,
    });
    // console.log(mouse.x);
    // console.log(this.eventState.mouse_x);
    // console.log(this.eventState.containerLeft);
    // console.log(this.resizeContainerRef.style.left);
    // console.log(this.resizeContainerRef.style);
  }
  hasClass(element, className) {
    return (` ${element.className} `).indexOf(` ${className} `) > -1;
  }
  render() {
    const { inputSrc } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles['crop-wrapper']} style={{ height: this.props.wrapperHeight, width: this.props.wrapperWidth }}>
          <div className={styles.overlay} id="overlay" style={{ width: this.state.resultWidth, height: this.state.resultHeight }}ref={overlayRef => { this.overlayRef = overlayRef; }}>
            <div className={styles['overlay-inner']} ref={overlayInnerRef => { this.overlayInnerRef = overlayInnerRef; }}></div>
          </div>
          <div id="resize-container" className={styles['resize-container']} ref={resizeContainerRef => { this.resizeContainerRef = resizeContainerRef; }} style={{ left: this.state.containerLeft, top: this.state.containerTop }}>
            <span className={`${styles['resize-handle']} ${styles['resize-handle-nw']}`}></span>
            <span className={`${styles['resize-handle']} ${styles['resize-handle-ne']}`}></span>
            <img src={inputSrc} alt="hinh" className={styles['resize-image']} id="resize-image" ref={resizeImageRef => { this.resizeImageRef = resizeImageRef; }} />
            <span className={`${styles['resize-handle']} ${styles['resize-handle-sw']}`}></span>
            <span className={`${styles['resize-handle']} ${styles['resize-handle-se']}`}></span>
          </div>
        </div>
        <div >
          <button onClick={this.handleCropButtonClicked} className={`${styles['btn-crop']} ${styles['js-crop']}`} id="js-crop">Crop this image</button>
          <button onClick={this.handleGetCropClicked} className={`${styles['btn-exit']} ${styles['js-crop']}`} >Get this crop</button>
          <img ref={outputRef => { this.outputRef = outputRef; }} alt="Result" />
        </div>
        <div className={styles.clear}></div>
      </div>
    );
  }
}

ImageCropper.propTypes = {
  inputSrc: PropTypes.string,
  getResult: PropTypes.func,
  wrapperHeight: PropTypes.number,
  wrapperWidth: PropTypes.number,
};

export default ImageCropper;
