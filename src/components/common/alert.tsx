/*
|-----------------------------------------
| setting up ui for alert
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2022
|-----------------------------------------
*/


type alertProps = {
    type: string;
    displayTitle?: boolean;
    process?: boolean;
    linkto?: string | null,
    message: string | null,
}

const Alert = (props:alertProps) => {

    let style;
    let headingType;

    switch (props.type) {
        case 'danger':
            style = 'bg-red-100 border-red-500 text-red-700';
            headingType = 'danger';
            break;
        case 'warning':
            style = 'bg-yellow-100 border-yellow-500 text-yellow-700';
            headingType = 'warning';
            break;

        case 'info':
            style = 'bg-blue-200 border-blue-400 text-blue-800';
            headingType = 'attention';
            break;

        default:
            style = 'bg-green-200 border-green-500 text-green-800';
            headingType = 'success';
            break;
    }
    return (

        <div className={`${style} border-l-4 p-4 w-full`} role="alert">
            {
                props.displayTitle && (
                    <p className={`font-bold uppercase`}>{headingType}</p>
                )
            }
            
            <p className = {`${props.process ? 'flex justify-start items-center' : ''}`}>
                {props.message}
            </p>
            {
                props.linkto && (
                    <a className='font-bold underline capitalize' href={`/${props.linkto}`}>{props.linkto}</a>
                )
            }
        </div>
    )
}

export default Alert;
