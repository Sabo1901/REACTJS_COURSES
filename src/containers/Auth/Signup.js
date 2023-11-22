import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { Redirect } from "react-router-dom";
import { createNewUserService } from '../../services/userService';
import { toast } from "react-toastify";

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            scholasticArr: [],
            scholasticId: '',
            confirmpassword: '',
            role: 'R3',
            isShowPassword: false,
            errMessage: '',
            errCode: ''
        }

    }

    componentDidMount() {

        this.props.fetchScholasticRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.scholastics !== this.props.scholastics) {
            let arrScholastics = this.props.scholastics;
            this.setState({
                scholasticArr: arrScholastics,
                scholasticId: arrScholastics && arrScholastics.length > 0 ? arrScholastics[0].id : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrScholastics = this.props.scholastics;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                scholasticId: '',
                address: '',
                scholasticId: arrScholastics && arrScholastics.length > 0 ? arrScholastics[0].id : '',
                avatar: '',
            })
        }
    }


    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })

    }
    handleSaveUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        this.props.createNewClient({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            roleId: this.state.role,
            scholasticId: this.state.scholasticId,
        })





    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleShowhidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['firstName', 'lastName', 'email', 'password', 'scholasticId', 'confirmpassword', 'role']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                // alert('This input is required: ' + arrCheck[i])
                toast.error('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    returnToLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/loginclient`)
        }
    }

    render() {
        let language = this.props.language;
        let scholastics = this.state.scholasticArr;
        let { email, password, firstName, lastName, scholasticId, confirmpassword, role } = this.state;

        return (

            <div className="login-background">
                <div className='login-container' style={{ width: '450px', height: '600px' }}>
                    <div className='login-content row' style={{ padding: '25px' }}>
                        <div className='col-12 text-login'>Signup</div>
                        <div className='col-12 form-group login-input'>
                            <label>Firstname</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your firstname'
                                value={firstName}
                                onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Lastname</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your lastname'
                                value={lastName}
                                onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Email</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(event) => { this.onChangeInput(event, 'email') }} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input

                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                />
                                <span
                                    onClick={() => { this.handleShowhidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Confirm Password</label>
                            <div className='custom-input-password'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your confirm password'
                                    value={confirmpassword}
                                    onChange={(event) => { this.onChangeInput(event, 'confirmpassword') }}
                                />
                                <span
                                    onClick={() => { this.handleShowhidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Course Student</label>
                            <select className='form-control'
                                onChange={(event) => { this.onChangeInput(event, 'scholasticId') }}
                                value={scholasticId}
                            >
                                {scholastics && scholastics.length > 0 &&
                                    scholastics.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.scholastic}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleSaveUser()}>Sign up</button>
                        </div>
                        {/* <div className='col-12'>
                            <span className='forgot-password'>For got your password?</span>
                        </div>
                        <div className='col-12 text-center mt-5'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div> */}
                        <div className='col-12 text-center mt-3' >
                            <span className='text-other-login'>Already have an account? </span>
                            <span className='text-other-login' style={{ fontWeight: '700', cursor: 'pointer', color: '#004abd' }}
                                onClick={() => this.returnToLogin()}
                            >Login</span>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        scholastics: state.admin.scholastics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //  userLoginFail: () => dispatch(actions.adminLoginFail()),
        createNewClient: (data) => dispatch(actions.createNewClient(data)),
        userLoginSuccess: (userInfo) => dispatch(actions.userClientLoginSuccess(userInfo)),
        fetchScholasticRedux: () => dispatch(actions.fetchAllScholasticsStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
