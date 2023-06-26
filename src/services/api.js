import axios from "axios"

export const api = axios.create({
    baseURL:"https://ytmad.azurewebsites.net/"
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

export const GetVideoInfoUrl = async (url) =>{
    return api.get('Ytmad/VideoInfo?url=' + url ).then(result =>{
        return result
    })

    .catch(e => {
        console.error(e)
        return {code: 400}
    })
}