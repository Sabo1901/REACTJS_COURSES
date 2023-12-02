import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import './CreateBlog.scss';
import img from "../../../assets/nodejs.png";
import { withRouter } from 'react-router';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import logo from "../../../assets/avatar.jpg";
class ListBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogsRedux: [],
            dataName: {},
            offset: 0, // Số bài viết hiển thị trên mỗi trang
            perPage: 6, // Số bài viết trên mỗi trang
        }
    }

    componentDidMount() {
        this.props.fetchBlogRedux();
        this.props.fetchAllUsersStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listBlogs !== this.props.listBlogs) {
            this.setState({
                blogsRedux: this.props.listBlogs,
            })
        }

    }
    handleEditorChange = ({ html, text }) => {

    }

    handleSaveContentMarkdown = () => {
    }
    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);

        this.setState({ offset: offset });
    };
    handleViewDetailBlog = (blog) => {
        if (this.props.history) {
            this.props.history.push(`/detailblog/${blog.id}`)
        }

    }
    handleCreateBlog = () => {

        if (this.props.history) {
            this.props.history.push('/createblog')
        }
    }
    handleListUserBlog = (user) => {
        const { userInfo } = this.props;
        if (this.props.history) {
            this.props.history.push(`/list-blog-user/${userInfo.id}`)
        }
    }
    render() {
        const { userInfo } = this.props;
        // let arrBlogs = this.state.blogsRedux;
        let users = this.props.users;
        const hasUserInfo = userInfo && userInfo.id;
        let arrBlogs = this.state.blogsRedux.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        );
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <section class="index-module_grid__1q71E index-module_fullWidth__3X-6x" style={{ maxWidth: '2020px' }}>
                    <div class="DefaultLayout_container__NgAo7">
                        <div class="DefaultLayout_container-top__l5XfT" style={{ marginTop: '40px' }}>
                            <h1 class="DefaultLayout_heading__AvBHu">Bài viết nổi bật</h1><div class="MarkdownParser_wrapper__JYN63 DefaultLayout_desc__rr0iE" style={{ fontSize: '15px', lineHeight: '1.6', }}>
                                <p>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</p>
                            </div>
                            {hasUserInfo && (
                                <button onClick={() => this.handleCreateBlog()} class="custom-btn btn-13" style={{ display: 'block', marginBottom: '20px' }}>Tạo bài viết</button>
                            )}

                        </div>
                        <div class="container-body">
                            <section class="index-module_row__-AHgh">
                                <section class="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-8__yebHm">
                                    <div class="Blog_leftLayout__Kuc0z">
                                        <div>
                                            {arrBlogs && arrBlogs.length > 0 &&
                                                arrBlogs.map((item, index) => {
                                                    const user = users.find(user => user.id === item.userId);
                                                    const lastName = user ? user.lastName : "Không tìm thấy";
                                                    const firstName = user ? user.firstName : "Không tìm thấy";
                                                    const image = user ? user.image : "Không tìm thấy";
                                                    let imageBase64 = '';
                                                    if (image) {
                                                        imageBase64 = new Buffer(image, 'base64').toString('binary');
                                                    }
                                                    let imageBase = '';
                                                    if (item.image) {
                                                        imageBase = new Buffer(item.image, 'base64').toString('binary');
                                                    }
                                                    const formattedDate = moment(item.createdAt).format('DD/MM/YYYY');
                                                    console.log('check ten: ', lastName);
                                                    return (
                                                        <div class="PostItem_wrapper__5s6Lk" key={index}>
                                                            <div class="PostItem_header__kJhep">
                                                                <div class="PostItem_author__-CiNM">
                                                                    {imageBase64 ? (
                                                                        <a href="#">
                                                                            <div class="FallbackAvatar_avatar__gmj3S FallbackAvatar_pro__-8mK+" style={{ fontSize: '2.9px' }}>
                                                                                <img src={imageBase64} alt=" GzW" />
                                                                            </div>
                                                                        </a>
                                                                    ) : (
                                                                        <a href="#">
                                                                            <div class="FallbackAvatar_avatar__gmj3S FallbackAvatar_pro__-8mK+" style={{ fontSize: '2.9px' }}>
                                                                                <img src={logo} alt=" GzW" />
                                                                            </div>
                                                                        </a>
                                                                    )}
                                                                    <a href="">
                                                                        <span> {firstName} {lastName}</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="PostItem_body__Fnfo-" style={{ justifyContent: 'space-between' }}>
                                                                <div class="PostItem_info__DZr39">
                                                                    <a href="" onClick={() => this.handleViewDetailBlog(item)}>
                                                                        <h2 class="PostItem_title__8lSHm">{item.title}</h2>
                                                                    </a>
                                                                    <p class="PostItem_desc__be9G8">{item.description} </p>
                                                                    <div class="PostItem_info__DZr39">

                                                                        <span>{formattedDate}</span>


                                                                    </div>
                                                                </div>
                                                                <div class="PostItem_thumb__m4iXl">
                                                                    <a href="/blog/details/15">
                                                                        <img src={imageBase} alt="No picture of Blog" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </div>
                                        <ReactPaginate
                                            previousLabel={'Trước'}
                                            nextLabel={'Sau'}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={Math.ceil(this.state.blogsRedux.length / this.state.perPage)}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageClick}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}
                                        />
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
        listBlogs: state.admin.blogs,
        userInfo: state.user.userInfo,
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveCreateBlog: (data) => dispatch(actions.saveCreateBlog(data)),
        fetchBlogRedux: () => dispatch(actions.fetchAllBlogsStart()),
        fetchUserRedux: (userId) => dispatch(actions.fetchAUsersStart(userId)),
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBlog);
