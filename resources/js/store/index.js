import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import setting from '@/store/setting'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,setting,
    }
})

export default store
