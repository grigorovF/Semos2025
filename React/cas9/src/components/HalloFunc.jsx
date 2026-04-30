import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {sayHallo} from './../actions/SayHalloActions'

export const HelloFunc = () => {
    const dispatch = useDispatch();
    const greetings = useSelector(state=>state.SayHello)
    <div>
        <h2>finc</h2>
    </div>
}