import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminRedux from '../containers/System/Admin/AdminRedux';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import CourseRedux from '../containers/System/Admin/CourseRedux';
import VideoRedux from '../containers/System/Admin/Video/VideoRedux';
import BlogRedux from '../containers/System/Admin/Blog/BlogRedux';
import ScholasticRedux from '../containers/System/Admin/Roadmap/ScholasticRedux';
import RoadmapRedux from '../containers/System/Admin/Roadmap/RoadmapRedux';
import Header from '../containers/Header/Header';
import ManageCourse from '../containers/System/Admin/ManageCourse';
class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={AdminRedux} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/course-redux" component={CourseRedux} />
                            <Route path="/system/manage-course" component={ManageCourse} />
                            <Route path="/system/manage-blog" component={BlogRedux} />
                            <Route path="/system/video-redux" component={VideoRedux} />
                            <Route path="/system/scholastic-redux" component={ScholasticRedux} />
                            <Route path="/system/roadmap-redux" component={RoadmapRedux} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
