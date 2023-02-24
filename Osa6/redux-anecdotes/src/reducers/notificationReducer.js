import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            console.log('notificationWithContent')
            const content = action.payload
            return {
                type: 'SET_NOTIFICATION',
                payload: { content }
            }
        },
        clearNotification(state, action) {
            console.log('clearNotification')
            const content = action.payload
            return {
                type: 'CLEAR_NOTIFICATION',
                payload: { content }
            }
        },
        notificationReducer(state, action) {
            console.log('notificationReducer')
            console.log(action.payload.content)
            switch (action.type) {
                case 'SET_NOTIFICATION':
                    return action.payload.content
                case 'CLEAR_NOTIFICATION':
                    return ''
                default:
                    return ''
            }
        }
    }
})

export const { setNotification, notificationReducer, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer