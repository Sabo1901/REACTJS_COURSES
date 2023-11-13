import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Giới thiệu về các khóa học CNTT
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/Da1tpV9TMU0" title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Môn học này nhằm cung cấp cho các sinh viên các kiến thức cơ sở liên quan đến các đối tượng chính yếu trong lĩnh vực công nghệ phần mềm (qui trình công nghệ, phương pháp kỹ thuật thực hiện, phương pháp tổ chức quản lý, công cụ và môi trường triển khai phần mềm,…), đồng thời giúp sinh viên hiểu và biết tiến hành xây dựng phần mềm một cách có hệ thống , có phương pháp. Trong quá trình học, sinh viên sẽ được giới thiệu nhiều phương pháp khác
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
