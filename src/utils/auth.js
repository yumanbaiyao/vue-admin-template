import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const AvatarKey = 'vue_admin_template_avatar'
const NameKey = 'vue_admin_template_name'
const MenuKey = 'vue_admin_template_menu'


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAvatar() {
  return Cookies.get(AvatarKey)
}

export function setAvatar(avatar) {
  return Cookies.set(AvatarKey, avatar)
}

export function removeAvatar() {
  return Cookies.remove(AvatarKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  return Cookies.set(NameKey, name)
}

export function removeName() {
  return Cookies.remove(NameKey)
}

export function getMenu() {
  return Cookies.get(MenuKey)
}

export function setMenu(menu) {
  return Cookies.set(MenuKey, menu)
}

export function removeMenu() {
  return Cookies.remove(MenuKey)
}