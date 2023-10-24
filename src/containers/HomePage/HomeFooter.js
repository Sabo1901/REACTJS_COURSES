import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeFooter.scss';
import logo from "../../assets/10.png";
class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <div class=" main-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 introduction footer-column">
                                <div class="logo-codelearn">
                                    <img src={logo} alt="CodeLearn" style={{ width: '35%' }} />
                                </div>
                                <p>
                                    CodeLearn là nền tảng tương tác trực tuyến hỗ trợ người dùng học tập, thực hành, thi đấu và đánh giá kỹ năng lập trình một cách nhanh chóng và chính xác.
                                </p>
                                <a href="https://www.facebook.com/CodeLearnFanpage" title="Facebook" target="_blank" class="social-button">
                                    <i class="fab fa-facebook-square" style={{ color: '#139DF8' }}></i>
                                </a>
                                <a href="https://www.youtube.com/channel/UCpt3dSDGk5fC7uU9OeFG5ig" title="Youtube" target="_blank" class="social-button">
                                    <i class="fab fa-youtube" style={{ color: '#f20d18' }}></i>
                                </a>
                                <a href="https://twitter.com/codelearn_io" title="Tiktok" target="_blank" class="social-button">
                                    {/* <i class="fab fa-tiktok" style={{ color: '#070808' }}></i> */}
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1024px-Instagram-Icon.png' style={{ width: '100%' }} />
                                </a>
                                <a href="https://www.instagram.com/codelearn.io/" title="Instagram" target="_blank" class="social-button">
                                    <img src='https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png' style={{ width: '100%' }} />
                                </a>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-2 links footer-column">
                                <h4>Liên kết</h4>
                                <p><a href="/learning" class="link-menu" title="Học tập">Học tập</a></p>
                                <p><a href="/training" class="link-menu" title="Luyện tập">Luyện tập</a></p>
                                <p><a href="/fights" class="link-menu" title="Cuộc thi">Cuộc thi</a></p>
                                <p><a href="/game/index" class="link-menu" title="Trò chơi">Trò chơi</a></p>
                            </div>

                            <div class="col-xs-12 col-sm-4 col-md-2 about footer-column">
                                <h4>Thông tin</h4>
                                <p><a href="/sharing" class="link-menu" title="Chia sẻ">Chia sẻ</a></p>
                                <p><a href="/aboutus" title="Về chúng tôi">Về chúng tôi</a></p>
                                <p><a href="/terms" title="Điều khoản sử dụng">Điều khoản sử dụng</a></p>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-2 help footer-column">
                                <h4>Trợ giúp</h4>
                                <p><a href="/help" title="Hỗ trợ">Hỗ trợ</a></p>
                                <p><a href="/discussion" title="Thảo luận">Thảo luận</a></p>
                                <p><a href="mailto:support@codelearn.io" title="Liên hệ với chúng tôi">Liên hệ với chúng tôi</a></p>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
