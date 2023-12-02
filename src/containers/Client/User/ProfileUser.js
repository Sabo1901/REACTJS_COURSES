import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './ProfileUser.scss';
import * as actions from '../../../store/actions';
import { getDetailInforUser } from '../../../services/userService';
import specialtyImg from "../../../assets/avatar.jpg";
class ProfileUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            listUsers: [],
            detailCourse: {},
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            role: '',
            avatar: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforUser(id);
            if (res && res.errCode === 0) {
                this.setState({
                    email: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    phonenumber: res.data.phonenumber,
                    address: res.data.address,
                    gender: res.data.gender,
                    role: res.data.roleId,
                    avatar: res.data.image,
                    userEditId: res.data.id
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({

            })
        }
    }
    handleOnChangeFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    handleOnChangeLastName = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    handleOnChangePhone = (event) => {
        this.setState({
            phonenumber: event.target.value
        })
    }
    handleSaveUser = () => {

        this.props.editAUserRedux({
            id: this.state.userEditId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            roleId: this.state.role,
            avatar: this.state.avatar
        })

    }
    handleEditUserFromParent = (user) => {
        const { userInfo } = this.props;
        this.setState({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            userEditId: user.id
        })

    }
    render() {
        let { email, password, firstName, lastName, phonenumber, address, gender, role, avatar } = this.state;
        const { userInfo, listUsers } = this.props;
        const hasUserInfo = userInfo && userInfo.id;
        const course = listUsers.find(user => user.id === userInfo?.id);
        const image = hasUserInfo ? (course ? course.image : "0") : "0";
        let imageBase64 = '';
        if (image) {
            imageBase64 = new Buffer(image, 'base64').toString('binary');
        }

        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let isGetGender = this.props.isLoadingGender;

        return (
            <>
                <HomeHeader isShowBanner={false} />

                <section class="index-module_grid__1q71E index-module_wide__3c1pI" style={{ maxWidth: '1200px', marginTop: '67px', marginLeft: '160px' }}>
                    <div class="Profile_banner__tdS71" src="" style={{ backgroundImage: `url(https://i.pinimg.com/originals/03/dc/16/03dc16c3d2540ccb6beb758631f4b252.jpg)`, position: 'relative', objectFit: 'cover' }}>
                        <div class="Profile_user__iDkf1">
                            <div class="Profile_user-avatar__y8fSV">
                                <div class="FallbackAvatar_avatar__gmj3S"
                                    style={{ fontSize: '17.2px' }}
                                >
                                    {imageBase64 ? (
                                        <img class="avatar" src={imageBase64} alt="Null" />
                                    ) : (
                                        <img class="avatar" src={specialtyImg} alt="Null" />
                                    )}

                                </div>
                            </div>
                            <div class="Profile_user-name__xIJlY"><span>{lastName} {firstName}</span></div>
                        </div>
                    </div>

                    <div class="Profile_container__BVoU6">
                        <section class="index-module_row__-AHgh">
                            <section class="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-5__2UHWy">
                                <div class="content-left">
                                    <div class="Box_wrapper__uAKHJ">
                                        <h3 class="Box_title__kFB9-" style={{ marginBottom: '30px', marginLeft: '123px', fontSize: '22px' }}>Thông tin tài khoản</h3>
                                        <div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Tên:</label>
                                                <input class="InputField_fieldContentInput__lO21W text-box single-line"
                                                    value={firstName}
                                                    onChange={(event) => { this.handleOnChangeFirstName(event, 'firstName') }}
                                                    type="text" />
                                                <span class="field-validation-valid text-danger" data-valmsg-for="FullName" data-valmsg-replace="true"></span>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Họ:</label>
                                                <input class="InputField_fieldContentInput__lO21W text-box single-line"
                                                    value={lastName}
                                                    onChange={(event) => { this.handleOnChangeLastName(event, 'lastName') }}
                                                    type="text" />
                                                <span class="field-validation-valid text-danger" data-valmsg-for="FullName" data-valmsg-replace="true"></span>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Số điện thoại:</label>
                                                <input class="InputField_fieldContentInput__lO21W text-box single-line"
                                                    value={phonenumber}
                                                    onChange={(event) => { this.handleOnChangePhone(event, 'phonenumber') }}
                                                    type="text" />
                                                <span class="field-validation-valid text-danger" data-valmsg-for="Phone" data-valmsg-replace="true"></span>
                                            </div>
                                            <button type="submit" class="custom-btn btn-13" onClick={() => this.handleSaveUser()} style={{ marginTop: '-14px' }}>Cập nhật</button>
                                        </div>
                                    </div>
                                    <div class="Box_wrapper__uAKHJ">
                                        <h4 class="Box_title__kFB9-">Hoạt động gần đây</h4>
                                        <div>
                                            <div class="Profile_no-result__O7P-W">Chưa có hoạt động gần đây</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-7__kRbS-">
                                <div class="Box_wrapper__uAKHJ">
                                    <h4 class="Box_title__kFB9-">Các khóa học đã tham gia</h4>
                                </div>
                            </section>
                        </section>
                    </div>
                </section>

                <HomeFooter isShowBanner={false} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        userInfo: state.user.userInfo,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
