import { urlFetchs } from "../const/urlfetch"

export const refreshToken = () =>
  fetch(`${urlFetchs}/api/auth/refresh`, {
    method: "GET",
    credentials: "include",
  })

export const getUser = () =>
  fetch(`${urlFetchs}/api/user/me`, {
    method: "GET",
    credentials: "include",
  })

export const updateUser = (user) =>
  fetch(`${urlFetchs}/api/user/update`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })

export const validateUser = () =>
  fetch(`${urlFetchs}/api/user/validate`, {
    method: "GET",
    credentials: "include",
  })

export const isAdmin = () =>
  fetch(`${urlFetchs}/api/user/isAdmin`, {
    method: "GET",
    credentials: "include",
  })

export const createUser = (user) =>
  fetch(`${urlFetchs}/api/user/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })

export const LoginUser = (user) =>
  fetch(`${urlFetchs}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })

export const LogoutUser = () =>
  fetch(`${urlFetchs}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
  })
