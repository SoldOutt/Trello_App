import axios from 'axios'
import { API_ROOT } from '../../util/constand'
export const fetchBoard = async (id) => {
    const res = await axios.get(`${API_ROOT}/board/${id}`)
    console.log(res)
    return res.data
}
export const createNewTask = async (data) => {
    const res = await axios.post(`${API_ROOT}/task`, data)
    console.log(res)
    return res.data.data
}
export const updateTask = async (data) => {
    const res = await axios.put(`${API_ROOT}/task/${data._id}`, data)
    console.log(res)
    return res.data.data
}
export const createNewColumn = async (data) => {
    const res = await axios.post(`${API_ROOT}/column`, data)
    console.log(res)
    return res.data.data
}
export const updateColumn = async (id, data) => {
    const res = await axios.put(`${API_ROOT}/column/${id}`, data)

    return res.data.data
}
export const deleteColumn = async (id) => {
    const res = await axios.delete(`${API_ROOT}/column/${id}`)
    return res.data.data
}
