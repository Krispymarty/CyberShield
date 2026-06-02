import { useState } from "react";

function Hello(){
    const[num, setNum] = useState(0);
    return(
    <>
        <div className="flex-col justify-center items-center bg-blue-200 gap-2">
            <p className="flex justify-center p-4">Number: {num}</p>
            <div className="flex justify-center gap-2">
            <button className=" bg-white b rounded-2xl p-3 ">Increment + </button>
            <button className=" bg-white  rounded-2xl p-3">Decrement - </button>
            </div>
        </div>
    </>
    );
}
export default Hello;