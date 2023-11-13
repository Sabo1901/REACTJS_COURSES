import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coursesRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchCourseRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCourses !== this.props.listCourses) {
            this.setState({
                coursesRedux: this.props.listCourses
            })
        }
    }

    handleDeleteCourse = (course) => {
        this.props.deleteACourseRedux(course.id);
    }

    handleEditCourse = (course) => {
        this.props.handleEditCourseFromParent(course)
    }
    render() {
        let arrCourses = this.state.coursesRedux;
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id="manage-course.nameCourse" /></th>
                            <th><FormattedMessage id="manage-course.lecturers" /></th>
                            <th><FormattedMessage id="manage-course.detail" /></th>
                            <th><FormattedMessage id="manage-course.describe" /></th>
                            <th><FormattedMessage id="manage-course.tantamount" /></th>
                            <th><FormattedMessage id="manage-course.viewed" /></th>
                            <th><FormattedMessage id="manage-course.action" /></th>
                        </tr>
                        {arrCourses && arrCourses.length > 0 &&
                            arrCourses.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.nameCourse}</td>
                                        <td>{item.lecturers}</td>
                                        <td>{item.detail}</td>
                                        <td>{item.describe}</td>
                                        <td>{item.tantamount}</td>
                                        <td>{item.viewed}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditCourse(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteCourse(item)}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}

            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listCourses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRedux: () => dispatch(actions.fetchAllCoursesStart()),
        deleteACourseRedux: (id) => dispatch(actions.deleteACourse(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageCourse);
