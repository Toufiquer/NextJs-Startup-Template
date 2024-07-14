/*
|----------------------------------------------
| setting up spinner for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2022
|----------------------------------------------
*/
import {ImSpinner3} from 'react-icons/im'

export const Spinner = (props) => {
    return (
        <div className={'flex flex-col justify-center items-center'}>
            <ImSpinner3 className={`w-6 h-6 animate-spin ${props.textColor || 'text-slate-700'}`} />
        </div>
    )
}
