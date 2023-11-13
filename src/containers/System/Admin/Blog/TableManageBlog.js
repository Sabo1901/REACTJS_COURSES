import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../TableManageUser.scss';
import * as actions from "../../../../store/actions";


class TableManageBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogsRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchBlogRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listBlogs !== this.props.listBlogs) {
            this.setState({
                blogsRedux: this.props.listBlogs
            })
        }
    }

    handleDeleteVideo = (blog) => {
        this.props.deleteABlogRedux(blog.id);
    }
    render() {
        let arrBlogs = this.state.blogsRedux;
        const { listUsers } = this.props;
        return (

            <React.Fragment>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Chi tiết</th>
                            <th>Người viết</th>
                            <th>Actions</th>
                        </tr>
                        {arrBlogs && arrBlogs.length > 0 &&
                            arrBlogs.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>
                                            {item.contentMarkdown}
                                        </td>
                                        {/* <td>{item.userId}</td> */}

                                        <td>{item.userId}</td>

                                        <td>

                                            <button className='btn-delete' onClick={() => this.handleDeleteVideo(item)}><i className="fas fa-trash-alt"></i></button>
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
        listBlogs: state.admin.blogs,
        courses: state.admin.courses,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBlogRedux: () => dispatch(actions.fetchAllBlogsStart()),

        deleteABlogRedux: (id) => dispatch(actions.deleteABlog(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBlog);
