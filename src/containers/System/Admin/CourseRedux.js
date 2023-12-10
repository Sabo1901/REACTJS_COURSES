import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './CourseRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageCourse from './TableManageCourse';



class CourseRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            previewImgURL: '',
            action: '',
            courseEditId: '',

            nameCourse: '',
            lecturers: '',
            detail: '',
            describe: '',
            tantamount: '',
            viewed: '',
            avatar: '',


        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCourses !== this.props.listCourses) {
            this.setState({
                nameCourse: '',
                lecturers: '',
                detail: '',
                describe: '',
                tantamount: '',
                viewed: '',
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
            this.props.createNewCourse({
                nameCourse: this.state.nameCourse,
                lecturers: this.state.lecturers,
                detail: this.state.detail,
                describe: this.state.describe,
                tantamount: this.state.tantamount,
                viewed: this.state.viewed,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editACourseRedux({
                id: this.state.courseEditId,
                nameCourse: this.state.nameCourse,
                lecturers: this.state.lecturers,
                detail: this.state.detail,
                describe: this.state.describe,
                tantamount: this.state.tantamount,
                viewed: this.state.viewed,
                avatar: this.state.avatar
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['nameCourse', 'lecturers', 'detail', 'viewed']
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

    handleEditCourseFromParent = (course) => {
        let imageBase64 = '';
        if (course.image) {
            imageBase64 = new Buffer(course.image, 'base64').toString('binary');
        }


        this.setState({
            nameCourse: course.nameCourse,
            lecturers: course.lecturers,
            detail: course.detail,
            describe: course.describe,
            tantamount: course.tantamount,
            viewed: course.viewed,
            previewImgURL: imageBase64,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            courseEditId: course.id
        })
    }


    render() {
        let language = this.props.language;
        let { nameCourse, lecturers, detail, viewed, avatar, tantamount } = this.state;

        return (

            <div className="user-redux-container" >
                <div className='title'>
                    <FormattedMessage id="manage-course.add" />
                </div>

                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-course.nameCourse" /></label>
                                <input className='form-control' type='text'
                                    value={nameCourse}
                                    onChange={(event) => { this.onChangeInput(event, 'nameCourse') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-course.lecturers" /></label>
                                <input className='form-control' type='text'
                                    value={lecturers}
                                    onChange={(event) => { this.onChangeInput(event, 'lecturers') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-course.detail" /></label>
                                <input className='form-control' type='text'
                                    value={detail}
                                    onChange={(event) => { this.onChangeInput(event, 'detail') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label>Tín chỉ</label>
                                <input className='form-control' type='text'
                                    value={tantamount}
                                    onChange={(event) => { this.onChangeInput(event, 'tantamount') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-course.viewed" /></label>
                                <input className='form-control' type='text'
                                    value={viewed}
                                    onChange={(event) => { this.onChangeInput(event, 'viewed') }}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-course.image" /></label>
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
                                <TableManageCourse
                                    handleEditCourseFromParent={this.handleEditCourseFromParent}
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
        listCourses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRedux: () => dispatch(actions.fetchAllCoursesStart()),
        editACourseRedux: (data) => dispatch(actions.editACourse(data)),
        createNewCourse: (data) => dispatch(actions.createNewCourse(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseRedux);
