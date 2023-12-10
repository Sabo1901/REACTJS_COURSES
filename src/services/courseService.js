import axios from '../axios';

const apiKey = 'API1';

const getAllCourses = (inputId) => {
    return axios.get(`/api/get-all-courses?id=${inputId}`);
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


//VIDEO
const getAllVideos = (inputId) => {
    return axios.get(`/api/get-all-videos?id=${inputId}`)
}

const createNewVideoService = (data) => {
    return axios.post('/api/create-new-video', data)
}
const editVideoService = (inputData) => {
    return axios.put('/api/edit-video', inputData);
}
const deleteVideoService = (videoId) => {
    return axios.delete('/api/delete-video', {
        data: {
            id: videoId
        }
    });
}
const getAllVideosCourse = (inputId) => {
    return axios.get(`/api/get-all-videos-course?courseId=${inputId}`)
}



//Roadmap
const getAllRoadmaps = (inputId) => {
    return axios.get(`/api/get-all-roadmap?scholasticId=${inputId}`)
}
const getRoadmaps = (inputId) => {
    return axios.get(`/api/get-roadmaps?id=${inputId}`)
}
const createNewRoadmapService = (data) => {
    return axios.post('/api/create-new-roadmap', data)
}
const editRoadmapService = (inputData) => {
    return axios.put('/api/edit-roadmap', inputData);
}
const deleteRoadmapService = (roadmapId) => {
    return axios.delete('/api/delete-roadmap', {
        data: {
            id: roadmapId
        }
    });
}

//Scholastic
const getAllScholastics = (inputId) => {
    return axios.get(`/api/get-all-scholastic?id=${inputId}`)
}

const getAScholastics = (inputId) => {
    return axios.get(`/api/get-detail-scholastics-by-id?id=${inputId}`)
}

const createNewScholasticService = (data) => {
    return axios.post('/api/create-new-scholastic', data)
}
const editScholasticService = (inputData) => {
    return axios.put('/api/edit-scholastic', inputData);
}
const deleteScholasticService = (scholasticId) => {
    return axios.delete('/api/delete-scholastic', {
        data: {
            id: scholasticId
        }
    });
}

export {
    createNewCourseService, editCourseService,
    deleteCourseService, getAllCourses,
    getTopCourseHomeService, saveDetailCourseService,
    getDetailInforCourse, getAllVideos,
    createNewVideoService, editVideoService,
    deleteVideoService, getAllVideosCourse,
    getAllRoadmaps, createNewRoadmapService,
    editRoadmapService, deleteRoadmapService,
    getAllScholastics, createNewScholasticService,
    editScholasticService, deleteScholasticService,
    getAScholastics, getRoadmaps
}