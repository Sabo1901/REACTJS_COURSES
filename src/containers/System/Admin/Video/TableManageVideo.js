import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../TableManageUser.scss';
import * as actions from "../../../../store/actions";
import { getDetailInforCourse } from '../../../../services/courseService';

class TableManageVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videosRedux: [],
            detailCourse: {},
            searchKeyword: '',
        }
    }

    componentDidMount() {
        this.props.fetchVideoRedux();
        // let res = await getDetailInforCourse(id);
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         detailCourse: res.data
        //     })
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listVideos !== this.props.listVideos) {
            this.setState({
                videosRedux: this.props.listVideos
            })
        }
    }


    handleDeleteVideo = (video) => {
        this.props.deleteAVideoRedux(video.id);
    }

    handleEditVideo = (video) => {
        console.log('video edit:', video);
        this.props.handleEditVideoFromParent(video)
    }
    filterVideos() {
        const { videosRedux, searchKeyword } = this.state;
        let courses = this.props.courses;
        if (!searchKeyword) {
            return videosRedux;
        }
        return videosRedux.filter(video => {
            const course = courses.find(course => course.id === video.courseId);
            const courseName = course ? course.nameCourse : "Không tìm thấy";

            return (
                video.courseId.toString().includes(searchKeyword) ||
                courseName.includes(searchKeyword) ||
                video.linkVideo.includes(searchKeyword) ||
                video.chapter.includes(searchKeyword) ||
                video.titleArticle.includes(searchKeyword)
            );
        });
    }
    render() {
        const arrVideos = this.filterVideos();
        let courses = this.props.courses;

        return (

            <React.Fragment>
                <div className='col-3' style={{ marginBottom: '30px' }}>
                    <label>Tìm kiếm</label>
                    <input
                        className='form-control'
                        type='text'
                        value={this.state.searchKeyword}
                        onChange={(event) => { this.setState({ searchKeyword: event.target.value }) }}
                    />
                </div>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Khóa học</th>
                            <th>Video</th>
                            <th>Tiêu đề</th>
                            <th>Chương</th>
                            <th>Actions</th>
                        </tr>
                        {arrVideos && arrVideos.length > 0 &&
                            arrVideos
                                .slice()
                                .sort((a, b) => a.courseId - b.courseId)
                                .map((item, index) => {
                                    const course = courses.find(course => course.id === item.courseId);
                                    const courseName = course ? course.nameCourse : "Không tìm thấy";
                                    return (
                                        <tr key={index}>
                                            <td>{courseName}</td>

                                            <td>
                                                {item.linkVideo}
                                            </td>
                                            <td>{item.titleArticle}</td>
                                            <td>{item.chapter}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditVideo(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteVideo(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                        }

                    </tbody>
                </table>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listVideos: state.admin.videos,
        courses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideoRedux: () => dispatch(actions.fetchAllVideosStart()),
        deleteAVideoRedux: (id) => dispatch(actions.deleteAVideo(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageVideo);
