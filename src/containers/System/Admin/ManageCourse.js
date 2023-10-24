import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageCourse.scss';
import Select from 'react-select';
import { getDetailInforCourse } from "../../../services/courseService";
import { CRUD_ACTIONS } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listCourses: [],
            hasOldData: false
        }
    }

    componentDidMount() {
        this.props.fetchCourseRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.courses !== this.props.courses) {
            let dataSelect = this.buildDataInputSelect(this.props.courses)
            this.setState({
                listCourses: dataSelect
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.nameCourse}`;
                object.value = item.id;
                result.push(object)
            })
            return result;

        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailCourse({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            courseId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailInforCourse(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-course-container'>
                <div className='manage-course-title'>
                    Tạo thêm thông tin khóa học
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>


                        <label>Chọn khóa học:</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listCourses}

                        />
                    </div>
                    <div className='content-right form-group'>
                        <label>Thông tin chi tiết:</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>

                    </div>

                </div>
                <div className='manage-course-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-course" : "create-content-course"}>
                    {hasOldData === true ?
                        <span> Lưu thông tin</span> : <span> Tạo thông tin</span>
                    }
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        courses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRedux: () => dispatch(actions.fetchAllCoursesStart()),
        saveDetailCourse: (data) => dispatch(actions.saveDetailCourse(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
