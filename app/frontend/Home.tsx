import React, {useEffect} from "react";
import "./style.css"
// @ts-ignore

const Home = () => {

    return (
        <div className="flex flex-col items-center justify-center w-[100vw] p-2 bg-red-300">
            <h1 className="text-9xl">Welcome to Lingua</h1>
            <button className="bg-green-100">Login</button>
        </div>
    );
};

export default Home;