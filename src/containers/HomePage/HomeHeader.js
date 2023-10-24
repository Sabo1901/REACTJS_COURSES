import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'>

                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.home" /></b> </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.search-course" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.learning-roadmap" /></b> </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.view-roadmap" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="homeheader.blog" /></b> </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.post-blog" />
                                </div>
                            </div>
                            <div className='child-content'>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
