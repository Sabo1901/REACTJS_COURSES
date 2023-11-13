import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailCourse.scss';
import { getDetailInforCourse } from '../../../services/courseService';

class DetailCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailCourse: {}
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
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleListVideo = (course) => {
        if (this.props.history) {
            this.props.history.push(`/detailvideo/${course}`)
        }
    }
    render() {
        let { detailCourse } = this.state;

        return (
            <>
                <HomeHeader isShowBanner={false} />


                <div className="container" style={{ width: '1355px', marginTop: '40px' }}>
                    <div className="content_left">
                        <h1> {detailCourse.nameCourse}</h1>
                        {detailCourse && detailCourse.Markdown && detailCourse.Markdown.description
                            &&
                            <p style={{ fontSize: '15px', lineHeight: '1.6' }}>
                                {detailCourse.Markdown.description}
                            </p>
                        }

                        <div className="CourseDetail_topicList__vLbNG">
                            <h2 className="CourseDetail_topicHeading__xbkxm">Bạn học được gì?</h2>
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
                        {/* <h2 style={{ fontSize: '25px', fontWeight: '700' }}>Nội dung khóa học:</h2>
                        <ul style={{ paddingLeft: 0 }}>
                            <li><b>8</b> Chương</li>
                            <li style={{ fontSize: '1.4rem', marginTop: '1px', opacity: '.8', padding: '0 8px' }}>•</li>
                            <li><b>14</b> Bài học</li>

                        </ul> */}

                        {/* <div className="request">
                            <h2 style={{ fontSize: '25px', fontWeight: '700', margin: '70px 0 15px' }}>Yêu cầu</h2>
                            <section className="request_index" style={{ marginLeft: '-12px', marginRight: '-12px' }}>
                                <section className="request_index_chitiet">
                                    <ul className="request_index_chitiet_ul">
                                        <li><div className="fa fa-check yeucau"></div><span>Máy vi tính kết nối internet (Windows, Ubuntu hoặc MacOS)</span></li>
                                        <li><div className="fa fa-check yeucau"></div><span>Ý thức tự học cao, trách nhiệm cao, kiên trì bền bỉ không ngại cái khó</span></li>
                                        <li><div className="fa fa-check yeucau"></div><span>Khi học nếu có khúc mắc hãy tham gia hỏi/đáp tại group FB: Học lập trình web cùng H</span></li>
                                        <li><div className="fa fa-check yeucau"></div><span>Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho bạn những gì bạn cần phải biết</span></li>
                                    </ul>
                                </section>
                            </section>
                        </div> */}
                        {detailCourse && detailCourse.describe
                            &&
                            <div className='video-intro'>
                                <iframe width="700" height="400"
                                    src={detailCourse.describe}>
                                </iframe>
                            </div>
                        }
                    </div>
                    <div className="content_right">
                        <div className="Course_detail">
                            <div className="image_course" data-toggle="modal" data-target="#exampleModal">
                                <div className="image_course_play"
                                    style={{ backgroundImage: `url(${detailCourse.image})` }}></div>
                            </div>
                            <button onClick={() => this.handleListVideo(detailCourse.id)} class="custom-btn btn-13">Xem khóa học</button>
                            <ul>
                                <li>
                                    <div className="fa-solid fa-gauge-high"></div>
                                    <span style={{ paddingLeft: '20px' }}>Trình độ cơ bản</span>
                                </li>
                                <li>
                                    <div className="fas fa-film"></div>
                                    <span style={{ paddingLeft: '20px' }}>Tổng số <b>22</b> bài học</span>
                                </li>
                                <li>
                                    <div className="fa-solid fa-clock"></div>
                                    <span style={{ paddingLeft: '20px' }}>Thời lượng <b></b></span>
                                </li>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCourse);
