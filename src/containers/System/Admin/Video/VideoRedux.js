import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import '../CourseRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageVideo from './TableManageVideo';



class VideoRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseArr: [],

            courseId: '',
            linkVideo: '',
            chapter: '',
            titleArticle: '',

            videoEditId: '',
            action: '',

        }
    }

    async componentDidMount() {

        this.props.fetchCourseRedux();


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCourses !== this.props.listCourses) {
            let arrCourses = this.props.listCourses;
            this.setState({
                courseArr: arrCourses,
                courseId: arrCourses && arrCourses.length > 0 ? arrCourses[0].id : ''
            })
        }

        if (prevProps.listVideos !== this.props.listVideos) {
            let arrCourses = this.props.listCourses;
            this.setState({
                courseId: '',
                linkVideo: '',
                chapter: '',
                titleArticle: '',
                courseId: arrCourses && arrCourses.length > 0 ? arrCourses[0].id : '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleSaveVideo = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewVideo({
                courseId: this.state.courseId,
                linkVideo: this.state.linkVideo,
                chapter: this.state.chapter,
                titleArticle: this.state.titleArticle,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAVideoRedux({
                id: this.state.videoEditId,
                courseId: this.state.courseId,
                linkVideo: this.state.linkVideo,
                chapter: this.state.chapter,
                titleArticle: this.state.titleArticle,
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['courseId', 'linkVideo', 'chapter', 'titleArticle']
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

    handleEditVideoFromParent = (video) => {
        console.log('video check from parent:', video);
        this.setState({
            courseId: video.courseId,
            linkVideo: video.linkVideo,
            chapter: video.chapter,
            titleArticle: video.titleArticle,
            action: CRUD_ACTIONS.EDIT,
            videoEditId: video.id
        })
    }

    render() {
        let language = this.props.language;
        let videos = this.state.courseArr;
        console.log('check list:', videos);
        let { courseId, linkVideo, chapter, titleArticle } = this.state;

        return (

            <div className="user-redux-container" >
                <div className='title'>
                    <FormattedMessage id="manage-video.add" />
                </div>

                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-video.courseId" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'courseId') }}
                                    value={courseId}
                                >
                                    {videos && videos.length > 0 &&
                                        videos.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.nameCourse}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-video.linkVideo" /></label>
                                <input className='form-control' type='text'
                                    value={linkVideo}
                                    onChange={(event) => { this.onChangeInput(event, 'linkVideo') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-video.chapter" /></label>
                                <input className='form-control' type='text'
                                    value={chapter}
                                    onChange={(event) => { this.onChangeInput(event, 'chapter') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-video.titleArticle" /></label>
                                <input className='form-control' type='text'
                                    value={titleArticle}
                                    onChange={(event) => { this.onChangeInput(event, 'titleArticle') }}
                                />
                            </div>




                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveVideo()}>

                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-course.edit" />
                                        :
                                        <FormattedMessage id="manage-course.save" />
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageVideo
                                    handleEditVideoFromParent={this.handleEditVideoFromParent}
                                    action={this.state.action}
                                />
                            </div>

                        </div>
                    </div>



                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listCourses: state.admin.courses,
        listUsers: state.admin.users,
        listVideos: state.admin.videos

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRedux: () => dispatch(actions.fetchAllCoursesStart()),
        fetchVideoRedux: () => dispatch(actions.fetchAllVideosStart()),
        createNewVideo: (data) => dispatch(actions.createNewVideo(data)),
        editAVideoRedux: (data) => dispatch(actions.editAVideo(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoRedux);
