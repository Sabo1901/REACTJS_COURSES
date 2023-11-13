import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import './CreateBlog.scss';
import img from "../../../assets/nodejs.png";
import { getAllBlogsUser } from '../../../services/userService';
import { withRouter } from 'react-router';
import moment from 'moment';


class BlogUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogsRedux: [],
            hasUpdated: false,

        }
    }


    componentDidMount(user) {
        const { userInfo } = this.props;
        this.props.fetchBlogRedux(userInfo.id);

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        const userId = this.props.userInfo.id;
        console.log('check user: ', userId);
        // this.props.fetchBlogRedux(userId);
        if (prevProps.listBlogs !== this.props.listBlogs) {

            this.setState({
                blogsRedux: this.props.listBlogs,

            })

        }
    }

    handleDeleteBlog = (blog) => {
        const { userInfo } = this.props;
        this.props.deleteABlogRedux(blog.id);

    }
    handleEditVideo = (blog) => {
        console.log('video edit:', blog);


        //this.props.handleEditVideoFromParent(blog);
        // this.props.history.push(`/edit-blog-user/${blog.id}`)
        window.location.href = `/edit-blog-user/${blog.id}`

    }
    handleViewDetailBlog = (blog) => {

        if (this.props.history) {
            this.props.history.push(`/detail-blog/${blog.id}`)
        }
    }

    render() {
        const { userInfo } = this.props;
        let arrBlogs = this.state.blogsRedux;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <section class="index-module_grid__1q71E index-module_fullWidth__3X-6x" style={{ maxWidth: '2020px' }}>
                    <div class="DefaultLayout_container__NgAo7">
                        <div class="DefaultLayout_container-top__l5XfT" style={{ marginTop: '40px' }}>
                            <h1 class="DefaultLayout_heading__AvBHu">Bài viết của tôi</h1><div class="MarkdownParser_wrapper__JYN63 DefaultLayout_desc__rr0iE" style={{ fontSize: '15px', lineHeight: '1.6', }}>
                                {/* <p>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</p> */}
                            </div>
                        </div><div class="container-body">
                            <section class="index-module_row__-AHgh">
                                <section class="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-8__yebHm">
                                    <div class="Blog_leftLayout__Kuc0z">
                                        <div>
                                            {arrBlogs && arrBlogs.length > 0 &&
                                                arrBlogs.map((item, index) => {
                                                    let imageBase64 = '';
                                                    if (item.image) {
                                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                                    }

                                                    const formattedDate = moment(item.createdAt).format('DD/MM/YYYY');

                                                    return (
                                                        <div className="PostItem_wrapper__5s6Lk" key={index}>
                                                            <div className="PostItem_header__kJhep">
                                                                <div className="PostItem_author__-CiNM">
                                                                    <a href="#">
                                                                        <div class="FallbackAvatar_avatar__gmj3S FallbackAvatar_pro__-8mK+" style={{ fontSize: '2.9px' }}>
                                                                            <img src={imageBase64} alt=" GzW" />

                                                                        </div>
                                                                    </a>
                                                                    <a href="">
                                                                        <span> Nguyễn Đình Hiếu</span>
                                                                    </a>
                                                                </div>
                                                                <div className='PostItem_author_Edit' style={{ display: 'flex' }}>
                                                                    <button className='btn-edit' onClick={() => this.handleEditVideo(item)}><i className="fas fa-pencil-alt"></i></button>
                                                                    <button className='btn-delete' onClick={() => this.handleDeleteBlog(item)}><i className="fas fa-trash-alt"></i></button>
                                                                </div>
                                                            </div>
                                                            <div className="PostItem_body__Fnfo-">
                                                                <div className="PostItem_info__DZr39">
                                                                    <a href="">
                                                                        <h2 className="PostItem_title__8lSHm">{item.title}</h2>
                                                                    </a>
                                                                    <p className="PostItem_desc__be9G8">{item.contentMarkdown} </p>
                                                                    <div className="PostItem_info__DZr39">

                                                                        {/* <span>125 ngày trước</span> */}
                                                                        <span>{formattedDate}</span>


                                                                    </div>
                                                                </div>
                                                                <div className="PostItem_thumb__m4iXl">
                                                                    <a href="/blog/details/15">
                                                                        <img src={imageBase64} alt="No picture of Blog" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </div>

                                    </div>
                                </section>

                            </section>
                        </div>
                    </div>
                </section>

                <HomeFooter isShowBanner={false} />

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        listBlogs: state.admin.blogsUser,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveCreateBlog: (data) => dispatch(actions.saveCreateBlog(data)),
        fetchBlogRedux: (userId) => dispatch(actions.fetchAllBlogsUserStart(userId)),
        deleteABlogRedux: (blogId) => dispatch(actions.deleteABlogUser(blogId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogUser);
