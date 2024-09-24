import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Administrator = () => {

    const [ users, setUsers ] = useState([]);

    const getUsersData = async () => {
        try {
            const user = await axios.get('/users');
            console.log('Successfully get users data.');
            setUsers(user.data);
        } catch (error) {
            console.error('Error from getting userInfo table: ', error);
        }
    }

    useEffect(() => {
        getUsersData();
    }, []);

    useEffect(() => {
        console.log('Final users: ', users);
    }, [users]);

    if(users.length > 0) {
        return (
            <div className='Administrator'>
                <h3>Administration Area</h3>
                {
                    users.map((user) => (
                        <div key={user.user_num} className="user-container">
                            <div className="name">{user.user_name}</div>
                            <div className="id">{user.user_id}</div>
                            <div className="pw">{user.user_pw}</div>
                            <div className="birth">{user.user_birth}</div>
                            <button>DELETE USER</button>
                        </div>
                    ))
                }
            </div>
        );
    }
};

export default Administrator;