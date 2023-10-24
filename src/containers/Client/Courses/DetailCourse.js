import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailCourse.scss';
import { getDetailInforCourse } from '../../../services/courseService';

class DeatailCourse extends Component {

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

    render() {
        console.log('state', this.state);
        let { detailCourse } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />


                <div className="container" style={{ width: '1355px', marginTop: '40px' }}>
                    <div class="content_left">
                        <h1> {detailCourse.nameCourse}</h1>
                        {detailCourse && detailCourse.Markdown && detailCourse.Markdown.description
                            &&
                            <p style={{ fontSize: '15px', lineHeight: '1.6' }}>
                                {detailCourse.Markdown.description}
                            </p>
                        }

                        <div class="CourseDetail_topicList__vLbNG">
                            <h2 class="CourseDetail_topicHeading__xbkxm">Bạn học được gì?</h2>
                            <section class="index-module_row__-AHgh">
                                <section class="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-12__340Ve">
                                    <ul class="CourseDetail_list__pdfCp">
                                        {detailCourse && detailCourse.Markdown && detailCourse.Markdown.contentHTML
                                            &&
                                            <div class="Course_mota" dangerouslySetInnerHTML={{ __html: detailCourse.Markdown.contentHTML }}>

                                            </div>
                                        }

                                        {/* <div class="Course_mota">
                                            <li><div class="fa fa-check yeucau"></div><span>Các kiến thức cơ bản, nền móng của ngành IT</span></li>
                                            <li><div class="fa fa-check yeucau"></div><span>Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng</span></li>
                                            <li><div class="fa fa-check yeucau"></div><span>Hiểu hơn về cách internet và máy vi tính hoạt động</span></li>
                                            <li><div class="fa fa-check yeucau"></div><span>Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng</span></li>
                                        </div> */}
                                    </ul>
                                </section>
                            </section>
                        </div>
                        <h2 style={{ fontSize: '25px', fontWeight: '700' }}>Nội dung khóa học:</h2>
                        <ul style={{ paddingLeft: 0 }}>
                            <li><b>8</b> Chương</li>
                            <li style={{ fontSize: '1.4rem', marginTop: '1px', opacity: '.8', padding: '0 8px' }}>•</li>
                            <li><b>14</b> Bài học</li>

                        </ul>
                        <div class="request">
                            <h2 style={{ fontSize: '25px', fontWeight: '700', margin: '70px 0 15px' }}>Yêu cầu</h2>
                            <section class="request_index" style={{ marginLeft: '-12px', marginRight: '-12px' }}>
                                <section class="request_index_chitiet">
                                    <ul class="request_index_chitiet_ul">
                                        <li><div class="fa fa-check yeucau"></div><span>Máy vi tính kết nối internet (Windows, Ubuntu hoặc MacOS)</span></li>
                                        <li><div class="fa fa-check yeucau"></div><span>Ý thức tự học cao, trách nhiệm cao, kiên trì bền bỉ không ngại cái khó</span></li>
                                        <li><div class="fa fa-check yeucau"></div><span>Khi học nếu có khúc mắc hãy tham gia hỏi/đáp tại group FB: Học lập trình web cùng H</span></li>
                                        <li><div class="fa fa-check yeucau"></div><span>Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho bạn những gì bạn cần phải biết</span></li>
                                    </ul>
                                </section>
                            </section>
                        </div>
                    </div>
                    <div class="content_right">
                        <div class="Course_detail">
                            <div class="image_course" data-toggle="modal" data-target="#exampleModal">
                                <div class="image_course_play"
                                    style={{ backgroundImage: `url(${detailCourse.image})` }}></div>
                            </div>
                        </div>

                    </div>
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DeatailCourse);
