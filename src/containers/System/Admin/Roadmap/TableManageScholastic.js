import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../TableManageUser.scss';
import * as actions from "../../../../store/actions";


class TableManageScholastic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scholasticsRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchScholasticRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.scholastics !== this.props.scholastics) {
            this.setState({
                scholasticsRedux: this.props.scholastics
            })
        }
    }

    handleDeleteScholastic = (scholastic) => {
        this.props.deleteAscholasticRedux(scholastic.id);
    }

    handleEditScholastic = (scholastic) => {
        this.props.handleEditScholasticFromParent(scholastic)
    }
    render() {
        let arrScholastics = this.state.scholasticsRedux;
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id="manage-roadmap.scholastic" /></th>
                            <th><FormattedMessage id="manage-roadmap.prerequisiteId" /></th>
                            {/* <th><FormattedMessage id="manage-roadmap.image" /></th> */}
                            <th><FormattedMessage id="manage-course.action" /></th>
                        </tr>
                        {arrScholastics && arrScholastics.length > 0 &&
                            arrScholastics.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.scholastic}</td>
                                        <td>{item.prerequisiteId}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditScholastic(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteScholastic(item)}><i className="fas fa-trash-alt"></i></button>
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
        scholastics: state.admin.scholastics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchScholasticRedux: () => dispatch(actions.fetchAllScholasticsStart()),
        deleteAscholasticRedux: (id) => dispatch(actions.deleteAScholastic(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageScholastic);
