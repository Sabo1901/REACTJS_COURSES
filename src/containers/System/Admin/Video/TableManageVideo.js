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
        let roadmaps = this.props.roadmap;
        if (!searchKeyword) {
            return videosRedux;
        }
        return videosRedux.filter(video => {
            const course = courses.find(course => course.id === video.courseId);
            const courseName = course ? course.nameCourse : "Không tìm thấy";
            const MaHP = course ? course.detail : "Không tìm thấy";
            // Chuyển đổi giá trị và từ khóa tìm kiếm thành chữ thường
            const lowercasedCourseName = courseName.toLowerCase();
            const lowercasedCourseCode = MaHP.toLowerCase();
            const lowercasedlinkVideo = video.linkVideo.toString().toLowerCase();
            const lowercasedChapter = ('chương ' + video.chapter).toLowerCase();
            const lowercasedtitleArticle = video.titleArticle.toString().toLowerCase();
            const lowercasedSearchKeyword = searchKeyword.toLowerCase();
            return (
                lowercasedChapter === lowercasedSearchKeyword ||
                lowercasedCourseName.includes(lowercasedSearchKeyword) ||
                lowercasedCourseCode.includes(lowercasedSearchKeyword) ||
                lowercasedtitleArticle === lowercasedSearchKeyword ||
                lowercasedlinkVideo.includes(lowercasedSearchKeyword)
            );
        });
    }
    render() {
        const arrVideos = this.filterVideos();
        let courses = this.props.courses;
        let roadmaps = this.props.roadmap;
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
                <div className='table-container'>
                    <table id='TableManageUser'>
                        <tbody>
                            <tr className='title-table'>
                                <th>STT</th>
                                <th>Mã HP</th>
                                <th>Khóa học</th>
                                <th>Chương</th>
                                <th>Tiêu đề</th>

                                <th>Thao tác</th>
                            </tr>
                            {arrVideos && arrVideos.length > 0 &&
                                arrVideos
                                    .slice()
                                    .sort((a, b) => a.courseId - b.courseId)
                                    .map((item, index) => {
                                        const course = courses.find(course => course.id === item.courseId);
                                        const courseName = course ? course.nameCourse : "Không tìm thấy";
                                        const MaHP = course ? course.detail : "Không tìm thấy";
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{MaHP}</td>
                                                <td>{courseName}</td>
                                                <td>{item.chapter}</td>
                                                <td>{item.titleArticle}</td>

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
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listVideos: state.admin.videos,
        courses: state.admin.courses,
        roadmap: state.admin.roadmap,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideoRedux: () => dispatch(actions.fetchAllVideosStart()),
        deleteAVideoRedux: (id) => dispatch(actions.deleteAVideo(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageVideo);
