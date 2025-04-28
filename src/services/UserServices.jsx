import { urlForFetchs } from "../utils/urlForFetchs"

export const getUser = () =>
  fetch(`${urlForFetchs()}/api/user/me`, {
    method: "GET",
    credentials: "include",
  })

export const updateUser = (user) =>
  fetch(`${urlForFetchs()}/api/user/update`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })

export const validateUser = () =>
  fetch(`${urlForFetchs()}/api/user/validate`, {
    method: "GET",
    credentials: "include",
  })

export const isAdmin = () =>
  fetch(`${urlForFetchs()}/api/user/isAdmin`, {
    method: "GET",
    credentials: "include",
  })

export const createUser = (user) =>
  fetch(`${urlForFetchs()}/api/user/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })

export const LoginUser = (user) =>
  fetch(`${urlForFetchs()}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })

export const LogoutUser = () =>
  fetch(`${urlForFetchs()}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
  })
