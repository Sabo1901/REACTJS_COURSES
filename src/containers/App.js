import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';

import {
    userIsAuthenticated, userIsNotAuthenticated,
    userClientIsNotAuthenticated, userClientIsAuthenticated
} from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import LoginClient from './Auth/LoginClient';
import Signup from './Auth/Signup';
import System from '../routes/System';
import CreateBlog from './Client/Blog/CreateBlog';
import ListBlog from './Client/Blog/ListBlog';
import DetailBlog from './Client/Blog/DetailBlog';
import BlogUser from './Client/Blog/BlogUser';
import EditBlog from './Client/Blog/EditBlog';
import DetailVideo from './Client/Courses/DetailVideo.js';
import Roadmap from './Client/Roadmap/Roadmap.js';
import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage.js';
import CustomScrollbars from '../components/CustomScrollbars';
import DetailCourse from './Client/Courses/DetailCourse';
import CoursePage from './Client/Courses/CoursePage';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {/* {this.props.isLoggedIn && <Header />} */}

                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.LOGINCLIENT} component={userClientIsNotAuthenticated(LoginClient)} />
                                    <Route path={path.SIGNUP} component={Signup} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_COURSE} component={DetailCourse} />
                                    <Route path={path.LISTCOURSE} component={CoursePage} />
                                    <Route path={path.LISTBLOG} component={ListBlog} />
                                    <Route path={path.BLOGUSER} component={BlogUser} />
                                    <Route path={path.DETAIL_BLOG} component={DetailBlog} />
                                    <Route path={path.DETAIL_VIDEO} component={DetailVideo} />
                                    <Route path={path.EDITBLOGUSER} component={EditBlog} />
                                    <Route path={path.ROADMAP} component={Roadmap} />
                                    <Route path={path.BLOG} component={userClientIsAuthenticated(CreateBlog)} />
                                    {/* <Route path={path.DETAIL_COURSE} component={userClientIsAuthenticated(DetailCourse)} /> */}

                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position='bottom-right'
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);