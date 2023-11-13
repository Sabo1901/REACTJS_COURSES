import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import './CreateBlog.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import img from "../../../assets/nodejs.png";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { getDetailInforBlog } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            previewImgURL: '',
            userId: '',
            title: '',
            avatar: '',
            detail: '',
            blogEditId: '',
            listCourses: [],
            detailBlog: {},
            hasOldData: false,
            isOpen: false,
            action: ''

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforBlog(id);

            if (res && res.errCode === 0) {
                let detail = res.data;
                let imageBase64 = '';
                if (detail.image) {
                    imageBase64 = new Buffer(detail.image, 'base64').toString('binary');
                }
                this.setState({
                    blogEditId: detail.id,
                    contentHTML: detail.contentHTML,
                    contentMarkdown: detail.contentMarkdown,
                    description: detail.description,
                    title: detail.title,
                    avatar: '',
                    previewImgURL: detail.image,
                    userId: detail.id,
                    action: CRUD_ACTIONS.EDIT,
                })
                console.log('check detail:', detail.image)
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleSaveContentMarkdown = () => {
        //let { hasOldData } = this.state;
        this.props.editABlogRedux({
            id: this.state.blogEditId,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            detail: this.state.detail,
            title: this.state.title,
            avatar: this.state.avatar,
            userId: this.state.userId,
            action: 'EDIT'
        })
        //window.location.href = "/listblog";
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    OpenPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleEditVideoFromParent = (blog) => {
        console.log('video check from parent:', blog);
        let imageBase64 = '';
        if (blog.image) {
            imageBase64 = new Buffer(blog.image, 'base64').toString('binary');
        }

        this.setState({
            contentHTML: blog.contentHTML,
            contentMarkdown: blog.contentMarkdown,
            description: blog.description,
            title: blog.title,
            detail: blog.detail,
            avatar: '',
            previewImgURL: imageBase64,
            blogEditId: blog.id,
            //userId: blog.id,
            action: CRUD_ACTIONS.EDIT,
        })
    }


    render() {
        //let { detailBlog } = this.state;
        let { title, contentHTML, contentMarkdown, description } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div class="NewPost_wrapper__QUJ12" style={{ marginTop: '24px', padding: '0px 32px', width: '100%', display: 'flex' }}>
                    <div class="NewPost__item" style={{ width: '100%', display: 'flex' }}>

                        <div class="NewPost__item_left" style={{ width: '60%' }} handleEditVideoFromParent={this.handleEditVideoFromParent}
                            action={'EDIT'}>


                            <textarea class="ContentEditable_wrapper__YxeRy NewPost_title-input__d-X6s" cols="20" rows="2" style={{ border: 'none', lineHeight: '1.4', outline: 'none', color: 'rgb(41, 41, 41)', fontSize: '32px', fontWeight: '500', height: '100px', width: '95%', borderBottom: '1px solid rgba(0,0,0,.15' }}
                                onChange={(event) => this.onChangeInput(event, 'title')}
                                value={title}
                            >


                            </textarea>

                            <div className='manage-course-editor'>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={contentMarkdown}
                                />

                            </div>
                        </div>


                        <div class="NewPost__item_right" style={{ width: '40%', marginLeft: '20px' }}>

                            <div>
                                {/* <label><FormattedMessage id="manage-course.image" /></label> */}
                                <div className='preview-img-container'>
                                    <input type='file' id='previewImg' hidden onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label className='custom-btn btn-13' htmlFor='previewImg' style={{ color: '#ffffff', padding: '10px 40px' }}>Tải ảnh</label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})`, width: '375px', height: '250px', borderRadius: '6px', objectFit: 'cover' }}
                                        onClick={() => this.OpenPreviewImage()}


                                    >

                                    </div>
                                </div>

                            </div>

                            <div>
                                <textarea class="ContentEditable_wrapper__YxeRy NewPost_title-input__d-X6s" cols="20" name="ChitietTieuDe" placeholder="Mô tả khi tin được hiển thị" rows="2" style={{ border: 'none', borderBottom: '1px solid rgba(0,0,0,.15)', margin: '1.6rem 0 4px', paddingBottom: '4px', lineHeight: '1.4', marginTop: '60px', outline: 'none', color: 'rgb(41, 41, 41)', fontSize: '1.5rem', wordBreak: 'break-word', height: '90px', width: '95%' }}
                                    onChange={(event) => this.onChangeInput(event, 'description')}
                                    value={description}

                                >


                                </textarea>
                                <span class="field-validation-valid text-danger" data-valmsg-for="ChitietTieuDe" data-valmsg-replace="true"></span>

                            </div>

                            <div class="form-group">
                                <button type="submit"
                                    onClick={() => this.handleSaveContentMarkdown()}
                                    class="btn custom-btn btn-1">Đăng bài</button>
                            </div>
                        </div>

                        {this.state.isOpen === true &&

                            <Lightbox
                                mainSrc={this.state.previewImgURL}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        }

                    </div>
                </div>
                <HomeFooter isShowBanner={false} />

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveCreateBlog: (data) => dispatch(actions.saveCreateBlog(data)),
        editABlogRedux: (data) => dispatch(actions.editABlog(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
