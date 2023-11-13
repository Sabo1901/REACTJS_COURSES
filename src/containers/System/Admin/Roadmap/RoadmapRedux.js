import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import '../CourseRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageRoadmap from './TableManageRoadmap';



class RoadmapRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseArr: [],
            scholasticArr: [],

            action: '',
            roadmapEditId: '',

            courseId: '',
            scholasticId: '',
            semester: '',
            credit: '',
            prerequisite: '',

        }
    }

    componentDidMount() {

        this.props.fetchCourseRedux();
        this.props.fetchScholasticRedux();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCourses !== this.props.listCourses) {
            let arrCourses = this.props.listCourses;
            this.setState({
                courseArr: arrCourses,
                courseId: arrCourses && arrCourses.length > 0 ? arrCourses[0].id : ''
            })
        }
        if (prevProps.scholastics !== this.props.scholastics) {
            let arrScholastics = this.props.scholastics;
            this.setState({
                scholasticArr: arrScholastics,
                scholasticId: arrScholastics && arrScholastics.length > 0 ? arrScholastics[0].id : ''
            })
        }
        if (prevProps.roadmap !== this.props.roadmap) {
            let arrCourses = this.props.listCourses;
            let arrScholastics = this.props.scholastics;
            this.setState({
                courseId: '',
                scholasticId: '',
                semester: '',
                credit: '',
                prerequisite: '',
                courseId: arrCourses && arrCourses.length > 0 ? arrCourses[0].id : '',
                scholasticId: arrScholastics && arrScholastics.length > 0 ? arrScholastics[0].id : '',
                action: CRUD_ACTIONS.CREATE,

            })
        }
    }

    handleSaveRoadmap = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewRoadmap({
                semester: this.state.semester,
                credit: this.state.credit,
                prerequisite: this.state.prerequisite,
                courseId: this.state.courseId,
                scholasticId: this.state.scholasticId,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editARoadmapRedux({
                id: this.state.roadmapEditId,
                semester: this.state.semester,
                credit: this.state.credit,
                prerequisite: this.state.prerequisite,
                courseId: this.state.courseId,
                scholasticId: this.state.scholasticId,
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['courseId', 'scholasticId', 'semester', 'credit', 'prerequisite']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditRoadmapFromParent = (roadmap) => {

        this.setState({
            courseId: roadmap.courseId,
            scholasticId: roadmap.scholasticId,
            semester: roadmap.semester,
            credit: roadmap.credit,
            prerequisite: roadmap.prerequisite,
            action: CRUD_ACTIONS.EDIT,
            roadmapEditId: roadmap.id
        })
    }


    render() {
        let language = this.props.language;
        let courses = this.state.courseArr;
        let scholastics = this.state.scholasticArr;
        let { courseId, scholasticId, semester, credit, prerequisite } = this.state;

        return (

            <div className="user-redux-container" >
                <div className='title'>
                    <FormattedMessage id="manage-course.add" />
                </div>

                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-roadmap.courseId" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'courseId') }}
                                    value={courseId}
                                >
                                    {courses && courses.length > 0 &&
                                        courses.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.nameCourse}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-roadmap.scholasticId" /></label>
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
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-roadmap.semester" /></label>
                                <input className='form-control' type='text'
                                    value={semester}
                                    onChange={(event) => { this.onChangeInput(event, 'semester') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-roadmap.credit" /></label>
                                <input className='form-control' type='text'
                                    value={credit}
                                    onChange={(event) => { this.onChangeInput(event, 'credit') }}
                                />
                            </div>
                            <div className='col-3' style={{ marginTop: '20px' }}>
                                <label><FormattedMessage id="manage-roadmap.prerequisite" /></label>
                                <input className='form-control' type='text'
                                    value={prerequisite}
                                    onChange={(event) => { this.onChangeInput(event, 'prerequisite') }}
                                />
                            </div>

                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveRoadmap()}>

                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-course.edit" />
                                        :
                                        <FormattedMessage id="manage-course.save" />
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageRoadmap
                                    handleEditRoadmapFromParent={this.handleEditRoadmapFromParent}
                                    action={this.state.action}
                                />
                            </div>

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
        listCourses: state.admin.courses,
        roadmap: state.admin.roadmap,
        scholastics: state.admin.scholastics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRoadmapRedux: () => dispatch(actions.fetchAllRoadmapsStart()),
        editARoadmapRedux: (data) => dispatch(actions.editARoadmap(data)),
        createNewRoadmap: (data) => dispatch(actions.createNewRoadmap(data)),
        fetchCourseRedux: () => dispatch(actions.fetchAllCoursesStart()),
        fetchScholasticRedux: () => dispatch(actions.fetchAllScholasticsStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadmapRedux);
