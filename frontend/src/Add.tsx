import React, { useState } from "react"
import "./styles/add.css"
import { apiUrl, addToQueue } from "./components/functions";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
function Add() {
    const [input, setinput] = useState<string | URL>()
    const [msg, setMsg] = useState<string | null>()
    const [search, setSearch] = useState<Array<any> | null>()

    const queryParams = new URLSearchParams(window.location.search);
    const tokenValue = queryParams.get('token');

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setinput(e.target.value)
    }

    function handleSeach() {
        if (!input) {
            return;
        }
        const q: string = input.toString();
        if (!q.includes("youtube.com") && !q.includes("youtu.be") && !q.includes("http")) {

            fetch(`${apiUrl}search/${q}`)
                .then(res => res.json())
                .then(data => {
                    setSearch(data.data)
                })
        }
    }

    function appendToQueue(videoId: string) {
        if (tokenValue && videoId) {
            addToQueue(tokenValue, videoId).then((data) => setMsg(data))
            setinput("")
            setSearch(null)
        }
    }

    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault()
        try {
            if (input) {
                const URI = new URL(input)
                let videoId = URI.searchParams.get("v")
                if (!videoId) {
                    videoId = URI.pathname.split("/")[1]
                }
                if (tokenValue && videoId) {
                    appendToQueue(videoId)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="add-container">
            <center>
                <Link to="/" style={{ textDecoration: "none" }}>
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
                        variant="outlined" value={input instanceof URL ? input.href : input} onChange={handleInput} />
                    <div className="add-form-buttons">
                        <Button variant="outlined" type="submit">Add</Button>
                        <Button variant="outlined" onClick={handleSeach}>Search</Button>
                    </div>
                </form>
                <span>{msg}</span>
            </center>
            <div className="search-container">
                {search && search.map((item: any) => {

                    return (
                        <div className="queue-element playing" onClick={() => appendToQueue(item.id.videoId)}>
                            <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
                            <div className="queue-item-details">
                                <h4>{item.snippet.title}</h4>
                            </div>
                        </div>
                    )
                }
                )}

            </div>

        </div>
    )
}

export default Add