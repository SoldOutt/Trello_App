import React, { useState } from 'react'
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { boardReducer } from '../reducer/boardReducer'
export const BoardContext = createContext()
const BoardContextProvider = ({ children }) => {
    const [boardState, dispatch] = useReducer(boardReducer, {
        board: {},
    })

    const getBoard = () => {
        try {
            const res = await axios.get(`${API_ROOT}/board/${id}`)
            dispatch({
                type: 'GET_BOARD',
                payload: response.data.data,
            })
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: error.message }
        }
    }
    const columnDrop = () => {}
    const createTask = () => {}
    const createColumn = () => {}
    const updateColumn = () => {}
    const deleteColumn = () => {}
    const dropColumn = () => {}
    const dropTask = () => {}

    return <BoardContext.Provider>{children}</BoardContext.Provider>
}

export default BoardContextProvider
