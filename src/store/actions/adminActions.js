import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService, editUserService, saveCreateBlogService,
    getAllBlogs, getTopBlogHomeService, getAllBlogsUser, deleteBlogService,
    editBlogService
} from "../../services/userService";
import {
    createNewCourseService, editCourseService,
    deleteCourseService, getAllCourses, getTopCourseHomeService,
    saveDetailCourseService, getAllVideos,
    createNewVideoService, editVideoService,
    deleteVideoService, getAllVideosCourse,
    getAllRoadmaps, createNewRoadmapService,
    editRoadmapService, deleteRoadmapService,
    getAllScholastics, createNewScholasticService,
    editScholasticService, deleteScholasticService
} from "../../services/courseService";
import { userClientLoginSuccess } from "../actions/userActions";
import { Redirect } from "react-router-dom";
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
export const fetchAUsersStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers(userId);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users))
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


export const saveCreateBlog = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveCreateBlogService(data);
            if (res && res.errCode === 0) {
                toast.success("Save Detail Course succeed");
                dispatch({
                    type: actionTypes.SAVE_CREATE_BLOG_SUCCESS,
                    data: data
                })
            } else {
                toast.error("Save Detail Course error");
                dispatch({
                    type: actionTypes.SAVE_CREATE_BLOG_FAILDED
                })
            }
        } catch (e) {
            toast.error("Save Detail Course error");
            dispatch({
                type: actionTypes.SAVE_CREATE_BLOG_FAILDED
            })
        }
    }
}

//CLIENT

export const createNewClient = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveClientSuccess());
                window.location.href = "/loginclient"

            } else {
                toast.error("Your email is already in used!")
                dispatch(saveClientFailed());
            }
        } catch (e) {
            toast.error("Your email is already in used!")
            dispatch(saveClientFailed());
        }
    }
}


export const saveClientSuccess = () => ({
    type: actionTypes.CREATE_CLIENT_SUCCESS
})

export const saveClientFailed = () => ({
    type: actionTypes.CREATE_CLIENT_FAILDED
})

//BLOG

export const fetchAllBlogsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBlogs("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllBlogsSuccess(res.blogs.reverse()))
            } else {
                toast.error("Fetch all Blog error!")
                dispatch(fetchAllBlogsFaided());
            }
        } catch (e) {
            toast.error("Fetch all Blog error!")
            dispatch(fetchAllBlogsFaided());
        }
    }
}
export const fetchAllBlogsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BLOGS_SUCCESS,
    blogs: data
})

export const fetchAllBlogsFaided = () => ({
    type: actionTypes.FETCH_ALL_BLOGS_FAILDED,
})


export const fetchTopBlog = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopBlogHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_BLOGS_SUCCESS,
                    datablogs: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_BLOGS_FAILDED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_BLOGS_FAILDED
            })
        }
    }
}


export const fetchAllBlogsUserStart = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBlogsUser(inputId);
            if (res && res.errCode === 0) {
                console.log('check all:', inputId);
                dispatch(fetchAllBlogsUserSuccess(res.blogs.reverse()))
            } else {
                toast.error("Fetch all Blog error!")
                dispatch(fetchAllBlogsUserFaided());
            }
        } catch (e) {
            toast.error("Fetch all Blog error!")
            dispatch(fetchAllBlogsUserFaided());
        }
    }
}
export const fetchAllBlogsUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BLOGS_USER_SUCCESS,
    blogs: data
})

export const fetchAllBlogsUserFaided = () => ({
    type: actionTypes.FETCH_ALL_BLOGS_USER_FAILDED,
})

//VIDEO

export const createNewVideo = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewVideoService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new Video succeed")
                dispatch(saveVideoSuccess())
                dispatch(fetchAllVideosStart());
            } else {
                toast.error("Create Video error!")
                dispatch(saveVideoFailed());
            }
        } catch (e) {
            toast.error("Create Video error!")
            dispatch(saveVideoFailed());
        }
    }
}


export const saveVideoSuccess = () => ({
    type: actionTypes.CREATE_VIDEO_SUCCESS
})

export const saveVideoFailed = () => ({
    type: actionTypes.CREATE_VIDEO_FAILDED
})

export const fetchAllVideosStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllVideos("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllVideosSuccess(res.videos.reverse()))
            } else {
                toast.error("Fetch all Video error!")
                dispatch(fetchAllVideosFaided());
            }
        } catch (e) {
            toast.error("Fetch all Video error!")
            dispatch(fetchAllVideosFaided());
        }
    }
}
export const fetchAllVideosSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_VIDEOS_SUCCESS,
    videos: data
})

export const fetchAllVideosFaided = () => ({
    type: actionTypes.FETCH_ALL_VIDEOS_FAILDED,
})

export const deleteAVideo = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteVideoService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete Video succeed");
                dispatch(deleteVideoSuccess())
                dispatch(fetchAllVideosStart());
            } else {
                toast.error("Delete Video error!");
                dispatch(deleteVideoFailed());
            }
        } catch (e) {
            toast.error("Delete Video error!");
            dispatch(deleteVideoFailed());
        }
    }
}

export const deleteVideoSuccess = () => ({
    type: actionTypes.DELETE_VIDEO_SUCCESS
})

export const deleteVideoFailed = () => ({
    type: actionTypes.DELETE_VIDEO_FAILDED
})

export const editAVideo = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editVideoService(data);
            if (res && res.errCode === 0) {
                toast.success("Update Video succeed");
                dispatch(editVideoSuccess())
                dispatch(fetchAllVideosStart());
            } else {
                toast.error("Update Video error!");
                dispatch(editVideoFailed());
            }
        } catch (e) {
            toast.error("Update Video error!");
            dispatch(editVideoFailed());
        }
    }
}

export const editVideoSuccess = () => ({
    type: actionTypes.EDIT_VIDEO_SUCCESS
})

export const editVideoFailed = () => ({
    type: actionTypes.EDIT_VIDEO_FAILDED
})

export const fetchAllVideosCourseStart = (courseId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllVideosCourse(courseId);
            if (res && res.errCode === 0) {
                dispatch(fetchAllVideosCourseSuccess(res.videos))
            } else {
                toast.error("Fetch all Video error!")
                dispatch(fetchAllVideosCourseFaided());
            }
        } catch (e) {
            toast.error("Fetch all Video error!")
            dispatch(fetchAllVideosCourseFaided());
        }
    }
}
export const fetchAllVideosCourseSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_VIDEOS_COURSE_SUCCESS,
    videosCourse: data
})

export const fetchAllVideosCourseFaided = () => ({
    type: actionTypes.FETCH_ALL_VIDEOS_COURSE_FAILDED,
})


//BLOG

export const deleteABlog = (blogId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteBlogService(blogId);
            if (res && res.errCode === 0) {
                toast.success("Delete Video succeed");
                dispatch(deleteBlogSuccess());

            } else {
                toast.error("Delete Video error!");
                dispatch(deleteBlogFailed());
            }
        } catch (e) {
            toast.error("Delete Video error!");
            dispatch(deleteBlogFailed());
        }
    }
}

export const deleteABlogUser = (blogId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBlogService(blogId);
            if (res && res.errCode === 0) {
                toast.success("Delete Video succeed");
                dispatch(deleteBlogSuccess())


            } else {
                toast.error("Delete Video error!");
                dispatch(deleteBlogFailed());
            }
        } catch (e) {
            toast.error("Delete Video error!");
            dispatch(deleteBlogFailed());
        }
    }
}


export const deleteBlogSuccess = () => ({
    type: actionTypes.DELETE_BLOG_SUCCESS
})

export const deleteBlogFailed = () => ({
    type: actionTypes.DELETE_BLOG_FAILDED
})

export const editABlog = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editBlogService(data);
            if (res && res.errCode === 0) {
                toast.success("Update Video succeed");
                dispatch(editBlogSuccess());
                window.location.href = "/listblog";
                //dispatch(fetchAllVideosStart());
            } else {
                toast.error("Update Blog error!");
                dispatch(editBlogFailed());
            }
        } catch (e) {
            toast.error("Update Blog error!");
            dispatch(editBlogFailed());
        }
    }
}

export const editBlogSuccess = () => ({
    type: actionTypes.EDIT_BLOG_SUCCESS
})

export const editBlogFailed = () => ({
    type: actionTypes.EDIT_BLOG_FAILDED
})



//ROADMAP 

export const fetchAllRoadmapsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllRoadmaps("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllRoadmapsSuccess(res.roadmaps.reverse()))
            } else {
                toast.error("Fetch all Roadmap error!")
                dispatch(fetchAllRoadmapsFaided());
            }
        } catch (e) {
            toast.error("Fetch all Roadmap error!")
            dispatch(fetchAllRoadmapsFaided());
        }
    }
}
export const fetchARoadmapsStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllRoadmaps(id);
            if (res && res.errCode === 0) {
                dispatch(fetchAllRoadmapsSuccess(res.roadmaps))
            } else {
                toast.error("Fetch all Roadmap error!")
                dispatch(fetchAllRoadmapsFaided());
            }
        } catch (e) {
            toast.error("Fetch all Roadmap error!")
            dispatch(fetchAllRoadmapsFaided());
        }
    }
}
export const fetchAllRoadmapsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_ROADMAPS_SUCCESS,
    roadmap: data
})

export const fetchAllRoadmapsFaided = () => ({
    type: actionTypes.FETCH_ALL_ROADMAPS_FAILDED,
})



export const createNewRoadmap = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewRoadmapService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new Roadmap succeed")
                dispatch(saveRoadmapSuccess())
                dispatch(fetchAllRoadmapsStart());
            } else {
                toast.error("Create Roadmap error!")
                dispatch(saveRoadmapFailed());
            }
        } catch (e) {
            toast.error("Create Roadmap error!")
            dispatch(saveRoadmapFailed());
        }
    }
}


