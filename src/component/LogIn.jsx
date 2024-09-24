import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = ({ onDataFromLogin }) => {
    const navigate = useNavigate();
    const [ inputVal, setInputVal ] = useState({
        userId: "",
        userPw: ""
    });
    const [ userIdPw, setUserIdPw ] = useState([]); // have user_id and user_pw

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputVal(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const getUserIdPw = async () => {
        try {
            const user = await axios.get('/findUser');
            console.log('Successfully get users data.');
            setUserIdPw(user.data);
        } catch (error) {
            console.error('Error getting user_id, user_pw from userInfo table: ', error);
        }
    }

    useEffect(() => {
        getUserIdPw();
    }, [])

    useEffect(() => {
        console.log('Final userIdPw: ', userIdPw);
    }, [userIdPw]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if((inputVal.userId === '') || (inputVal.userPw === '')) {
            document.querySelector('.warning').textContent = `All forms should be filled.`;
        } else {
            const userInfo = { userId: inputVal.userId, userPw: inputVal.userPw };
            userIdPw.forEach((pair) => {
                if((pair.user_id === userInfo.userId) || (pair.user_pw === userInfo.userPw)) {
                    setTimeout(() => {
                        onDataFromLogin(true);
                        window.localStorage.setItem('userId', inputVal.userId);
                        window.localStorage.setItem('userPw', inputVal.userPw);
                        navigate('/main');
                    })
                } else {
                    document.querySelector('.warning').textContent = `Id and Pw not matched.`; 
                }
            })
        }
    };

    return (
        <div className='LogIn'>
            <h3>Log In Area</h3>
            Id: <input type="text" name='userId' value={inputVal.userId} onChange={handleInput} /> <br />
            Password: <input type="text" name='userPw' value={inputVal.userPw} onChange={handleInput} /> <br />
            <span className='warning'></span> <br />
            <button onClick={(e) => handleSubmit(e)}>Log In </button>
        </div>
    );
};

export default LogIn;