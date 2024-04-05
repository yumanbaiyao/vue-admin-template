import { login, logout, getMenus } from '@/api/user'
import { getToken, setToken, removeToken, getAvatar, setAvatar, removeAvatar, setName, getName, removeName, getMenu, setMenu, removeMenu } from '@/utils/auth'
import { resetRouter, resetRouter2, router } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getName(),
    avatar: getAvatar(),
    menu: getMenu()
  }
}

const filterProperties = (item) => {  
  // 创建一个新对象，只包含id、name和children属性  
  const newItem = {    
    path: item.url, 
    component: ()=>import('@/view'+item.url),
    meta: {title: item.menuName,icon: item.icon} , 
    children: item.children ? item.children.map(filterProperties) : undefined, // 递归处理children  
  };  
  return newItem;  
}



const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    
    const self = this; // 将this保存在变量self中
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), password: password }).then(response => {
        const { data } = response
        let userId = data.user.userId;
        getMenus(userId).then(response =>{
            const { data } = response;
            let menus = data.menus;
            const myMenus = menus.map((filterProperties));
            resetRouter(['admin']);
            commit('SET_MENU', myMenus);
            setMenu(myMenus)
        });

        commit('SET_TOKEN', data.token);
        commit('SET_NAME', data.user.userName);
        commit('SET_AVATAR', data.user.avatar);
        setToken(data.token);
        setAvatar(data.user.avatar);
        setName(data.user.userName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    // commit('SET_NAME', 'admin')
    // commit('SET_AVATAR', null)
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeAvatar()
        removeName()
        // resetRouter2()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

