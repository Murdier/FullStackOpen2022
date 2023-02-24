let initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    console.log(action)
    let newState = {
        good: state.good,
        ok: state.ok,
        bad: state.bad
    }

    switch (action.type) {
        case 'GOOD':
            newState.good += 1;
            break;
        case 'OK':
            newState.ok += 1;
            break;
        case 'BAD':
            newState.bad += 1;
            break;
        case 'ZERO':
            newState.good = 0;
            newState.ok = 0;
            newState.bad = 0;
            break;
    }
    return newState
}

export default counterReducer