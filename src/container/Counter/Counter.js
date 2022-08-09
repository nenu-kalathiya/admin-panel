import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Decrement, Increment } from '../../redux/action/Counter.Action';


function Counter(props) {

    const dispatch = useDispatch()
    const co = useSelector(state => state.counter)

    const handleIncrement = () => {
        dispatch(Increment())
    }

    const handleDecrement = () => {
        dispatch(Decrement())
    }

    return (
        <div>
            <button onClick={() => handleIncrement()}>+</button>
            <p>{co.counter}</p>
            <button onClick={() => handleDecrement()}>-</button>
        </div>
    );
}

export default Counter;