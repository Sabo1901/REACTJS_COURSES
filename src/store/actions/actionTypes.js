const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',



    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILDED: 'FETCH_GENDER_FAILDED',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILDED: 'FETCH_ROLE_FAILDED',

    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILDED: 'FETCH_ALL_USERS_FAILDED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILDED: 'CREATE_USER_FAILDED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILDED: 'EDIT_USER_FAILDED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILDED: 'DELETE_USER_FAILDED',

    //COURSE

    FETCH_ALL_COURSES_SUCCESS: 'FETCH_ALL_COURSES_SUCCESS',
    FETCH_ALL_COURSES_FAILDED: 'FETCH_ALL_COURSES_FAILDED',

    CREATE_COURSE_SUCCESS: 'CREATE_COURSE_SUCCESS',
    CREATE_COURSE_FAILDED: 'CREATE_COURSE_FAILDED',

    EDIT_COURSE_SUCCESS: 'EDIT_COURSE_SUCCESS',
    EDIT_COURSE_FAILDED: 'EDIT_COURSE_FAILDED',

    DELETE_COURSE_SUCCESS: 'DELETE_COURSE_SUCCESS',
    DELETE_COURSE_FAILDED: 'DELETE_COURSE_FAILDED',

    FETCH_TOP_COURSES_SUCCESS: 'FETCH_TOP_COURSES_SUCCESS',
    FETCH_TOP_COURSES_FAILDED: 'FETCH_TOP_COURSES_FAILDED',

    SAVE_DETAIL_COURSE_SUCCESS: 'SAVE_DETAIL_COURSE_SUCCESS',
    SAVE_DETAIL_COURSE_FAILDED: 'SAVE_DETAIL_COURSE_FAILDED',
})

export default actionTypes;