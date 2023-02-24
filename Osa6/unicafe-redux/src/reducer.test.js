import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
      let state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
      let state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

    test('bad is incremented', () => {
        const action = {
            type: 'BAD'
        }
        let state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1
        })
    })

    test('ok is incremented', () => {
        const action = {
            type: 'OK'
        }
        let state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0
        })
    })

    test('clear works', () => {
        //Add OK
        let action = {
            type: 'OK'
        }
        let state = initialState
        deepFreeze(state)
        state = counterReducer(state, action)

        //Add Bad
        action = {
            type: 'BAD'
        }
        deepFreeze(state)
        state = counterReducer(state, action)

        //Add Good
        action = {
            type: 'GOOD'
        }
        deepFreeze(state)
        state = counterReducer(state, action)

        //Check that adding worked
        expect(state).toEqual({
            good: 1,
            ok: 1,
            bad: 1
        })

        //Check that clearing works
        action = {
            type: 'ZERO'
        }
        deepFreeze(state)
        state = counterReducer(state, action)
        expect(state).toEqual({
            good: 0,
            ok: 0,
            bad: 0
        })
    })
})