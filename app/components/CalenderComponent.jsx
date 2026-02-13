import { DateRange } from 'react-date-range';
import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const CalenderComponent = ({onDatesSelect}) => {
    const [show, setshow] = useState(false);
    const [seleceddates, setselecteddates] = useState(null);
    const [date, setdate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const handledates = async () => {
        const startDate = date[0].startDate.toLocaleDateString();
        const endDate = date[0].endDate.toLocaleDateString();
        setselecteddates(`selected dates:${startDate}-${endDate}`);
        const bookingdates = { startDate, endDate };
        setshow(false);
        if(onDatesSelect){
            onDatesSelect(bookingdates);
        }
        console.log("booking dates:", bookingdates);
    }
    return (
        <div className="calender">

            <div className="date" onClick={() => setshow(!show)}>
                {!seleceddates
                    ? `${date[0].startDate.toLocaleDateString()} - ${date[0].endDate.toLocaleDateString()}`
                    : seleceddates}
            </div>

            {show && (
                <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setdate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                />
            )}

            <button onClick={handledates}>Select Dates</button>

        </div>

    )
}

export default CalenderComponent
