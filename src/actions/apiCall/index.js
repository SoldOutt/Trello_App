import axios from 'axios'
import { API_ROOT } from '../../util/constand'
export const fetchBoard = async (id) => {
    const res = await axios.get(`${API_ROOT}/board/${id}`)
    console.log(res)
    return res.data
}
