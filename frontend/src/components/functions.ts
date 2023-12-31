// const apiUrl = "http://localhost:5000/"
const apiUrl = "http://192.168.178.21:5000/"

export async function fetchData(token: string) {
    const response = await fetch(`${apiUrl}getqueue?token=${token}`)
    const json = await response.json()
    return json
}

export type VideoData = {
    videos: Array<string>
    token: string
    videos_info?: any
}

export async function fetchToken() {
    const response = await fetch(`${apiUrl}token`)
    const json = await response.json()
    return json.data
}

export async function addToQueue(token: string, video_id: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "token": token,
        "video_id": video_id
    });


    const response = await fetch(`${apiUrl}item`, { headers: myHeaders, method: "POST", body: raw })
    const json = await response.json()
    return json.message
}

export async function deQueueItem(token: string, item: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "token": token,
        "video_id": item
    })

    const response = await fetch(`${apiUrl}dequeue`, { headers: myHeaders, method: "POST", body: raw })
    const json = await response.json()
    return json.data
}