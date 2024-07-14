/*
|-----------------------------------------
| setting up current time ui
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: mealngiht, 2022
|-----------------------------------------
*/

import {useEffect, useState} from 'react';

import dayjs from 'dayjs';
dayjs.locale('en-GB');

const CurrentTime = () => {

    const [currentTime, handleCurrentTime] = useState(dayjs().format('hh:mm:ss a'));

    //update current Time
    useEffect(() => {
        setInterval(() => {
            handleCurrentTime(dayjs().format('hh:mm:ss a'));
        }, 1 * 1000)
    },[])

    return (
        <div className={'my-2 flex justify-center items-center'}>
            <div className={'bg-orange-500 w-56 py-2 px-2 flex justify-center items-center rounded'}>
                <p className={'text-white font-semibold'}>
                    Current Time {currentTime}
                </p>
            </div>
        </div>
    )
}

export default CurrentTime;
