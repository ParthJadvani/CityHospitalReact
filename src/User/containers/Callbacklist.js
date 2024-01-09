import React, { useEffect, useState } from 'react';

function Callbacklist({item}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("hello children");
        setData(item(5))
    }, [item])
    return (
        <div>
            <ul>
                {
                    data.map((d,i) => {
                        return(
                            <li key={i}>{d}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default Callbacklist;