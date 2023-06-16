import axios from "axios"

export const api = axios.create({
    baseURL:"https://localhost:7275"
})

export const GetVideoUrl = async (url) =>{
    return api.get('Ytmad/VideoSearch?query=' + url ).then(result =>{
        return result
    })

    .catch(e => {
        console.error(e)
        return {code: 400}
    })
}