import React, { useState } from "react"
import "./styles/add.css"
import { addToQueue } from "./components/functions";
function Add() {
    const [input, setinput] = useState<string | URL>()
    const [msg, setMsg] = useState<string | null>()

    const queryParams = new URLSearchParams(window.location.search);
    const tokenValue = queryParams.get('token');
    
    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault()
        try{
            if(input){
                const URI = new URL(input)
                const videoId = URI.searchParams.get("v")
                if (tokenValue && videoId){
                    addToQueue(tokenValue, videoId).then((data)=> setMsg(data))
                    setinput("")
                }
            }

        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="add-container">
            <center>
                <h1>Add Item</h1>
                <form onSubmit={onFormSubmit} >
                    <input value={input instanceof URL ? input.href : input} onChange={(e) => setinput(e.target.value)} type="text" placeholder="Video Url" required />
                    <input type="submit" value="Add To Queue" />
                </form>
                <span>{msg}</span>
            </center>
        </div>
    )
}

export default Add