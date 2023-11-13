import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../containers/HomePage/HomePage';
import DetailCourse from '../containers/Client/Courses/DetailCourse';
class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        // let linkToRedirect = isLoggedIn ? '/system/user-manage' : <DetailCourse />;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

        return (
            <Redirect to={linkToRedirect} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
