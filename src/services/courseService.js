import axios from '../axios';


const getAllCourses = (inputId) => {
    return axios.get(`/api/get-all-courses?id=${inputId}`)
}

const createNewCourseService = (data) => {
    return axios.post('/api/create-new-course', data)
}
const editCourseService = (inputData) => {
    return axios.put('/api/edit-course', inputData);
}
const deleteCourseService = (courseId) => {
    return axios.delete('/api/delete-course', {
        data: {
            id: courseId
        }
    });
}
const getTopCourseHomeService = (limit) => {
    return axios.get(`/api/top-course-home?limit=${limit}`);
}

const saveDetailCourseService = (data) => {
    return axios.post('/api/save-detail-courses', data);
}
const getDetailInforCourse = (inputId) => {
    return axios.get(`/api/get-detail-courses-by-id?id=${inputId}`);
}
export {
    createNewCourseService, editCourseService,
    deleteCourseService, getAllCourses,
    getTopCourseHomeService, saveDetailCourseService,
    getDetailInforCourse,
}