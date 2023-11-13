import { atom } from "recoil";

const userState = atom({
    key: 'userState', //unique ID
    default: {
        username: '',
        email: '',
        token: ''
    }
})

export default userState