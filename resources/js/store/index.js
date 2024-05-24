import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import setting from '@/store/setting'
import crud from '@/store/crud'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,setting,crud
    }
})

export default store
