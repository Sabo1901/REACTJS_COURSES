import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import './CreateBlog.scss';
import img from "../../../assets/nodejs.png";
import { getDetailInforBlog } from '../../../services/userService';
import moment from 'moment';

class DetailBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailBlog: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforBlog(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailBlog: res.data
                })
            }
        }
        this.props.fetchAllUsersStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let users = this.props.users;
        let { detailBlog } = this.state;

        const user = users.find(user => user.id === detailBlog.userId);
        const lastName = user ? user.lastName : "Không tìm thấy";
        const firstName = user ? user.firstName : "Không tìm thấy";
        const image = user ? user.image : "Không tìm thấy";
        const formattedDate = moment(detailBlog.createdAt).format('DD/MM/YYYY');
        let imageBase64 = '';
        if (image) {
            imageBase64 = new Buffer(image, 'base64').toString('binary');
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div class="BlogDetail_wrapper__9lHHY">
                    <section class="index-module_grid__1q71E index-module_fullWidth__3X-6x">
                        <section class="index-module_row__-AHgh">
                            <section class="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-6__JoV9k">
                                <div>
                                    <h1 class="BlogDetail_heading__DUpyK" style={{ fontWeight: '700', color: 'black', marginBottom: '40px', marginTop: '40px' }}>{detailBlog.title}</h1>
                                    <div class="BlogDetail_header__w09Xd">
                                        <div class="BlogDetail_user__Q6EHE">
                                            <a href="/user/details/8ac88c2a-b825-4e52-b831-11d384fabfbd">
                                                <div class="FallbackAvatar_avatar__gmj3S" style={{ fontSize: '5.6px' }}>
                                                    <img class="NavBar_avatar__OG7ib" src={imageBase64} alt="1118" />

                                                </div>
                                            </a>
                                            <div class="BlogDetail_info__3xVU9">
                                                <a href="/user/details/8ac88c2a-b825-4e52-b831-11d384fabfbd"><span class="BlogDetail_name__FKdW-">{firstName} {lastName}</span></a>
                                                <p class="BlogDetail_time__J0n0e">{formattedDate}</p>

                                            </div>
                                        </div>

                                    </div>
                                    {detailBlog && detailBlog.contentHTML
                                        &&
                                        <div class="MarkdownParser_wrapper__JYN63 BlogDetail_markdownParser__QFL3L" style={{ fontSize: '18px', lineHeight: '2' }}
                                            dangerouslySetInnerHTML={{ __html: detailBlog.contentHTML }}
                                        >

                                        </div>
                                    }
                                </div>
                            </section>
                        </section>
                    </section>
                </div>
                <HomeFooter isShowBanner={false} />

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        listBlogs: state.admin.blogs,
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveCreateBlog: (data) => dispatch(actions.saveCreateBlog(data)),
        fetchBlogRedux: () => dispatch(actions.fetchAllBlogsStart()),
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBlog);
