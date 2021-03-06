import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { loadPost, createPost, editPost, removePost, turnOffError, turnOffMessage, _gif2mp4 } from '../../redux/modules/postDetail';
import FieldGroup from '../../components/FieldGroup/FieldGroup';
import Button from 'react-bootstrap/lib/Button';
import styles from './PostDetail.css';
import ImageCropper from '../../components/ImageCropper/ImageCropper';
import VideoScreenShotter from '../../components/VideoScreenShotter/VideoScreenShotter';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Radio from 'react-bootstrap/lib/Radio';
import Table from 'react-bootstrap/lib/Table';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        _id: '',
        title: '',
        type: '',
        mediaSrc: '',
        thumbSrc: '',
        recommendSrc: '',
        publish: true,
        created: '',
        cate: 0,
      },
      // khai báo base url
      baseUrl: window.location.hostname === 'localhost' ? 'http://localhost:4000/posts_data/' : 'http://tuoihoctro.co/posts_data/',
      // baseUrl: 'http://tuoihoctro.co/posts_data/',
      imageHeight: 0,
      imageWidth: 0,
      mediaWarning: '',
      cropperThumbTurnedOn: false,
      cropperRecommendTurnedOn: false,
    };
    // lắng nghe các hành động
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleCateChange = this.handleCateChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);

    this.handleThumbCreated = this.handleThumbCreated.bind(this);
    this.handleRecommendCreated = this.handleRecommendCreated.bind(this);
    this.handleExitCropClick = this.handleExitCropClick.bind(this);

    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);

    this.turnOnThumbCropper = this.turnOnThumbCropper.bind(this);
    this.turnOnRecommendCropper = this.turnOnRecommendCropper.bind(this);

    // gọi api để load post
    this.props.params.postId && this.props.loadPost([this.props.params.postId]);
    // đặt tên button là rỗng
    this.clickedButton = '';
  }
  componentWillReceiveProps(nextProps, nextState) {
    const { data, error, message, mp464 } = nextProps.postDetail;
    // kiểm tra lỗi, nếu có lỗi thì in lỗi
    if (error !== '') {
      alert(error);
      this.props.turnOffError();
    }
    // kiểm tha thông báo, nếu có thông báo thì in thông báo
    if (message !== '') {
      alert(message);
      this.props.turnOffMessage();
      switch (this.clickedButton) {
        case 'create': browserHistory.push(`/posts/${data._id}`); break;
        case 'delete': browserHistory.push('/posts'); break;
        case 'edit': location.reload(); break;
        default: break;
      }
    }
    // console.log(data);
    // kiểm tra xem có load lại data của post không
    if (this.props.params.postId && this.props.postDetail.post !== data) {
      // console.log(data.cate);
      this.setState({
        post: {
          ...data,
          mediaSrc: mp464 !== '' ? mp464 : data.mediaSrc,
          type: mp464 !== '' ? 1 : data.type,
          cate: data.cate ? data.cate : 0,
        },
      });
      // kiemr tra xem có load giftomp4 ở server phản hồi lại không
    } else if (mp464 !== this.state.post.mediaSrc) {
      this.setState({
        post: {
          ...this.state.post,
          mediaSrc: mp464 !== '' ? mp464 : data.mediaSrc,
          type: mp464 !== '' ? 1 : data.type,
        },
      });
    }
  }
  shouldComponentUpdate(nextProps) {
    // if (nextProps.postDetail.processing !== this.state.processing) {
    //   this.setState({ processing: nextProps.postDetail.processing });
    // }
    return true;
  }
  handleOptionChange(e) {
    const publish = e.target.value === 'true';
    this.setState({
      post: {
        ...this.state.post,
        publish,
      },
    });
  }
  handleDeleteButtonClick(e) {
    e.preventDefault();
    this.props.removePost([this.props.params.postId]);
    this.clickedButton = 'delete';
  }
  handleEditButtonClick(e) {
    e.preventDefault();
    this.props.editPost([this.props.params.postId], this.state.post);
    // console.log(this.state.post);
    this.clickedButton = 'edit';
  }
  handleCreateButtonClick(e) {
    e.preventDefault();
    this.props.createPost(this.state.post);
    this.clickedButton = 'create';
  }
  handleThumbCreated(e, thumbSrc) {
    e.preventDefault();
    e.stopPropagation();
    // console.log(thumbSrc);
    // this.setState({
    //   cropperTurnedOn: false,
    //   thumbSrc,
    // });
    this.setState({
      post: {
        ...this.state.post,
        thumbSrc,
      },
      cropperThumbTurnedOn: false,
    });
  }
  handleRecommendCreated(e, recommendSrc) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      post: {
        ...this.state.post,
        recommendSrc,
      },
      cropperRecommendTurnedOn: false,
    });
  }
  handleExitCropClick(e) {
    e.preventDefault();
    this.setState({
      cropperTurnedOn: false,
    });
  }
  turnOnThumbCropper(e) {
    e.preventDefault();
    this.setState({
      cropperThumbTurnedOn: true,
    });
  }
  turnOnRecommendCropper(e) {
    e.preventDefault();
    this.setState({
      cropperRecommendTurnedOn: true,
    });
  }
  handleTitleChange(e) {
    e.preventDefault();
    this.setState({
      post: {
        ...this.state.post,
        title: e.target.value,
      },
    });
  }
  handleMediaChange(e) {
    e.preventDefault();
    const input = e.target;
    // kiểm tra xem có upload media lên browser chưa
    if (input.value === '') {
      // alert('Upload hình');
    } else {
      // nếu có thì set lại toàn bộ state thành rỗng
      this.setState({
        post: {
          ...this.state.post,
          thumbSrc: 'empty',
          recommendSrc: 'empty',
        },
      });
      // kiểm tra loại file đã up lên
      const extension = input.value.substring(
        input.value.lastIndexOf('.') + 1).toLowerCase();
      if (extension === 'png' || extension === 'jpg') {
        // xử lý file photo
        if (input.files && input.files[0]) {
          if (input.files[0].size > 10000000) {
            // alert('File size quá lớn');
            this.setState({
              post: {
                ...this.state.post,
                mediaSrc: '',
              },
              mediaWarning: 'File size quá lớn',
            });
          } else {
            const reader = new FileReader();
            reader.onload = (e1) => {
              const img = new Image();
              img.src = e1.target.result;
              img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                console.log(width);
                if (width >= 460) {
                  // resize image
                  const cropCanvas = document.createElement('canvas');
                  const mediaHeight = 600 / width * height;
                  const mediaWidth = 600;
                  cropCanvas.width = mediaWidth;
                  cropCanvas.height = mediaHeight;
                  const tempImg = new Image();
                  tempImg.src = e1.target.result;
                  cropCanvas.getContext('2d').drawImage(tempImg, 0, 0, mediaWidth, mediaHeight);
                  this.setState({
                    post: {
                      ...this.state.post,
                      // mediaSrc: e1.target.result,
                      mediaSrc: cropCanvas.toDataURL('image/jpeg'),
                    },
                    mediaWarning: '',
                  });
                  if (height / width > 3) {
                    this.setState({
                      post: {
                        ...this.state.post,
                        // list number
                        type: 2,
                      },
                    });
                  } else {
                    const thumbHeight = 500 / width * height;
                    const thumbWidth = 500;
                    cropCanvas.width = thumbWidth;
                    cropCanvas.height = thumbHeight;
                    cropCanvas.getContext('2d').drawImage(tempImg, 0, 0, thumbWidth, thumbHeight);
                    this.setState({
                      post: {
                        ...this.state.post,
                        thumbSrc: cropCanvas.toDataURL('image/jpeg'),
                        // photo number
                        type: 0,
                      },
                    });
                  }
                } else {
                  this.setState({
                    post: {
                      ...this.state.post,
                      mediaSrc: '',
                    },
                    mediaWarning: 'Chiều rộng phải lớn hơn 600.',
                  });
                }
              };
            };
            reader.readAsDataURL(input.files[0]);
          }
        }
        // xử lý mp4
      } else if (extension === 'mp4') {
        if (input.files && input.files[0]) {
          if (input.files[0].size > 10000000) {
            this.setState({
              post: {
                ...this.state.post,
                mediaSrc: '',
              },
              mediaWarning: 'File size quá lớn',
            });
          } else {
            const reader = new FileReader();
            reader.onload = (e1) => {
              this.setState({
                post: {
                  ...this.state.post,
                  mediaSrc: e1.target.result,
                  // gif number
                  type: 1,
                },
                mediaWarning: '',
              });
            };
            reader.readAsDataURL(input.files[0]);
          }
        }
        // xử lý gif
      } else if (extension === 'gif') {
        if (input.files && input.files[0]) {
          if (input.files[0].size > 10000000) {
            this.setState({
              post: {
                ...this.state.post,
                mediaSrc: '',
              },
              mediaWarning: 'File size quá lớn',
            });
          } else {
            const reader = new FileReader();
            reader.onload = (e1) => {
              // console.log(e1.target.result);
              this.props._gif2mp4({ gif64: e1.target.result });
            };
            reader.readAsDataURL(input.files[0]);
          }
        }
        // xử lý upload sai định dạng
      } else {
        // alert('Upload file sai định dạng');
        this.setState({
          post: {
            ...this.state.post,
            mediaSrc: '',
          },
          mediaWarning: 'Upload file định dạng chỉ được png hoặc jpg hoặc gif hoặc mp4',
        });
        input.value = '';
      }
    }
  }
  handleCateChange(e) {
    e.preventDefault();
    this.setState({
      post: {
        ...this.state.post,
        cate: e.target.value,
      },
    });
  }


  render() {
    const { post } = this.state;
    const { processing } = this.props.postDetail;
    // tuyển kiểu từ số sang chữ
    let typeName;
    switch (parseInt(post.type, 10)) {
      case 0: typeName = 'photo'; break;
      case 1: typeName = 'gif'; break;
      case 2: typeName = 'list'; break;
      default: break;
    }
    return (
      <div className={`${styles.formWrapper}`}>
        <form>
          <FieldGroup
            id="Title"
            type="text"
            label="Title"
            placeholder="Enter title"
            value={post.title}
            onChange={this.handleTitleChange}
          />
          <FieldGroup
            id="Media"
            type="file"
            label="Media File"
            onChange={this.handleMediaChange}
            help={'Only accept jpg, png width > 600, or mp4 or gif'}
          />
          {this.state.mediaWarning.length > 0 &&
            <div className="alert alert-warning">
              {this.state.mediaWarning}
            </div>
          }
          <FieldGroup
            id="Type"
            type="text"
            label="Type"
            placeholder="Type"
            value={typeName}
            disabled
          />
          <div>
            <label htmlFor="">Media </label>
            {
              post.type === 1 ?
                <video loop controls type="video/mp4" src={this.state.post.mediaSrc ? this.state.post.mediaSrc : `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_m.mp4`} > </video>
                :
                <img src={this.state.post.mediaSrc ? this.state.post.mediaSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_m.jpeg`} alt="" />
            }
          </div>
          {
            post.type === 1 ?
              <div>
                <div>
                  <label htmlFor="">Thumb </label>
                  <img src={this.state.post.thumbSrc ? this.state.post.thumbSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_t.jpeg`} alt="" />
                  <button onClick={this.turnOnThumbCropper}>Screenshot video to thumb</button>
                  <div style={{ display: this.state.cropperThumbTurnedOn ? 'block' : 'none' }}>
                    <VideoScreenShotter
                      inputSrc={this.state.post.mediaSrc ? this.state.post.mediaSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_m.mp4`}
                      getResult={this.handleThumbCreated}
                      anonymous={!this.state.post.mediaSrc && this.state.post.mediaSrc !== ''}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="">Recommend </label>
                  <img src={this.state.post.recommendSrc ? this.state.post.recommendSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_r.jpeg`} alt="" />
                  <button onClick={this.turnOnRecommendCropper}>Crop thumb to recommend</button>
                  <div style={{ display: this.state.cropperRecommendTurnedOn ? 'block' : 'none' }}>
                    <ImageCropper
                      wrapperWidth={300}
                      wrapperHeight={157}
                      resultWidth={300}
                      resultHeight={157}
                      inputSrc={this.state.post.thumbSrc !== '' ? this.state.post.thumbSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_t.jpeg`}
                      getResult={this.handleRecommendCreated}
                    />
                  </div>
                </div>
              </div>
              :
              <div>
                <div>
                  <label htmlFor="">Thumb </label>
                  <img src={this.state.post.thumbSrc ? this.state.post.thumbSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_t.jpeg`} alt="" />
                  {
                    post.type === 2 && <button onClick={this.turnOnThumbCropper}>Crop image to thumb</button>
                  }
                  <div style={{ display: this.state.cropperThumbTurnedOn ? 'block' : 'none' }}>
                    <ImageCropper
                      wrapperWidth={460}
                      wrapperHeight={300}
                      resultWidth={460}
                      resultHeight={300}
                      inputSrc={this.state.post.mediaSrc ? this.state.post.mediaSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_m.jpeg`}
                      getResult={this.handleThumbCreated}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="">Recommend </label>
                  <img src={this.state.post.recommendSrc ? this.state.post.recommendSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_r.jpeg`} alt="" />
                  <button onClick={this.turnOnRecommendCropper}>Crop image to recommend</button>
                  <div style={{ display: this.state.cropperRecommendTurnedOn ? 'block' : 'none' }}>
                    <ImageCropper
                      wrapperWidth={300}
                      wrapperHeight={157}
                      resultWidth={300}
                      resultHeight={157}
                      inputSrc={this.state.post.mediaSrc ? this.state.post.mediaSrc : this.props.params.postId && `${this.state.baseUrl}${this.props.params.postId}/${this.props.params.postId}_m.jpeg`}
                      getResult={this.handleRecommendCreated}
                    />
                  </div>
                </div>
              </div>
          }
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Catergories</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.post.cate} onChange={this.handleCateChange}>
              <option value="0">Hài hước</option>
              <option value="1">Boys & girls</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <Radio name="radioGroup" inline checked={this.state.post.publish === true} onChange={this.handleOptionChange} value="true">
              Publish
            </Radio>
            {' '}
            <Radio name="radioGroup" inline checked={this.state.post.publish === false} onChange={this.handleOptionChange} value="false">
              Unpublish
            </Radio>
          </FormGroup>
          <div className={styles['buttons-wrapper']}>
            {this.props.params.postId ?
              <div>
                <Button bsStyle="warning" type="submit" onClick={this.handleEditButtonClick}>
                  Sửa
                </Button>
                <Button bsStyle="danger" type="submit" onClick={this.handleDeleteButtonClick}>
                  Xóa
                </Button>
              </div>
              :
              <Button bsStyle="default" type="submit" onClick={this.handleCreateButtonClick}>
                Tạo mới
              </Button>
            }
            <Link className="btn btn-default" to="/posts">
              Quay lại
            </Link>
          </div>
        </form>
        <div className={styles.processing} style={{ display: processing ? 'block' : 'none' }}>
          <div className={styles.loader}></div>
        </div>
      </div>
    );
  }
}

PostDetail.propTypes = {
  postDetail: PropTypes.object,
  loadPost: PropTypes.func,
  createPost: PropTypes.func,
  editPost: PropTypes.func,
  removePost: PropTypes.func,
  _gif2mp4: PropTypes.func,
  turnOffError: PropTypes.func,
  turnOffMessage: PropTypes.func,
  params: PropTypes.object,
  processing: PropTypes.bool,
};
function mapDispatchToProps(dispatch) {
  return {
    loadPost: (query) => dispatch(loadPost(query)),
    createPost: (input) => dispatch(createPost(input)),
    editPost: (id, input) => dispatch(editPost(id, input)),
    removePost: (id) => dispatch(removePost(id)),
    _gif2mp4: (gif64) => dispatch(_gif2mp4(gif64)),
    turnOffError: () => dispatch(turnOffError()),
    turnOffMessage: () => dispatch(turnOffMessage()),
  };
}
function mapStateToProps(store) {
  return {
    postDetail: store.postDetail,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
