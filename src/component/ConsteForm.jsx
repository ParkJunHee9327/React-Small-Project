import React from 'react';
import './ConsteForm.css';
// import aquarius from '../img/aquarius.webp';
// import aries from '../img/aries.webp';
// import cancer from '../img/cancer.webp';
// import capricornus from '../img/capricornus.png';
// import gemini from '../img/gemini.webp';
// import leo from '../img/leo.webp';
// import libra from '../img/libra.webp';
// import pisces from '../img/pisces.webp';
// import sagittarius from '../img/sagittarius.webp';
// import scorpious from '../img/scorpious.png';
// import taurus from '../img/taurus.webp';
// import virgo from '../img/virgo.webp';

// [ aquarius, aries, cancer, capricornus, gemini, leo, livra, pisces, sagittarius, scorpious, taurus, virgo ]


const ConsteForm = ({ conste, imgs }) => {
    const { conste_name, conste_visible_season, conste_description } = conste;
    // conste_visible_season's structure: '{"northern": ["fall"], "southern": ["spring"]}'

    const consteSeason = JSON.parse(conste_visible_season);
    // consteSeason is an object, which looks like {northern: ["winter"], southern:["summer"]}
    const northern = consteSeason["northern"];
    const southern = consteSeason["southern"];

    console.log(imgs);

    return (
        <div className='ConsteForm'>
            <div className="conste-container">
                <div className="upper">
                    <img src={imgs} alt="zodiac-constellations" /> 
                    <div className="title">{conste_name}</div>
                </div>
                <div className="lower">
                    <div className="desc">{conste_description}</div>
                    {/* {consteSeason["northern"].map((se) => (
                        <div className="visible-season">Northern: {se}</div>
                    ))} */}
                    {
                        northern.length === 1 ? <div className="visible-season">{`Northern: ${northern[0]}`}</div> : (northern.length === 2) ? <div className="visible-season">{`Northern: ${northern[0]}, ${northern[1]}`}</div> : console.log('Unknown length for northern.')
                    }
                    {
                        southern.length === 1 ? <div className="visible-season">{`Southern: ${southern[0]}`}</div> : (southern.length === 2) ? <div className="visible-season">{`Southern: ${southern[0]}, ${southern[1]}`}</div> : console.log('Unknown length for southern.')
                    }
                </div>
            </div>
        </div>
    );
};

export default ConsteForm;