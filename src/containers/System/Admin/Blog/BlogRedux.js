import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import '../CourseRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageBlog from './TableManageBlog';



class BlogRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogArr: [],

            title: '',
            image: '',
            contentMarkdown: '',
            userId: '',

            blogEditId: '',
            action: '',

        }
    }

    componentDidMount() {

        this.props.fetchCourseRedux();
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.listVideos !== this.props.listVideos) {
            this.setState({
                title: '',
                image: '',
                contentMarkdown: '',
                userId: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }


    handleEditVideoFromParent = (video) => {
        console.log('video check from parent:', video);
        this.setState({
            courseId: video.courseId,
            linkVideo: video.linkVideo,
            chapter: video.chapter,
            titleArticle: video.titleArticle,
            action: CRUD_ACTIONS.EDIT,
            blogEditId: video.id
        })
    }

    render() {
        let language = this.props.language;
        let listUsers = this.props.listUsers;

        return (

            <div className="user-redux-container" >
                <div className='title'>
                    <FormattedMessage id="manage-video.add" />
                </div>

                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>

                            {/* <div className='col-3'>
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
                            </div> */}
                            <div className='col-12 mb-5'>
                                <TableManageBlog
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
        listBlogs: state.admin.blogs,
        listUsers: state.admin.users,
        listVideos: state.admin.videos

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRedux: () => dispatch(actions.fetchAllCoursesStart()),
        fetchVideoRedux: () => dispatch(actions.fetchAllVideosStart()),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogRedux);
