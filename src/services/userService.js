import axios from '../axios';


const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const handleLoginApiClient = (email, password) => {
    return axios.post('/api/loginClient', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const saveCreateBlogService = (data) => {
    return axios.post('/api/save-create-blog', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getAllBlogs = (inputId) => {
    return axios.get(`/api/get-all-blogs?id=${inputId}`)
}
const getDetailInforBlog = (inputId) => {
    return axios.get(`/api/get-detail-blogs-by-id?id=${inputId}`);
}

const getTopBlogHomeService = (limit) => {
    return axios.get(`/api/top-blog-home?limit=${limit}`);
}
const getAllBlogsUser = (inputId) => {
    return axios.get(`/api/get-all-blogs-user?userId=${inputId}`)
}
const deleteBlogService = (blogId) => {
    return axios.delete('/api/delete-blog', {
        data: {
            id: blogId
        }
    });
}
const editBlogService = (inputData) => {
    return axios.put('/api/edit-blog', inputData);
}
export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    handleLoginApiClient, saveCreateBlogService,
    getAllBlogs, getDetailInforBlog,
    getTopBlogHomeService, getAllBlogsUser,
    deleteBlogService, editBlogService
}