import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import './DetailVideo.scss';
import img from "../../../assets/detailvideo.jpg";
import { getDetailInforCourse } from '../../../services/courseService';
import { withRouter } from 'react-router';


class DetailVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videosRedux: [],
            hasUpdated: false,
            arrNamevideo: [],
            detailCourse: {},
            isClicked: false,

        }
    }


    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = getDetailInforCourse(id);
            if (res && res.errCode === 0) {
                this.setState({
                    arrNamevideo: res.data
                })
            }
            this.props.fetchVideoRedux(id);
        }

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.videosCourse !== this.props.videosCourse) {

            this.setState({
                videosRedux: this.props.videosCourse,
                arrNamevideo: this.props.videosCourse,
            })

        }

    }

    handleClickVideo = () => {
        const { srcc } = this.state;
        //const arrListStr = srcc.split(' ');

        //console.log('check test:', namevideos);



        let arrListStr = this.state.videosRedux.map(x => x.linkVideo);
        let namevideo = this.state.videosRedux.map(x => x.titleArticle);
        // console.log('list src: ', namevideo);

        // Lấy tham chiếu đến nút button và các phần tử DOM khác (sử dụng React Refs hoặc componentDidMount)
        var VideoPlayer = document.querySelector(".VideoPlayer_player__CA18S");
        var VideoName = document.querySelector(".Heading_heading__VnWS7");
        var toggleButtons = document.querySelectorAll(".toggle-btn");
        var contents = document.querySelectorAll(".Detail_items_list");
        var detailBtns = document.querySelectorAll(".StepItem_wrapper__sWYHG");
        var btnlists = document.querySelectorAll(".btnlist");

        if (!this.state.isClicked) {
            // Gắn sự kiện click cho nút button
            function showContent(toggleButton, content, btnlist) {
                toggleButton.addEventListener("click", function () {
                    // Kiểm tra trạng thái hiện tại của nút
                    if (toggleButton.classList.contains("activeShowContent")) {
                        // Nếu đang active, chuyển sang inactive
                        toggleButton.classList.remove("activeShowContent");
                        toggleButton.classList.add("inactiveShowContent");
                        btnlist.classList.remove("fa-chevron-up");
                        btnlist.classList.add("fa-chevron-down");
                        content.style.display = "none";
                    } else {
                        // Nếu đang inactive, chuyển sang active
                        toggleButton.classList.remove("inactiveShowContent");
                        toggleButton.classList.add("activeShowContent");
                        btnlist.classList.remove("fa-chevron-down");
                        btnlist.classList.add("fa-chevron-up");
                        content.style.display = "block";
                    }
                });
            }

            //Gắn sự kiện click cho nút detailBtn
            detailBtns.forEach((detailBtn, index) => {
                detailBtn.addEventListener("click", function () {
                    if (detailBtn.classList.contains("activeShowVideo")) {
                        // Nếu đang active, không làm gì cả
                        return;
                    } else {
                        // Nếu đang inactive, chuyển sang active
                        detailBtn.classList.add("activeShowVideo");
                        VideoPlayer.innerHTML = `<iframe frameborder="0" allowfullscreen="1" src=${arrListStr[index]} style="width: 100%; height: 100%"></iframe>`;
                        VideoName.innerHTML = namevideo[index];

                        // Xóa active của các nút khác
                        detailBtns.forEach((otherDetailBtn) => {
                            if (otherDetailBtn.classList.contains("activeShowVideo") && otherDetailBtn !== detailBtn) {
                                otherDetailBtn.classList.remove("activeShowVideo");
                            }
                        });
                    }
                });
            });
            this.setState({ isClicked: true });
            // Gắn sự kiện click cho nút toggleButton và content
            for (let i = 0; i < toggleButtons.length; i++) {
                showContent(toggleButtons[i], contents[i], btnlists[i]);
            }
        }
    }
    render() {
        let arrVideos = this.state.videosRedux;
        console.log('list video', arrVideos);
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
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="container" style={{ width: '1500px', marginLeft: '33px', marginTop: '10px' }}>
                    <div className="Tracks_wrapper__rjtW+">
                        <div className="Tracks_container__f6ZNT" id="learn-playlist">
                            <header className="Tracks_header__zNeCh">
                                <h1 className="Tracks_heading__CjgkM">Nội dung khóa học</h1>
                            </header>
                            {Object.keys(videoByChapter).map((chapter, chapterIndex) => {


                                return (
                                    <div className="Detail_items" key={chapterIndex} onClick={() => this.handleClickVideo()}>
                                        <div class="TrackItem_wrapper__5kdF3 toggle-btn inactiveShowContent">
                                            <h3 class="TrackItem_title__tR93h">{chapter}</h3>
                                            <span class="TrackItem_desc__KkiVq">12</span>
                                            <span class="TrackItem_icon__SLY+b">
                                                <i class="svg-inline--fa fa fa-chevron-down btnlist" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="Detail_items_list" >
                                            {videoByChapter[chapter].map((item, index) => {
                                                return (
                                                    <div className="StepItem_wrapper__sWYHG" key={index}>
                                                        <div className="StepItem_info__UckcT" >
                                                            <h3 className="StepItem_title__PgsXi">{item.titleArticle}  </h3>
                                                            <p className="StepItem_desc__zN9Bs">
                                                                <i className="svg-inline--fa fa fa-play-circle StepItem_lesson-icon__wGQGc" aria-hidden="true"></i>
                                                                <span>9:10</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>

                    <div className="Content_wrapper__rvE31">
                        <div className="Video_wrapper__aoEDT noselect">
                            <div className="VideoPlayer_wrapper__s0KXB">
                                <div className="VideoPlayer_player__CA18S" style={{ width: '100%', height: '100%' }}>
                                    <img src={img} style={{ width: '117%', height: '110%', objectFit: 'cover', marginLeft: '-52px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="Video_content__BXh4c">
                            <div className="Video_contentTop__ngj7P">
                                <header>
                                    <h1 className="Heading_heading__VnWS7" style={{ fontWeight: '700' }}></h1>
                                </header>

                            </div>
                        </div>

                    </div>

                    {/* <div className="Content_wrapper__rvE31">
                        {arrVideos && arrVideos.length > 0 &&
                            arrVideos.map((item, index) => {
                                return (
                                    <div className="Video_wrapper__aoEDT noselect">
                                        <div className="VideoPlayer_wrapper__s0KXB">
                                            <div className="VideoPlayer_player__CA18S" style={{ width: '100%', height: '100%' }}>
                                                <iframe frameborder="0" allowfullscreen="1" src={item.linkVideo} style={{ width: '100%', height: '100%' }}></iframe>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="Video_content__BXh4c">
                            <div className="Video_contentTop__ngj7P">
                                <header>
                                    <h1 className="Heading_heading__VnWS7" style={{ fontWeight: '700' }}></h1>
                                </header>

                            </div>
                        </div>

                    </div> */}
                </div>
                <HomeFooter isShowBanner={false} />
            </>
        );
    }


}

const mapStateToProps = state => {
    return {
        videosCourse: state.admin.videosCourse,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideoRedux: (courseId) => dispatch(actions.fetchAllVideosCourseStart(courseId)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailVideo);
