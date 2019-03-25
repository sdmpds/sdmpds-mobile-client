const http = "http://localhost:3000";
import axios from 'axios'

export const fetchPins = async () => {
    return await axios.get(`${http}/pins/all/}`)
        .then((result) => {
            return result.data
        })
        .catch(reject => console.log(reject))
}