import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../TableManageUser.scss';
import * as actions from "../../../../store/actions";


class TableManageRoadmap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roadmapsRedux: [],
            detailCourse: {},
            detailscholastic: {},
            searchKeyword: '',
        }
    }

    componentDidMount() {
        this.props.fetchRoadmapRedux();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roadmap !== this.props.roadmap) {
            this.setState({
                roadmapsRedux: this.props.roadmap
            })
        }
    }

    handleDeleteRoadmap = (roadmap) => {
        this.props.deleteARoadmapRedux(roadmap.id);
    }

    handleEditRoadmap = (roadmap) => {
        this.props.handleEditRoadmapFromParent(roadmap)
    }
    filterRoadmaps() {
        const { roadmapsRedux, searchKeyword } = this.state;
        let courses = this.props.courses;
        let scholastics = this.props.scholastics;
        if (!searchKeyword) {
            return roadmapsRedux;
        }
        return roadmapsRedux.filter(roadmap => {
            const course = courses.find(course => course.id === roadmap.courseId);
            const courseName = course ? course.nameCourse : "Không tìm thấy";
            const scholastic = scholastics.find(scholastic => scholastic.id === roadmap.scholasticId);
            const scholasticName = scholastic ? scholastic.scholastic : "Không tìm thấy";
            return (
                roadmap.semester.toString().includes(searchKeyword) ||
                courseName.includes(searchKeyword) ||
                scholasticName.includes(searchKeyword) ||
                roadmap.credit.toString().includes(searchKeyword) ||
                roadmap.prerequisite.toString().includes(searchKeyword)
            );
        });
    }
    render() {
        let arrRoadmaps = this.filterRoadmaps();
        let courses = this.props.courses;
        let scholastics = this.props.scholastics;

        return (
            <React.Fragment>
                <div className='col-3' style={{ marginBottom: '30px' }}>
                    <label>Tìm kiếm</label>
                    <input
                        className='form-control'
                        type='text'
                        value={this.state.searchKeyword}
                        onChange={(event) => { this.setState({ searchKeyword: event.target.value }) }}
                    />
                </div>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id="manage-roadmap.courseId" /></th>
                            <th><FormattedMessage id="manage-roadmap.scholasticId" /></th>
                            <th><FormattedMessage id="manage-roadmap.semester" /></th>
                            <th><FormattedMessage id="manage-roadmap.credit" /></th>
                            <th><FormattedMessage id="manage-roadmap.prerequisite" /></th>
                            <th><FormattedMessage id="manage-course.action" /></th>
                        </tr>
                        {arrRoadmaps && arrRoadmaps.length > 0 &&
                            arrRoadmaps
                                .slice()
                                .sort((a, b) => a.courseId - b.courseId)
                                .map((item, index) => {
                                    const course = courses.find(course => course.id === item.courseId);
                                    const courseName = course ? course.nameCourse : "Không tìm thấy";
                                    const scholastic = scholastics.find(scholastic => scholastic.id === item.scholasticId);
                                    const scholasticName = scholastic ? scholastic.scholastic : "Không tìm thấy";
                                    console.log('name:', course);
                                    return (
                                        <tr key={index}>
                                            <td>{courseName}</td>
                                            <td>{scholasticName}</td>
                                            <td>{item.semester}</td>
                                            <td>{item.credit}</td>
                                            <td>{item.prerequisite}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditRoadmap(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteRoadmap(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                        }

                    </tbody>
                </table>

            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        scholastics: state.admin.scholastics,
        roadmap: state.admin.roadmap,
        courses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRoadmapRedux: () => dispatch(actions.fetchAllRoadmapsStart()),
        deleteARoadmapRedux: (id) => dispatch(actions.deleteARoadmap(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageRoadmap);
