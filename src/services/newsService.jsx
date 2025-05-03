import { urlForFetchs } from "../utils/urlForFetchs"

export const getAllNews = () =>
  fetch(`${urlForFetchs()}/api/news`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

export const createNews = (news) =>
  fetch(`${urlForFetchs()}/api/news`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(news),
  })

export const deleteNews = (id) =>
  fetch(`${urlForFetchs()}/api/news/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })

export const updateNews = (id, news) =>
  fetch(`${urlForFetchs()}/api/news/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(news),
  })

export const toggleVisibility = (id) =>
  fetch(`${urlForFetchs()}/api/news/${id}/visible`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
