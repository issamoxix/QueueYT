const apiUrl = "http://localhost:5000/"

export async function fetchData(token: string) {
    const response = await fetch(`${apiUrl}getqueue?token=${token}`)
    const json = await response.json()
    return json
}

export type VideoData = {
    videos: Array<string>
    token: string
  }