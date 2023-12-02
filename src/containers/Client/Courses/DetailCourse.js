import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import './DetailCourse.scss';
import { getDetailInforCourse } from '../../../services/courseService';
import { getDetailInforUser } from '../../../services/userService';
class DetailCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailCourse: {},
            videosRedux: [],
            isClicked: false,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforCourse(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailCourse: res.data
                })
            }
            this.props.fetchVideoRedux(id);

        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.videosCourse !== this.props.videosCourse) {

            this.setState({
                videosRedux: this.props.videosCourse,

            })

        }

    }
    handleListVideo = (course) => {
        if (this.props.history) {
            this.props.history.push(`/detailvideo/${course}`)
        }
    }
    handleClickCourse = () => {

        // Lấy tham chiếu đến nút button
        var toggleButtons = document.querySelectorAll(".toggle-btn");
        var contents = document.querySelectorAll(".tab-content")
        var detailBtns = document.querySelector(".image_course_play")
        // Gắn sự kiện click cho nút button
        if (!this.state.isClicked) {
            function showContent(toggleButton, content) {
                toggleButton.addEventListener("click", function () {
                    // Kiểm tra trạng thái hiện tại của nút
                    if (toggleButton.classList.contains("activeShowContent")) {
                        // Nếu đang active, chuyển sang inactive
                        toggleButton.classList.remove("activeShowContent");
                        toggleButton.classList.add("inactiveShowContent");
                        content.style.display = "none"
                    } else {
                        // Nếu đang inactive, chuyển sang active
                        toggleButton.classList.remove("inactiveShowContent");
                        toggleButton.classList.add("activeShowContent");
                        content.style.display = "block"
                    }
                });
            }
            this.setState({ isClicked: true });
            for (let i = 0; i < toggleButtons.length; i++) {
                showContent(toggleButtons[i], contents[i]);
            }
        }
    }
    render() {
        let { detailCourse, listUsers } = this.state;
        let { userInfo } = this.props;
        const hasUserInfo = userInfo && userInfo.id;
        let arrVideos = this.state.videosRedux;


        let videoByChapter = {};

        // Tạo danh sách phần tử theo Chapter
        arrVideos.forEach((item, index) => {
            // Kiểm tra xem Chapter đã tồn tại trong đối tượng chưa
            if (!videoByChapter[item.chapter]) {
                videoByChapter[item.chapter] = [];
            }

            // Thêm phần tử vào danh sách của Chapter
            videoByChapter[item.chapter].push(item);
        });
        const totalChapters = Object.keys(videoByChapter).length;
        const totalVideos = Object.values(videoByChapter).flat().length;
        return (
            <>
                <HomeHeader isShowBanner={false} />


                <div className="container" style={{ width: '1355px', marginTop: '40px' }}>
                    <div className="content_left">
                        <h1 style={{ fontSize: '32px', marginBottom: '15px' }}> {detailCourse.nameCourse}</h1>
                        {detailCourse && detailCourse.Markdown && detailCourse.Markdown.description
                            &&
                            <p style={{ fontSize: '15px', lineHeight: '1.6' }}>
                                {detailCourse.Markdown.description}
                            </p>
                        }

                        <div className="CourseDetail_topicList__vLbNG">
                            <h2 className="CourseDetail_topicHeading__xbkxm" style={{ fontSize: '25px' }}>Bạn học được gì?</h2>
                            <section className="index-module_row__-AHgh">
                                <section className="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-12__340Ve">
                                    <ul className="CourseDetail_list__pdfCp">
                                        {detailCourse && detailCourse.Markdown && detailCourse.Markdown.contentHTML
                                            &&
                                            <div className="Course_mota" dangerouslySetInnerHTML={{ __html: detailCourse.Markdown.contentHTML }}>

                                            </div>
                                        }

                                        {/* <div className="Course_mota">
                                            <li><div className="fa fa-check yeucau"></div><span>Các kiến thức cơ bản, nền móng của ngành IT</span></li>
                                            <li><div className="fa fa-check yeucau"></div><span>Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng</span></li>
                                            <li><div className="fa fa-check yeucau"></div><span>Hiểu hơn về cách internet và máy vi tính hoạt động</span></li>
                                            <li><div className="fa fa-check yeucau"></div><span>Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng</span></li>
                                        </div> */}
                                    </ul>
                                </section>
                            </section>
                        </div>
                        <h2 style={{ fontSize: '25px', fontWeight: '700', marginBottom: '15px' }}>Nội dung khóa học:</h2>
                        <ul style={{ paddingLeft: 0 }}>
                            <li><b>{totalChapters}</b> Chương</li>
                            <li style={{ fontSize: '1.4rem', marginTop: '1px', opacity: '.8', padding: '0 8px' }}>•</li>
                            <li><b>{totalVideos}</b> Bài học</li>
                        </ul>
                        <div>
                            {Object.keys(videoByChapter).map((chapter, chapterIndex) => {
                                // Đếm số lượng phần tử trong mảng của từng semester
                                let chapterItemCount = videoByChapter[chapter].length;
                                // Cập nhật biến địa phương

                                return (
                                    <div class="product-details-tab ">
                                        <div class="nav-item toggle-btn inactiveShowContent" key={chapterIndex} onClick={() => this.handleClickCourse()}>
                                            <div class="nav_chitiet">
                                                <span class="name-course" style={{ textAlign: 'center', fontFamily: 'sans-serif', textDecoration: 'none' }}><strong>{chapter}</strong></span>
                                                <p class="timeCoures" style={{ fontWeight: '600' }}>{chapterItemCount} bài học</p>
                                            </div>
                                        </div>
                                        <br />
                                        <div class="tab-content">
                                            {videoByChapter[chapter].map((subItem, subIndex) => {
                                                return (
                                                    <div class="tab-content-item" key={subIndex}>
                                                        <div class="chitiet_course">
                                                            <span class="fas fa-play-circle CurriculumOfCourse_icon__1fxR9 CurriculumOfCourse_video__GQtG1"></span>
                                                            <div class="CurriculumOfCourse_lessonName__llwRr" style={{ float: 'left', marginleft: '10px' }}>{subItem.titleArticle}  </div>

                                                            <span class="time_course">10:14</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}


                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                    <div className="content_right">
                        <div className="Course_detail">
                            <div className="image_course" data-toggle="modal" data-target="#exampleModal">
                                <div className="image_course_play"
                                    style={{ backgroundImage: `url(${detailCourse.image})` }}></div>
                            </div>
                            {hasUserInfo ? (
                                <button onClick={() => this.handleListVideo(detailCourse.id)} className="custom-btn btn-13">
                                    Xem khóa học
                                </button>
                            ) : (
                                <p style={{ fontSize: '15px' }}>( Cần đăng nhập để có thể xem video )</p>
                            )}
                            {/* {hasUserInfo && (
                                <button onClick={() => this.handleListVideo(detailCourse.id)} class="custom-btn btn-13">Xem khóa học</button>
                            )} */}
                            <ul>
                                <li>

                                    <span style={{ paddingLeft: '20px' }}>Trình độ cơ bản</span>
                                </li>
                                <li>
                                    <div className="fas fa-film"></div>
                                    <span style={{ paddingLeft: '20px' }}>Tổng số <b>{totalVideos}</b> bài học</span>
                                </li>
                                {/* <li>
                                    <div className="fa-solid fa-clock"></div>
                                    <span style={{ paddingLeft: '20px' }}>Thời lượng <b></b></span>
                                </li> */}
                                <li>
                                    <div className="fa fa-battery-full"></div>
                                    <span style={{ paddingLeft: '20px' }}>Học mọi lúc, mọi nơi</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <HomeFooter isShowBanner={false} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        users: state.admin.users,
        videosCourse: state.admin.videosCourse,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchVideoRedux: (courseId) => dispatch(actions.fetchAllVideosCourseStart(courseId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCourse);
