import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";
import logo from "../../assets/avatar.jpg";
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        }
    }


    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }




    componentDidMount() {
        this.props.fetchUserRedux();
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    returnToBlog = () => {
        if (this.props.history) {
            this.props.history.push(`/listblog`)
        }
    }
    returnToLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/loginclient`)
        }
    }
    returnToCourse = () => {
        if (this.props.history) {
            this.props.history.push(`/list-courses`)
        }
    }
    returnToRoadmap = (id) => {
        if (this.props.history) {
            this.props.history.push(`/roadmap/${id}`)
        }
    }
    returnToProfile = (id) => {
        if (this.props.history) {
            this.props.history.push(`/profile/${id}`)
        }
    }
    handleViewDetailBlogList = (userId) => {
        if (this.props.history) {
            this.props.history.push(`/list-blog-user`)
        }

    }
    handleListUserBlog = (user) => {
        const { userInfo } = this.props;
        if (this.props.history) {
            this.props.history.push(`/list-blog-user/${userInfo.id}`)
        }
    }
    handleCreateBlog = () => {

        if (this.props.history) {
            this.props.history.push('/createblog')
        }
    }
    handleClickProfile = () => {
        // Lấy tham chiếu đến nút button
        const { userInfo } = this.props;
        var toggleButtons = document.querySelectorAll(".NavBar_myLearn__vCvEB");
        var contents = document.querySelectorAll(".manageCOURSEs");
        var Buttons = document.querySelectorAll(".NavBar_avatar-wrapper__j7jMj");
        var prifile = document.querySelectorAll(".info_user")
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
            for (let i = 0; i < Buttons.length; i++) {
                showContent(Buttons[i], prifile[i]);
            }
        }
    }
    handleLogout = () => {
        const { processLogout, history } = this.props;
        processLogout();
        // Redirect to the home page
        history.push('/home');
    }
    render() {
        const { processLogout, language, userInfo, listUsers } = this.props;
        const hasUserInfo = userInfo && userInfo.id;
        const course = listUsers.find(user => user.id === userInfo?.id);
        const scholastic = hasUserInfo ? (course ? course.scholasticId : "0") : "0";
        const image = hasUserInfo ? (course ? course.image : "0") : "0";
        let imageBase64 = '';
        if (image) {
            imageBase64 = new Buffer(image, 'base64').toString('binary');
        }

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo' onClick={() => this.returnToHome()}>

                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content' onClick={() => this.returnToHome()}>
                                <div><b><FormattedMessage id="homeheader.home" /></b> </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.search-course" />
                                </div>
                            </div>
                            {hasUserInfo ? (
                                <div className='child-content' onClick={() => this.returnToRoadmap(scholastic)}>
                                    <div><b><FormattedMessage id="homeheader.learning-roadmap" /></b> </div>
                                    <div className='sub-title'>
                                        <FormattedMessage id="homeheader.view-roadmap" />
                                    </div>
                                </div>
                            ) : (
                                <div className='child-content' style={{ cursor: 'default' }}>
                                    <div><b><FormattedMessage id="homeheader.learning-roadmap" /></b> </div>
                                    <div className='sub-title'>
                                        <FormattedMessage id="homeheader.view-roadmaplogin" />

                                    </div>
                                </div>
                            )

                            }
                            <div className='child-content' onClick={() => this.returnToBlog()}>
                                <div><b> <FormattedMessage id="homeheader.blog" /></b> </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.post-blog" />
                                </div>
                            </div>
                            <div className='child-content' onClick={() => this.returnToCourse()}>
                                <div><b><FormattedMessage id="homeheader.course" /></b> </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.view-course" />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="far fa-question-circle"> <FormattedMessage id="homeheader.support" /></i>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</div>
                            {userInfo
                                &&
                                <div style={{ display: 'flex' }}>
                                    <span className='welcome NavBar_avatar-wrapper__j7jMj'
                                        style={{ cursor: 'pointer', display: 'flex' }}>
                                        <div class="FallbackAvatar_avatar__gmj3S" onClick={() => this.handleClickProfile()} style={{ fontSize: '3.2px' }}>
                                            {imageBase64 ? (
                                                <img class="NavBar_avatar__OG7ib" src={imageBase64}
                                                    alt="1118_Nguyễn Đình Hiếu" style={{
                                                        marginTop: '5px',
                                                        marginRight: '10px'
                                                    }} />
                                            ) : (
                                                <img class="NavBar_avatar__OG7ib" src={logo}
                                                    alt="Hình khác" style={{
                                                        marginTop: '5px',
                                                        marginRight: '10px'
                                                    }} />
                                            )}
                                        </div>
                                    </span>
                                    <div className='info_user' id="tippy-4" style={{ zIndex: '9999', position: 'absolute', inset: ' 0px 0px auto auto', margin: '0px', transform: 'translate3d(-28px, 57.6px, 0px)' }}>
                                        <ul class="Tippy-module_wrapper__1s5m5 UserMenu_wrapper__kevhj hide-on-click">
                                            <div class="UserMenu_user__GXFLp">
                                                <div class="UserMenu_avatarWrapper__9ABYL">
                                                    <div class="FallbackAvatar_avatar__gmj3S" style={{ fontSize: '3.2px' }}>
                                                        {/* <img class="NavBar_avatar__OG7ib" src="/Content/images/low poly wolf face.jpg" alt="1118"> */}
                                                    </div>
                                                </div>
                                                <div class="UserMenu_info__UqeZT">
                                                    <span class="UserMenu_name__L18s-">  <FormattedMessage id="homeheader.welcome" />
                                                        {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                                                    </span>
                                                    <div class="UserMenu_username__7qkRU"></div>
                                                </div>
                                            </div>

                                            <ul class="UserMenu_list__FI9-C">
                                                <li><a class="UserMenu_item__NXwf1" onClick={() => this.returnToProfile(userInfo.id)}>Trang cá nhân</a></li>
                                            </ul>

                                            <ul class="UserMenu_list__FI9-C">
                                                <li><a class="UserMenu_item__NXwf1" onClick={() => this.handleCreateBlog()}>Viết blog</a></li>
                                                <li><a class="UserMenu_item__NXwf1" onClick={() => this.handleListUserBlog(userInfo.id)}>Bài viết của tôi</a></li>
                                            </ul>

                                        </ul>

                                    </div>
                                    {/* nút logout */}
                                    <div
                                        className="btn btn-logout"
                                        style={{ color: '#ffffff', fontSize: '20px' }}
                                        onClick={this.handleLogout} // Update this line
                                        title='Log out'
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </div>


                            }
                            {!userInfo
                                &&
                                <div >
                                    <button class="NavBar_registerBtn__bQERL" onClick={() => this.returnToLogin()}>Đăng nhập</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>  <FormattedMessage id="homeheader.learning-together" /></div>
                            <div className='title2'>  <FormattedMessage id="homeheader.for-HUTECH-Students" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm khóa học'></input>
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <img src='https://static-00.iconduck.com/assets.00/file-type-angular-icon-1907x2048-tobdkjt1.png'></img>
                                    </div>
                                    <div className='text-child'>AngularJS</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'> <img src='https://cdn-icons-png.flaticon.com/512/919/919825.png'></img></div>
                                    <div className='text-child'>NodeJS</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'> <img src='https://icon-library.com/images/react-icon/react-icon-29.jpg'></img></div>
                                    <div className='text-child'>ReactJS</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'> <img src='https://aptechvietnam.com.vn/wp-content/uploads/anh_5_1.png'></img></div>
                                    <div className='text-child'>C</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'> <img src='https://d2nir1j4sou8ez.cloudfront.net/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png'></img></div>
                                    <div className='text-child'>NextJS</div>
                                </div>

                            </div>
                        </div>

                    </div>
                }
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
