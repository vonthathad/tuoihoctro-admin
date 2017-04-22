import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadGame, createGame, editGame, removeGame } from '../../redux/modules/gameDetail';
import FieldGroup from '../../components/FieldGroup/FieldGroup';
import Button from 'react-bootstrap/lib/Button';
import styles from './GameDetail.css';
import ImageCropper from '../../components/ImageCropper/ImageCropper';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Radio from 'react-bootstrap/lib/Radio';
import Table from 'react-bootstrap/lib/Table';

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        _id: '',
        title: '',
        adsImage: '',
        imageSrc: '',
        playsCount: 0,
        sharesCount: 0,
        viewsCount: 0,
        des: '',
        color: '',
        results: [],
        publish: false,
      },
      zip: '',
      imageWarning: '',
      cropperTurnedOn: false,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleThumbImageChange = this.handleThumbImageChange.bind(this);
    // this.handlePlaysCountChange = this.handlePlaysCountChange.bind(this);
    // this.handleSharesCountChange = this.handleSharesCountChange.bind(this);
    // this.handleViewsCountChange = this.handleViewsCountChange.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleResultImagesChange = this.handleResultImagesChange.bind(this);
    this.handleResultTitlesChange = this.handleResultTitlesChange.bind(this);
    this.handleResultDessChange = this.handleResultDessChange.bind(this);
    this.handleResultScoresChange = this.handleResultScoresChange.bind(this);
    this.handleResultDelete = this.handleResultDelete.bind(this);

    this.handleCropButtonClick = this.handleCropButtonClick.bind(this);
    this.handleExitCropClick = this.handleExitCropClick.bind(this);
    this.handleZipFileChange = this.handleZipFileChange.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleAddResultButtonClick = this.handleAddResultButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);

    this.turnOnCropper = this.turnOnCropper.bind(this);
    this.props.params.gameId && this.props.loadGame([this.props.params.gameId]);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      game: {
        ...nextProps.gameDetail.game,
        imageSrc: nextProps.gameDetail.game ? `http://www.hotgame.co/${nextProps.gameDetail.game.adsImage}` : '',
      },
    });
    // console.log(nextProps.gameDetail.game.publish);
  }
  // shouldComponentUpdate(nextProps) {
  //   if (this.state._id === nextProps.gameDetail.game._id) return false;
  //   return true;
  // }
  handleDeleteButtonClick(e) {
    e.preventDefault();
    this.props.removeGame([this.state.game._id]);
  }
  handleResultDelete(e, index) {
    e.preventDefault();
    const results = this.state.game.results;
    results.splice(index, 1);
    this.setState({
      game: {
        ...this.state.game,
        results,
      },
    });
  }
  handleResultTitlesChange(e, index) {
    e.preventDefault();
    this.state.game.results[index].title = e.target.value;
    const results = this.state.game.results;
    this.setState({
      game: {
        ...this.state.game,
        results,
      },
    });
  }
  handleResultDessChange(e, index) {
    e.preventDefault();
    this.state.game.results[index].des = e.target.value;
    const results = this.state.game.results;
    this.setState({
      game: {
        ...this.state.game,
        results,
      },
    });
  }
  handleResultScoresChange(e, index) {
    e.preventDefault();
    this.state.game.results[index].score = e.target.value;
    const results = this.state.game.results;
    this.setState({
      game: {
        ...this.state.game,
        results,
      },
    });
  }
  handleAddResultButtonClick(e) {
    e.preventDefault();
    const result = {
      title: '',
      des: '',
      score: '',
      image: '',
    };
    const results = this.state.game.results;
    results.push(result);
    this.setState({
      game: {
        ...this.state.game,
        results,
      },
    });
  }
  handleEditButtonClick(e) {
    e.preventDefault();
    const input = new FormData();
    this.state.zip && input.append('zip', this.state.zip);
    input.append('game', JSON.stringify(this.state.game));
    this.props.editGame([this.state.game._id], input);
  }
  handleCreateButtonClick(e) {
    e.preventDefault();
    // console.log(this.state.game);
    // console.log(JSON.stringify(this.state.game));
    const input = new FormData();
    input.append('zip', this.state.zip);
    input.append('game', JSON.stringify(this.state.game));
    this.props.createGame(input);
    // console.log(input);
  }
  handleZipFileChange(e) {
    e.preventDefault();
    const input = e.target;
    if (input.files && input.files[0]) {
      this.setState({
        zip: input.files[0],
      });
    }
  }
  handleCropButtonClick(e, imageSrc) {
    e.preventDefault();
    // console.log(imageSrc);
    this.setState({
      cropperTurnedOn: false,
      imageSrc,
    });
  }
  handleExitCropClick(e) {
    e.preventDefault();
    this.setState({
      cropperTurnedOn: false,
    });
  }
  turnOnCropper(e) {
    e.preventDefault();
    this.setState({
      cropperTurnedOn: true,
    });
  }
  handleTitleChange(e) {
    e.preventDefault();
    this.setState({
      game: {
        ...this.state.game,
        title: e.target.value,
      },
    });
  }
  handleThumbImageChange(e) {
    e.preventDefault();
    const input = e.target;
    if (input.value === '') {
      // alert('Upload hình');
    } else {
      const extension = input.value.substring(
                    input.value.lastIndexOf('.') + 1).toLowerCase();
      if (extension === 'png' || extension === 'jpg') {
        if (input.files && input.files[0]) {
          if (input.files[0].size > 10000000) {
            // alert('File size quá lớn');
            this.setState({
              game: {
                ...this.state.game,
                imageSrc: '',
              },
              imageWarning: 'File size quá lớn',
            });
          } else {
            const reader = new FileReader();
            reader.onload = (e1) => {
              const img = new Image();
              img.src = e1.target.result;
              img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                if (width === 960 && height === 500) {
                  this.setState({
                    game: {
                      ...this.state.game,
                      imageSrc: e1.target.result,
                    },
                    imageWarning: '',
                  });
                } else {
                  this.setState({
                    game: {
                      ...this.state.game,
                      imageSrc: '',
                    },
                    imageWarning: 'Sai kích thước hình 960 x 500.',
                  });
                }
              };
            };
            reader.readAsDataURL(input.files[0]);
          }
        }
      } else {
        // alert('Upload file sai định dạng');
        this.setState({
          game: {
            ...this.state.game,
            imageSrc: '',
          },
          imageWarning: 'Upload file định dạng chỉ được png hoặc jpg',
        });
        input.value = '';
      }
    }
  }
  handleResultImagesChange(e, index) {
    e.preventDefault();
    const input = e.target;
    if (input.value === '') {
      // alert('Upload hình');
    } else {
      const extension = input.value.substring(
                    input.value.lastIndexOf('.') + 1).toLowerCase();
      if (extension === 'png' || extension === 'jpg') {
        if (input.files && input.files[0]) {
          if (input.files[0].size > 10000000) {
            // alert('File size quá lớn');
            this.state.game.results[index].imageSrc = '';
            this.state.game.results[index].imageWarning = 'File size quá lớn';
            const results = this.state.game.results;
            this.setState({
              results,
            });
          } else {
            const reader = new FileReader();
            reader.onload = (e1) => {
              const img = new Image();
              img.src = e1.target.result;
              img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                if (width === 150 && height === 150) {
                  this.state.game.results[index].imageSrc = e1.target.result;
                  this.state.game.results[index].imageWarning = '';
                  const results = this.state.game.results;
                  this.setState({
                    results,
                  });
                } else {
                  this.state.game.results[index].imageSrc = '';
                  this.state.game.results[index].imageWarning = 'Sai kích thước hình 150 x 150.';
                  const results = this.state.game.results;
                  this.setState({
                    results,
                  });
                }
              };
            };
            reader.readAsDataURL(input.files[0]);
          }
        }
      } else {
        // alert('Upload file sai định dạng');
        this.state.game.results[index].imageSrc = '';
        this.state.game.results[index].imageWarning = 'Upload file định dạng chỉ được png hoặc jpg';
        const results = this.state.game.results;
        this.setState({
          results,
        });
        input.value = '';
      }
    }
  }
  // handlePlaysCountChange(e) {
  //   e.preventDefault();
  //   this.setState({
  //     game: {
  //       ...this.state.game,
  //       playsCount: e.target.value,
  //     },
  //   });
  // }
  // handleSharesCountChange(e) {
  //   e.preventDefault();
  //   this.setState({
  //     game: {
  //       ...this.state.game,
  //       sharesCount: e.target.value,
  //     },
  //   });
  // }
  // handleViewsCountChange(e) {
  //   e.preventDefault();
  //   this.setState({
  //     game: {
  //       ...this.state.game,
  //       viewsCount: e.target.value,
  //     },
  //   });
  // }
  handleDesChange(e) {
    e.preventDefault();
    this.setState({
      game: {
        ...this.state.game,
        des: e.target.value,
      },
    });
  }
  handleColorChange(e) {
    e.preventDefault();
    this.setState({
      game: {
        ...this.state.game,
        color: e.target.value,
      },
    });
  }


  render() {
    return (
      <div className={`${styles.formWrapper}`}>
        <form>
          <FieldGroup
            id="Title"
            type="text"
            label="Title"
            placeholder="Enter title"
            value={this.state.game.title}
            onChange={this.handleTitleChange}
          />
          <FieldGroup
            id="ZipFile"
            type="file"
            label="Zip file"
            onChange={this.handleZipFileChange}
            help={'Code game'}
          />
          <FieldGroup
            id="ThumbImage"
            type="file"
            label="Thumb + Ads Image"
            placeholder="Enter thumbImage"
            onChange={this.handleThumbImageChange}
            help={'Kích thước 960 x 500'}
          />
          {this.state.imageWarning.length > 0 &&
            <div className="alert alert-warning">
              {this.state.imageWarning}
            </div>
          }
          <div>
            <img src={this.state.game.imageSrc} alt="" />
          </div>
          {/* <button onClick={this.turnOnCropper}>Crop/Resize image</button>
          <div style={{ display: this.state.cropperTurnedOn ? 'block' : 'none' }}>
            <ImageCropper
              resultWidth={960}
              resultHeight={500}
              imageSrc={this.state.imageSrc}
              handleCropButtonClick={this.handleCropButtonClick}
              handleExitCropClick={this.handleExitCropClick}
            />
          </div>*/}
          {/* <FieldGroup
            id="Plays count"
            type="number"
            label="Plays count"
            placeholder="Enter plays"
            value={this.state.game.playsCount}
            onChange={this.handlePlaysCountChange}
          />
          <FieldGroup
            id="Shares count"
            type="number"
            label="Shares count"
            placeholder="Enter shares"
            value={this.state.game.sharesCount}
            onChange={this.handleSharesCountChange}
          />
          <FieldGroup
            id="Views count"
            type="number"
            label="Views count"
            placeholder="Enter views"
            value={this.state.game.viewsCount}
            onChange={this.handleViewsCountChange}
          />*/}
          <FieldGroup
            id="Des"
            type="text"
            label="Des"
            placeholder="Enter des"
            value={this.state.game.des}
            onChange={this.handleDesChange}
          />
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Color</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.game.color} onChange={this.handleColorChange}>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="lime">Lime</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <Radio name="radioGroup" inline checked={this.state.game.publish === true}>
              Publish
            </Radio>
            {' '}
            <Radio name="radioGroup" inline checked={this.state.game.publish === false}>
              Unpublish
            </Radio>
          </FormGroup>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title / Des / Score</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {this.state.game.results && this.state.game.results.map((result, index) =>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <FormGroup controlId={`${index + 1}-title`}>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl type="text" placeholder="Nhập title" value={result.title} onChange={(e) => this.handleResultTitlesChange(e, index)} />
                  </FormGroup>
                  <FormGroup controlId={`${index + 1}-des`}>
                    <ControlLabel>Des</ControlLabel>
                    <FormControl className={styles['text-area']}componentClass="textarea" placeholder="Nhập des" value={result.des} onChange={(e) => this.handleResultDessChange(e, index)} />
                  </FormGroup>
                  <FormGroup controlId={`${index + 1}-score`}>
                    <ControlLabel>Score</ControlLabel>
                    <FormControl type="number" placeholder="0" value={result.score} onChange={(e) => this.handleResultScoresChange(e, index)} />
                  </FormGroup>
                </td>
                <td>
                  <FieldGroup
                    id="ThumbImage"
                    type="file"
                    placeholder="Enter thumbImage"
                    onChange={(e) => this.handleResultImagesChange(e, index)}
                    help={'Kích thước 150 x 150'}
                  />
                  {result.imageWarning && result.imageWarning.length > 0 &&
                    <div className="alert alert-warning">
                      {result.imageWarning}
                    </div>
                  }
                  <img src={result.imageSrc ? result.imageSrc : `http://www.hotgame.co/sources/games/19/${result.image}`} alt="" />
                </td>
                <td>
                  <button className="btn btn-default" onClick={(e) => this.handleResultDelete(e, index)}>Delete</button>
                </td>
              </tr>
              )}
            </tbody>
          </Table>
          <div>
            <Button type="submit" onClick={this.handleAddResultButtonClick}>
              Add result
            </Button>
          </div>
          <div className={styles['buttons-wrapper']}>
            {this.props.params.gameId ?
              <div>
                <Button bsStyle="warning" type="submit" onClick={this.handleEditButtonClick}>
                  Edit
                </Button>
                <Button bsStyle="danger" type="submit" onClick={this.handleDeleteButtonClick}>
                  Delete
                </Button>
              </div>
              :
              <Button bsStyle="default" type="submit" onClick={this.handleCreateButtonClick}>
                Create
              </Button>
            }
            <Link className="btn btn-default" to="/games">
              Back
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

GameDetail.propTypes = {
  gameDetail: PropTypes.object,
  loadGame: PropTypes.func,
  createGame: PropTypes.func,
  editGame: PropTypes.func,
  removeGame: PropTypes.func,
  params: PropTypes.object,
};
function mapDispatchToProps(dispatch) {
  return {
    loadGame: (query) => dispatch(loadGame(query)),
    createGame: (input) => dispatch(createGame(input)),
    editGame: (id, input) => dispatch(editGame(id, input)),
    removeGame: (id) => dispatch(removeGame(id)),
  };
}
function mapStateToProps(store) {
  return {
    gameDetail: store.gameDetail,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
