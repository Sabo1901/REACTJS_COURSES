import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import specialtyImg from "../../../assets/specialty/cntta.png";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrCourses: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topCoursesRedux !== this.props.topCoursesRedux) {
            this.setState({
                arrCourses: this.props.topCoursesRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopCourses();
    }
    handleViewDetailCourse = (course) => {
        if (this.props.history) {
            this.props.history.push(`/detail-course/${course.id}`)
        }

    }
    render() {
        let arrCourses = this.state.arrCourses;

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.standing-course" />
                        </span>
                        {/* <button className='btn-section'>Xem thêm</button> */}
                        <button class="custom-btn btn-3"><span> <FormattedMessage id="homepage.more-infor" /></span></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrCourses && arrCourses.length > 0
                                && arrCourses.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let name = ``;
                                    return (
                                        <div className='img-customize' key={index}
                                            onClick={() => this.handleViewDetailCourse(item)}
                                        >
                                            <img src={imageBase64} />

                                            <div className='nameCourse'>{item.nameCourse}</div>
                                            <div className='lecturers'>{item.lecturers}</div>
                                            <div className='lecturers'>20 bài giảng</div>

                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topCoursesRedux: state.admin.topCourses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopCourses: () => dispatch(actions.fetchTopCourse())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
