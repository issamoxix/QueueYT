import React, { useState } from "react"
import "./styles/add.css"
import { addToQueue } from "./components/functions";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
function Add() {
    const [input, setinput] = useState<string | URL>()
    const [msg, setMsg] = useState<string | null>()

    const queryParams = new URLSearchParams(window.location.search);
    const tokenValue = queryParams.get('token');

    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault()
        try {
            if (input) {
                const URI = new URL(input)
                const videoId = URI.searchParams.get("v")
                if (tokenValue && videoId) {
                    addToQueue(tokenValue, videoId).then((data) => setMsg(data))
                    setinput("")
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="add-container">
            <center>
                <Link to="/" style={{textDecoration:"none"}}>
                    <h1 className="App-title">Youtube<span>Q</span></h1>
                </Link>

                <h4>Add Video To The Queue</h4>
                <form onSubmit={onFormSubmit} className="add-form">
                    <TextField sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                                color: "white"
                            },
                            '&:hover fieldset': {
                                borderColor: 'blue',
                                color: "white"
                            },
                            '&.Mui-focused fieldset': {
                                color: "white"
                            }
                        }, '&.Mui-focused .MuiInputLabel-outlined': {
                            color: 'white'
                        }
                    }} InputLabelProps={{
                        style: { color: 'white' },
                    }}
                        inputProps={{
                            style: { color: 'white' },
                        }} id="outlined-basic"
                        label="Youtube Video "
                        variant="outlined" value={input instanceof URL ? input.href : input} onChange={(e) => setinput(e.target.value)} />
                    <Button variant="outlined" type="submit">Add</Button>
                </form>
                <span>{msg}</span>
            </center>
        </div>
    )
}

export default Add