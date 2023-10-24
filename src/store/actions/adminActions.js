import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService, editUserService
} from "../../services/userService";
import {
    createNewCourseService, editCourseService,
    deleteCourseService, getAllCourses, getTopCourseHomeService,
    saveDetailCourseService
} from "../../services/courseService";

import { toast } from "react-toastify";


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFaided());
            }
        } catch (e) {
            dispatch(fetchGenderFaided());
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFaided());
            }
        } catch (e) {
            dispatch(fetchRoleFaided());
        }
    }

}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new User succeed")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Create User error!")
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Create User error!")
            dispatch(saveUserFailed());
        }
    }
}


export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Fetch all User error!")
                dispatch(fetchAllUsersFaided());
            }
        } catch (e) {
            toast.error("Fetch all User error!")
            dispatch(fetchAllUsersFaided());
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFaided = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete User succeed");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete User error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete User error!");
            dispatch(deleteUserFailed());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update User succeed");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update User error!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update User error!");
            dispatch(editUserFailed());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})

//COURSE 

export const fetchAllCoursesStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCourses("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllCoursesSuccess(res.courses.reverse()))
            } else {
                toast.error("Fetch all Course error!")
                dispatch(fetchAllCoursesFaided());
            }
        } catch (e) {
            toast.error("Fetch all Course error!")
            dispatch(fetchAllCoursesFaided());
        }
    }
}
export const fetchAllCoursesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_COURSES_SUCCESS,
    courses: data
})

export const fetchAllCoursesFaided = () => ({
    type: actionTypes.FETCH_ALL_COURSES_FAILDED,
})



export const createNewCourse = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCourseService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new Course succeed")
                dispatch(saveCourseSuccess())
                dispatch(fetchAllCoursesStart());
            } else {
                toast.error("Create Course error!")
                dispatch(saveCourseFailed());
            }
        } catch (e) {
            toast.error("Create Course error!")
            dispatch(saveCourseFailed());
        }
    }
}


export const saveCourseSuccess = () => ({
    type: actionTypes.CREATE_COURSE_SUCCESS
})

export const saveCourseFailed = () => ({
    type: actionTypes.CREATE_COURSE_FAILDED
})

export const editACourse = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCourseService(data);
            if (res && res.errCode === 0) {
                toast.success("Update Course succeed");
                dispatch(editCourseSuccess())
                dispatch(fetchAllCoursesStart());
            } else {
                toast.error("Update Course error!");
                dispatch(editCourseFailed());
            }
        } catch (e) {
            toast.error("Update Course error!");
            dispatch(editCourseFailed());
        }
    }
}

export const editCourseSuccess = () => ({
    type: actionTypes.EDIT_COURSE_SUCCESS
})

export const editCourseFailed = () => ({
    type: actionTypes.EDIT_COURSE_FAILDED
})

export const deleteACourse = (courseId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCourseService(courseId);
            if (res && res.errCode === 0) {
                toast.success("Delete Course succeed");
                dispatch(deleteCourseSuccess())
                dispatch(fetchAllCoursesStart());
            } else {
                toast.error("Delete Course error!");
                dispatch(deleteCourseFailed());
            }
        } catch (e) {
            toast.error("Delete Course error!");
            dispatch(deleteCourseFailed());
        }
    }
}

export const deleteCourseSuccess = () => ({
    type: actionTypes.DELETE_COURSE_SUCCESS
})

export const deleteCourseFailed = () => ({
    type: actionTypes.DELETE_COURSE_FAILDED
})

export const fetchTopCourse = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopCourseHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_COURSES_SUCCESS,
                    dataCourses: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_COURSES_FAILDED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_COURSES_FAILDED
            })
        }
    }
}

export const saveDetailCourse = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailCourseService(data);
            if (res && res.errCode === 0) {
                toast.success("Save Detail Course succeed");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_COURSE_SUCCESS
                })
            } else {
                toast.error("Save Detail Course error");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_COURSE_FAILDED
                })
            }
        } catch (e) {
            toast.error("Save Detail Course error");
            dispatch({
                type: actionTypes.SAVE_DETAIL_COURSE_FAILDED
            })
        }
    }
}