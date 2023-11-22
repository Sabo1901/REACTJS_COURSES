import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            searchKeyword: '',
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }
    filterUsers() {
        const { usersRedux, searchKeyword } = this.state;
        let roles = this.props.roleRedux;
        if (!searchKeyword) {
            return usersRedux;
        }
        const lowercasedKeyword = searchKeyword.toLowerCase();
        return usersRedux.filter(user => {
            const role = roles.find(role => role.keyMap === user.roleId);
            const roleName = role ? role.valueVi : "Không tìm thấy";
            // Chuyển đổi giá trị và từ khóa tìm kiếm thành chữ thường
            const lowercasedRoleName = roleName.toLowerCase();
            const lowercasedLastName = user.lastName.toString().toLowerCase();
            const lowercasedEmail = user.email.toString().toLowerCase();
            const lowercasedFirstName = user.firstName.toString().toLowerCase();

            return (
                lowercasedRoleName.includes(lowercasedKeyword) ||
                lowercasedLastName.includes(lowercasedKeyword) ||
                lowercasedEmail.includes(lowercasedKeyword) ||
                lowercasedFirstName.includes(lowercasedKeyword)
            );
        });
    }
    render() {
        let arrUsers = this.filterUsers();
        let roles = this.props.roleRedux;
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
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                const role = roles.find(role => role.keyMap === item.roleId);
                                const roleName = role ? role.valueVi : "Không tìm thấy";
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{roleName}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
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
        listUsers: state.admin.users,
        roleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
