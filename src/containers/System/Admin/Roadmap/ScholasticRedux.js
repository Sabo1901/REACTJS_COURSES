import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import '../CourseRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageScholastic from './TableManageScholastic';



class ScholasticRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            previewImgURL: '',
            courseArr: [],
            scholasticArr: [],
            action: '',
            scholasticEditId: '',

            scholastic: '',
            prerequisiteId: '',
            avatar: '',



        }
    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.scholastics !== this.props.scholastics) {
            this.setState({
                scholastic: '',
                prerequisiteId: '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    OpenPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveCourse = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewScholastic({
                scholastic: this.state.scholastic,
                prerequisiteId: this.state.prerequisiteId,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAScholasticRedux({

                id: this.state.scholasticEditId,
                scholastic: this.state.scholastic,
                prerequisiteId: this.state.prerequisiteId,
                avatar: this.state.avatar
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['scholastic', 'prerequisiteId']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditScholasticFromParent = (scholastic) => {
        let imageBase64 = '';
        if (scholastic.diagram) {
            imageBase64 = new Buffer(scholastic.diagram, 'base64').toString('binary');
        }

        this.setState({
            scholastic: scholastic.scholastic,
            prerequisiteId: scholastic.prerequisiteId,
            previewImgURL: imageBase64,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            scholasticEditId: scholastic.id
        })

    }

    render() {
        let language = this.props.language;
        let { scholastic, prerequisiteId, avatar } = this.state;

        return (
            <div className="user-redux-container" >
                <div className='title'>
                    <FormattedMessage id="manage-course.add" />
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-roadmap.scholastic" /></label>
                                <input className='form-control' type='text'
                                    value={scholastic}
                                    onChange={(event) => { this.onChangeInput(event, 'scholastic') }}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-roadmap.prerequisiteId" /></label>
                                <input className='form-control' type='text'
                                    value={prerequisiteId}
                                    onChange={(event) => { this.onChangeInput(event, 'prerequisiteId') }}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-roadmap.image" /></label>
                                <div className='preview-img-container'>
                                    <input type='file' id='previewImg' hidden onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.OpenPreviewImage()}


                                    >

                                    </div>
                                </div>

                            </div>

                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveCourse()}>

                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-course.edit" />
                                        :
                                        <FormattedMessage id="manage-course.save" />
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageScholastic
                                    handleEditScholasticFromParent={this.handleEditScholasticFromParent}
                                    action={this.state.action}
                                />
                            </div>

                        </div>
                    </div>
                    {this.state.isOpen === true &&

                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listCourses: state.admin.courses,
        roadmap: state.admin.roadmap,
        scholastics: state.admin.scholastics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchScholasticRedux: () => dispatch(actions.fetchAllScholasticsStart()),
        editAScholasticRedux: (data) => dispatch(actions.editAScholastic(data)),
        createNewScholastic: (data) => dispatch(actions.createNewScholastic(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScholasticRedux);
