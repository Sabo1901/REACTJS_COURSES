import React, { Component } from 'react';
import './Specialty.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import specialtyImg from "../../../assets/nodejs.png";
import { withRouter } from 'react-router';
class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrBlogs: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topBlogsRedux !== this.props.topBlogsRedux) {
            this.setState({
                arrBlogs: this.props.topBlogsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopBlogs();
    }
    handleViewDetailBlog = (blog) => {
        if (this.props.history) {
            this.props.history.push(`/detailblog/${blog.id}`)
        }

    }
    returnToBlog = () => {
        if (this.props.history) {
            this.props.history.push(`/listblog`)
        }
    }


    render() {
        let arrBlogs = this.state.arrBlogs;
        const style = {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: '2',
            height: '51px',
        };
        console.log('test:', this.props.topBlogsRedux)
        return (
            <div className='section-share section-blog' style={{ height: '310px' }}>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bài viết nhiều tương tác</span>
                        {/* <button className='btn-section'>Xem thêm</button> */}
                        <button class="custom-btn btn-3" onClick={() => this.returnToBlog()}><span>Xem thêm</span></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrBlogs && arrBlogs.length > 0
                                && arrBlogs.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let name = ``;
                                    return (
                                        <div className='img-customize' key={index} onClick={() => this.handleViewDetailBlog(item)}>
                                            <img src={imageBase64} />
                                            <div className='nameCourse' style={style}>{item.title}</div>
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
        topBlogsRedux: state.admin.topBlogs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopBlogs: () => dispatch(actions.fetchTopBlog())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
