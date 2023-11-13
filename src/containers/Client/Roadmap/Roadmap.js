import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import './Roadmap.scss';
import SoDo from "../../../assets/SoDo.PNG";
import VIDU from "../../../assets/VIDU.png";
import { getAScholastics } from '../../../services/courseService';
import { withRouter } from 'react-router';
import moment from 'moment';
class Roadmap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scholasticsRedux: [],
            roadmapsRedux: [],
            detailScholastic: {},
            isClicked: false,
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAScholastics(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailScholastic: res.data
                })
            }
            this.props.fetchRoadmapRedux(id);
            // this.props.fetchScholasticRedux(1);
        }

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roadmap !== this.props.roadmap) {
            this.setState({
                scholasticsRedux: this.props.roadmap,

            })
        }

    }
    handleClick = () => {

        let arrListStr = this.state.scholasticsRedux.map(x => x.semester);
        let namevideo = this.state.scholasticsRedux.map(x => x.credit);
        //console.log('la list video', arrListStr);

        var toggleButtons = document.querySelectorAll(".toggle-btn");
        var contents = document.querySelectorAll(".tab-content")
        var detailBtns = document.querySelector(".image_course_play")
        if (!this.state.isClicked) {
            // Gắn sự kiện click cho nút button
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
        var modal = document.getElementById('id01');

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    handleViewDetailBlog = (blog) => {
        if (this.props.history) {
            this.props.history.push(`/detailblog/${blog.id}`)
        }

    }

    render() {
        let { detailScholastic } = this.state;
        let arrRoadmaps = this.state.scholasticsRedux;
        // let listroadmaps = this.state.roadmapsRedux;
        console.log('check: ', arrRoadmaps);
        let roadmapBySemester = {};

        // Tạo danh sách phần tử theo semester
        arrRoadmaps.forEach((item, index) => {
            // Kiểm tra xem semester đã tồn tại trong đối tượng chưa
            if (!roadmapBySemester[item.semester]) {
                roadmapBySemester[item.semester] = [];
            }

            // Thêm phần tử vào danh sách của semester
            roadmapBySemester[item.semester].push(item);
        });
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div class="container" style={{ width: '1355px', marginTop: '40px' }}>
                    <h1 style={{ fontWeight: '700' }}>Chương trình đào tạo ngành CNTT trường Đại học Công Nghệ TP.HCM</h1>

                    <div class="content_left" style={{ width: '40.66667%' }}>
                        <h2 style={{ fontSize: '26px', fontWeight: '700', marginTop: '90px' }}>Nội dung chương trình đào tạo Khóa {detailScholastic.scholastic}:</h2>
                        <p style={{ fontSize: '15px', lineHeight: '1.6' }}>Tổng hợp tất cả các học phần lý thuyết và thực hành (không tính các học phần đại cương và các học phần không tích lũy) </p>

                        <ul style={{ paddingLeft: '0' }}>
                            <li><b>18 môn</b></li>
                            <li style={{ fontSize: '1.4rem', marginTop: '1px', opacity: '.8', padding: '0 8px' }}>•</li>
                            <li><b>54 tín chỉ</b></li>

                        </ul>
                        <div style={{ width: '510px' }}>
                            {Object.keys(roadmapBySemester).map((semester, semesterIndex) => (
                                <div class="product-details-tab " key={semesterIndex}>
                                    <div class="nav-item toggle-btn inactiveShowContent" onClick={() => this.handleClick()}>
                                        <div class="nav_chitiet" style={{ width: '510px' }} >
                                            <span class="name-course" style={{ textAlign: 'center', fontFamily: 'sans-serif', textDecoration: 'none' }}><strong>Học kì: {semester}</strong></span>
                                            <p class="timeCoures" style={{ fontWeight: '600' }}>1 môn | 3 tín chỉ </p>
                                        </div>
                                    </div>
                                    <br />

                                    <div class="tab-content" style={{ width: '100%', marginLeft: '0' }}>
                                        {roadmapBySemester[semester].map((subItem, subIndex) => (
                                            <div class="tab-content-item" key={subIndex}>
                                                <a href="/COURSE/Index/CMP1016" style={{ color: 'black' }}>
                                                    <div class="chitiet_course">
                                                        <div class="CurriculumOfCourse_lessonName__llwRr" style={{ float: 'left', marginLeft: '-37px' }}>CMP1016 | {subItem.credit} </div>
                                                        <span class="time_course" style={{ marginRight: '-21px' }}>{subItem.semester} tín chỉ</span>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {/* {arrRoadmaps && arrRoadmaps.length > 0 &&
                                arrRoadmaps.map((item, index) => {

                                    return (
                                        <div class="product-details-tab " key={index}>
                                            <div class="nav-item toggle-btn inactiveShowContent" onClick={() => this.handleClick()}>
                                                <div class="nav_chitiet" style={{ width: '510px' }} >
                                                    <span class="name-course" style={{ textAlign: 'center', fontFamily: 'sans-serif', textDecoration: 'none' }}><strong>Học kì: {item.semester}</strong></span>
                                                    <p class="timeCoures" style={{ fontWeight: '600' }}>1 môn | 3 tín chỉ </p>
                                                </div>
                                            </div>
                                            <br />

                                            <div class="tab-content" style={{ width: '100%', marginLeft: '0' }}>
                                                {arrRoadmaps && arrRoadmaps.length > 0 &&
                                                    arrRoadmaps.map((item, index) => {
                                                        return (
                                                            <div class="tab-content-item" key={index}>
                                                                <a href="/COURSE/Index/CMP1016" style={{ color: 'black' }}>
                                                                    <div class="chitiet_course">
                                                                        <div class="CurriculumOfCourse_lessonName__llwRr" style={{ float: 'left', marginLeft: '-37px' }}>CMP1016 | {item.credit} </div>
                                                                        <span class="time_course" style={{ marginRight: '-21px' }}>{item.semester} tín chỉ</span>
                                                                    </div>
                                                                </a>

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            } */}
                        </div>

                    </div>
                    <div class="content_right" style={{ width: '59.33333%' }}>
                        <img src={VIDU} style={{ objectFit: 'cover', width: '100%' }} />
                        <img src={detailScholastic.diagram} style={{ objectfit: 'cover', width: '100%', marginTop: '-75px' }} />

                    </div>
                </div>

                <HomeFooter isShowBanner={false} />

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        scholastics: state.admin.scholastics,
        userInfo: state.user.userInfo,
        listUsers: state.admin.users,
        roadmap: state.admin.roadmap,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRoadmapRedux: (id) => dispatch(actions.fetchARoadmapsStart(id)),
        fetchScholasticRedux: (scholasticId) => dispatch(actions.fetchAScholasticsStart(scholasticId)),
        fetchUserRedux: (userId) => dispatch(actions.fetchAUsersStart(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roadmap);
