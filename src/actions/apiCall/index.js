import axios from 'axios'
import { API_ROOT } from '../../util/constand'
export const getAllBoard = async () => {
    const res = await axios.get(`${API_ROOT}/board`)
    console.log(res.data.data)
    return res.data.data
}
export const fetchBoard = async (id) => {
    const res = await axios.get(`${API_ROOT}/board/${id}`)

    return res.data
}
export const createBoard = async (data) => {
    const res = await axios.post(`${API_ROOT}/board`, data)
    return res.data.data
}
export const updateBoard = async (id, data) => {
    const res = await axios.put(`${API_ROOT}/board/${id}`, data)

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
