import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import specialtyImg from "../../../assets/nodejs.png"
class Blog extends Component {

    render() {

        return (
            <div className='section-share section-blog'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bài viết nhiều tương tác</span>
                        {/* <button className='btn-section'>Xem thêm</button> */}
                        <button class="custom-btn btn-3"><span>Xem thêm</span></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div>Tìm hiểu về JavaScrip</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div>Tìm hiểu về JavaScrip</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div>Tìm hiểu về JavaScrip</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div>Tìm hiểu về JavaScrip</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div>Tìm hiểu về JavaScrip</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div>Khóa học Code Online</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div>Khóa học Code Online</div>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
