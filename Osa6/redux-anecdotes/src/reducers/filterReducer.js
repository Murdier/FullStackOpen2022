import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        filterWithContent(state, action) {
            console.log('filterWithContent')
            const content = action.payload
            return {
                type: 'SET_FILTER',
                payload: { content }
            }
        },
        filterReducer(state, action) {
            console.log('filterReducer')
            switch (action.type) {
                case 'SET_FILTER':
                    return action.payload.content
                default:
                    return state
            }
        }
    }
})

export const { filterWithContent, filterReducer } = filterSlice.actions
export default filterSlice.reducer