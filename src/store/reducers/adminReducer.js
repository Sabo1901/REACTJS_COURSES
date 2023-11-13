import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    users: [],
    courses: [],
    blogs: [],
    topCourses: [],
    topBlogs: [],
    blogsUser: [],
    videos: [],
    videosCourse: [],
    roadmap: [],
    scholastics: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAILDED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAILDED:
            state.roles = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILDED:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_COURSES_SUCCESS:
            state.courses = action.courses;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_COURSES_FAILDED:
            state.courses = [];
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_COURSES_SUCCESS:
            state.topCourses = action.dataCourses;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_COURSES_FAILDED:
            state.topCourses = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BLOGS_SUCCESS:
            state.blogs = action.blogs;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BLOGS_FAILDED:
            state.blogs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_BLOGS_SUCCESS:
            state.topBlogs = action.datablogs;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_BLOGS_FAILDED:
            state.topBlogs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BLOGS_USER_SUCCESS:
            state.blogsUser = action.blogs;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BLOGS_USER_FAILDED:
            state.blogsUser = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_VIDEOS_SUCCESS:
            state.videos = action.videos;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_VIDEOS_FAILDED:
            state.videos = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_VIDEOS_COURSE_SUCCESS:
            state.videosCourse = action.videosCourse;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_VIDEOS_COURSE_FAILDED:
            state.videosCourse = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_ROADMAPS_SUCCESS:
            state.roadmap = action.roadmap;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_ROADMAPS_FAILDED:
            state.roadmap = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHOLASTICS_SUCCESS:
            state.scholastics = action.scholastics;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHOLASTICS_FAILDED:
            state.scholastics = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;