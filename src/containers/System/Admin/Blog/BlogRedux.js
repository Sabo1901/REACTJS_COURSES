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
                    <FormattedMessage id="manage-video.title" />
                </div>

                <div className='user-redux-body' style={{ marginTop: '40px' }}>
                    <div className='container'>
                        <div className='row'>
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
