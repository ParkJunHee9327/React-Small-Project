import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

    const [ inputVal, setInputVal ] = useState({
        userName: "",
        userId: "",
        userPw: ""
    });
    const [ userBirth, setUserBirth ] = useState('');

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputVal(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleUserBirth = (e) => {
        const date = e.target.value;
        setUserBirth(date);
        console.log(date, typeof date);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if((inputVal.userName === '') || (inputVal.userId === '') || (inputVal.userPw === '')) {
            document.querySelector('.warning').textContent = `All forms should be filled.`;
        } else {
            const userData = {...inputVal, userBirth};
            console.log(userData, typeof userData); // Checked.
            try {
                const res = await axios.post('/addUser', userData);
                console.log(res);
                alert('Successfully signed up.');
                setTimeout(() => {
                    window.location.href = "/main";
                }, 1000);
            } catch (error) {
                console.log("Error signing up: ", error);
            }
        }
    };

    return (
        <div className='SignUp'>
            <h3>SignUp Area</h3>
            Name: <input type="text" name='userName' value={inputVal.userName} onChange={handleInput} /> <br />
            Id: <input type="text" name='userId' value={inputVal.userId} onChange={handleInput} /> <br />
            Password: <input type="text" name='userPw' value={inputVal.userPw} onChange={handleInput} /> <br />
            Birth: <input type="date" name='userBirth' value={userBirth} onChange={handleUserBirth} />
            <span className='warning'></span> <br />
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    );
};

export default SignUp;