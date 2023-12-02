import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './CoursePage.scss';
import * as actions from '../../../store/actions';
import { getDetailInforCourse } from '../../../services/courseService';
import specialtyImg from "../../../assets/specialty/cntta.png";
class CoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coursesRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchCourseRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCourses !== this.props.listCourses) {
            this.setState({
                coursesRedux: this.props.listCourses
            })
        }
    }
    handleViewDetailCourse = (course) => {
        if (this.props.history) {
            this.props.history.push(`/detail-course/${course.id}`)
        }

    }

    render() {
        let arrCourses = this.state.coursesRedux;
        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div class="Home_wrapper__53Los" style={{ width: ' 90%', marginLeft: '90px' }}>
                    <div>
                        <h1 style={{ fontSize: '34px', fontWeight: '700', color: '#000000', marginBottom: '10px' }}>Tất cả khóa học</h1>
                        <h4>Tất cả khóa học đều miễn phí được tổng hợp từ nhiều nguồn trên Internet!</h4>
                    </div>
                    <div class="ScrollList_vertical__hG0sb">
                        <div style={{ marginTop: '-10px' }}>

                            <div class="ScrollList_heading-wrap__58LQx" style={{ alignItems: 'baseline', display: 'flex' }}>
                                <div class="ScrollList_heading__BYEXH">
                                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#000000', marginBottom: '10px' }}>Khóa học miễn phí</h1>
                                </div>
                                <a href="" class="ScrollList_view-all__MTYc1" style={{ textDecoration: 'none' }}>Xem lộ trình <i class="fa fa-chevron-right" aria-hidden="true" style={{ fontSize: '1.2rem', marginLeft: '4px', position: 'relative', top: '-1px', transition: '.3s ease' }}></i></a>
                            </div>
                        </div>
                        <div class="ScrollList_body__iMN-l">
                            <section class="index-module_row__-AHgh" style={{ marginLeft: '-12px', marginRight: '-12px', display: 'flex', flexWrap: 'wrap' }}>

                                {arrCourses && arrCourses.length > 0 &&
                                    arrCourses.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let name = ``;
                                        return (
                                            <section key={index} class="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-4__30Uoi index-module_l-3__MjWvb">
                                                <div class="CommonItem_wrapper__1FbHi Home_courseItem__aIeZ4" style={{ paddingBottom: '23px' }}>
                                                    <a class="CommonItem_thumb__ew8Jj CommonItem_has-link__VLLrX" href="#" style={{ backgroundImage: `url(${imageBase64})` }}>
                                                        <button class="Button_btn__RW1e2 CommonItem_cta-btn__OK+oX"
                                                            onClick={() => this.handleViewDetailCourse(item)}
                                                        > Xem khóa học </button>
                                                    </a>
                                                    <h3 class="CommonItem_title__EpYrE" style={{ fontWeight: '600', marginTop: '10px' }}>
                                                        <a href="#">{item.nameCourse}</a>
                                                    </h3>
                                                    <div className='lecturers' style={{ color: '#6a6f73' }}>{item.lecturers}</div>
                                                    <div class="CourseItem_students-count__92kIg">
                                                        <i class="fa fa-users" aria-hidden="true" style={{ display: 'var(--fa-display, inline-block)', height: '1em', overflow: 'visible', verticalAlign: '-0.125em' }}></i>
                                                        <span> {item.viewed}</span>
                                                    </div>
                                                </div>
                                            </section>
                                        )
                                    })
                                }




                            </section>
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
        listCourses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRedux: () => dispatch(actions.fetchAllCoursesStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
