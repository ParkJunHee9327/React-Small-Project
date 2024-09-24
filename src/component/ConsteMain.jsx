import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ConsteMain.css';
import zodiacMainImg from '../img/zodiacConstellations.jpg';
import ConsteForm from './ConsteForm';
import { useNavigate } from 'react-router-dom';
import aquarius from '../img/aquarius.webp';
import aries from '../img/aries.webp';
import cancer from '../img/cancer.webp';
import capricornus from '../img/capricornus.png';
import gemini from '../img/gemini.webp';
import leo from '../img/leo.webp';
import libra from '../img/libra.webp';
import pisces from '../img/pisces.webp';
import sagittarius from '../img/sagittarius.webp';
import scorpious from '../img/scorpious.png';
import taurus from '../img/taurus.webp';
import virgo from '../img/virgo.webp';


const ConsteMain = () => {
    const navigate = useNavigate();
    const [ consteList, setConsteList ] = useState([]);
    const [ changeHeader, setChangeHeader ] = useState(false);
    // const imageArr = [
    //     '../img/aquarius.webp', '../img/aries.webp', '../img/cancer.webp', '../img/capricornus.png',
    //     '../img/gemini.webp', '../img/leo.webp', '../img/libra.webp', '../img/pisces.webp',
    //     '../img/sagittarius.webp', '../img/scorpious.png', '../img/taurus.webp', '../img/virgo.webp'
    // ];

    const imageArr = [
        aquarius, aries, cancer, capricornus, gemini, leo, libra, pisces, sagittarius, scorpious, taurus, virgo
    ]

    const getConsteData = async () => {
        try {
            const conste = await axios.get('/list');
            console.log('Successfully get constellation data.');
            setConsteList(conste.data);
            console.log(conste.data); // structure: [{...}, {...}, {...}]
        } catch (error) {
            console.error('Error from getting conste table: ', error);
        }
    }

    useEffect(() => {
        getConsteData();
    }, []);

    useEffect(() => {
        console.log('Final consteList: ', consteList);
    }, [consteList]);

    const handleClick = (name) => {
        switch (name) {
            case 'addBtn':
                navigate('/add');
                break;
            case 'modifyBtn':
                navigate('/modify');
                break;
            case 'logInBtn':
                navigate('/login');
                break;
            case 'signUpBtn':
                navigate('/signup');
                break;
            default:
                console.log("Unexpected btn's name.");
        }
    };

    const handleDataFromLogin = (isLogined) => {
        setChangeHeader(isLogined);
    }

    return (
        <div className='ConsteMain'>
            {/* header를 login 여부에 따라 다르게 출력할 것. */}
            {/* 이거를 하려면 LogIn에서 isLogined 데이터를 받아오되 띄우지는 않아야 하는데... */}
            {/* Redux 또는 Context API를 사용하지 않는 한 불가능하다고 함. */}
            {!changeHeader && 
                <header>
                    <button name='logInBtn' className='logInBtn btn' onClick={(e) => handleClick(e.target.name)} onDataFromLogin={handleDataFromLogin}>Log In</button>
                    <button name='signUpBtn' className='signUpBtn btn' onClick={(e) => handleClick(e.target.name)}>Sign Up</button>
                </header>
            }
            {changeHeader && 
                <header>
                    <button name='logOutBtn' className='logOutBtn btn' onClick={(e) => handleClick(e.target.name)}>Log Out</button>
                    <button name='signUpBtn' className='signUpBtn btn' onClick={(e) => handleClick(e.target.name)}>Sign Up</button>
                </header>
            }
            <div className="main-img">
                <img src={zodiacMainImg} alt="zodiac constellations main img" className='conste-main-img' />
            </div>
            <div className="title-container">
                <h1>Find your constellation</h1>
                <h3>Sparking beauty above the sky</h3>
            </div>
            <div className="content-container main-con">
                {consteList.map((conste, consteIdx) => (
                        // <li key={conste.conste_id}>{conste.conste_id}</li> // This works fine.
                        <ConsteForm key={conste.conste_id} conste={conste} imgs={imageArr[consteIdx]} />
                ))}
            </div>
            <div className="added-conste-container">
                {/* added constellations here */}
            </div>
            <div className="btn-container">
                <button name='addBtn' className='addBtn btn' onClick={(e) => handleClick(e.target.name)}>Add</button>
                <button name='modifyBtn' className='modifyBtn btn' onClick={(e) => handleClick(e.target.name)}>Modify</button>
            </div>
        </div>
    );
};

export default ConsteMain;