export const saveRoadmapSuccess = () => ({
    type: actionTypes.CREATE_ROADMAP_SUCCESS
})

export const saveRoadmapFailed = () => ({
    type: actionTypes.CREATE_ROADMAP_FAILDED
})

export const editARoadmap = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editRoadmapService(data);
            if (res && res.errCode === 0) {
                toast.success("Update Course succeed");
                dispatch(editRoadmapSuccess())
                dispatch(fetchAllRoadmapsStart());
            } else {
                toast.error("Update Roadmap error!");
                dispatch(editRoadmapFailed());
            }
        } catch (e) {
            toast.error("Update Roadmap error!");
            dispatch(editRoadmapFailed());
        }
    }
}

export const editRoadmapSuccess = () => ({
    type: actionTypes.EDIT_ROADMAP_SUCCESS
})

export const editRoadmapFailed = () => ({
    type: actionTypes.EDIT_ROADMAP_FAILDED
})

export const deleteARoadmap = (roadmapId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteRoadmapService(roadmapId);
            if (res && res.errCode === 0) {
                toast.success("Delete Roadmap succeed");
                dispatch(deleteRoadmapSuccess())
                dispatch(fetchAllRoadmapsStart());
            } else {
                toast.error("Delete Roadmap error!");
                dispatch(deleteRoadmapFailed());
            }
        } catch (e) {
            toast.error("Delete Roadmap error!");
            dispatch(deleteRoadmapFailed());
        }
    }
}

export const deleteRoadmapSuccess = () => ({
    type: actionTypes.DELETE_ROADMAP_SUCCESS
})

export const deleteRoadmapFailed = () => ({
    type: actionTypes.DELETE_ROADMAP_FAILDED
})


//SCHOLASTICS 

export const fetchAScholasticsStart = (scholasticId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllScholastics(scholasticId);
            if (res && res.errCode === 0) {
                dispatch(fetchAllScholasticsSuccess(res.scholastics))
            } else {
                toast.error("Fetch all Roadmap error!")
                dispatch(fetchAllScholasticsFaided());
            }
        } catch (e) {
            toast.error("Fetch all Roadmap error!")
            dispatch(fetchAllScholasticsFaided());
        }
    }
}


export const fetchAllScholasticsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllScholastics("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllScholasticsSuccess(res.scholastics.reverse()))
            } else {
                toast.error("Fetch all Roadmap error!")
                dispatch(fetchAllScholasticsFaided());
            }
        } catch (e) {
            toast.error("Fetch all Roadmap error!")
            dispatch(fetchAllScholasticsFaided());
        }
    }
}
export const fetchAllScholasticsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SCHOLASTICS_SUCCESS,
    scholastics: data
})

export const fetchAllScholasticsFaided = () => ({
    type: actionTypes.FETCH_ALL_SCHOLASTICS_FAILDED,
})



export const createNewScholastic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewScholasticService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new Scholastic succeed")
                dispatch(saveScholasticSuccess())
                dispatch(fetchAllScholasticsStart());
            } else {
                toast.error("Create Scholastic error!")
                dispatch(saveScholasticFailed());
            }
        } catch (e) {
            toast.error("Create Scholastic error!")
            dispatch(saveScholasticFailed());
        }
    }
}


export const saveScholasticSuccess = () => ({
    type: actionTypes.CREATE_SCHOLASTIC_SUCCESS
})

export const saveScholasticFailed = () => ({
    type: actionTypes.CREATE_SCHOLASTIC_FAILDED
})

export const editAScholastic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editScholasticService(data);
            if (res && res.errCode === 0) {
                toast.success("Update Scholastic succeed");
                dispatch(editScholasticSuccess())
                dispatch(fetchAllScholasticsStart());
            } else {
                toast.error("Update Scholastic error!");
                dispatch(editScholasticFailed());
            }
        } catch (e) {
            toast.error("Update Scholastic error!");
            dispatch(editScholasticFailed());
        }
    }
}

export const editScholasticSuccess = () => ({
    type: actionTypes.EDIT_SCHOLASTIC_SUCCESS
})

export const editScholasticFailed = () => ({
    type: actionTypes.EDIT_SCHOLASTIC_FAILDED
})

export const deleteAScholastic = (scholasticId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteScholasticService(scholasticId);
            if (res && res.errCode === 0) {
                toast.success("Delete Scholastic succeed");
                dispatch(deleteScholasticSuccess())
                dispatch(fetchAllScholasticsStart());
            } else {
                toast.error("Delete Scholastic error!");
                dispatch(deleteScholasticFailed());
            }
        } catch (e) {
            toast.error("Delete Scholastic error!");
            dispatch(deleteScholasticFailed());
        }
    }
}

export const deleteScholasticSuccess = () => ({
    type: actionTypes.DELETE_SCHOLASTIC_SUCCESS
})

export const deleteScholasticFailed = () => ({
    type: actionTypes.DELETE_SCHOLASTIC_FAILDED
})
