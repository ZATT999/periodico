import { urlFetchs } from "../const/urlfetch"

export const getAllNews = () =>
  fetch(`${urlFetchs}/api/news`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

export const getNewsById = (id) =>
  fetch(`${urlFetchs}/api/news/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

export const createNews = (news) =>
  fetch(`${urlFetchs}/api/news`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(news),
  })

export const deleteNews = (id) =>
  fetch(`${urlFetchs}/api/news/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })

export const updateNews = (id, news) =>
  fetch(`${urlFetchs}/api/news/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(news),
  })

export const toggleVisibility = (id) =>
  fetch(`${urlFetchs}/api/news/${id}/visible`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })

export const createCommentary = (commentary, id) =>
  fetch(`${urlFetchs}/api/news/${id}/commentarys`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentary),
  })

export const deleteCommentary = (id, Commentaryid) =>
  fetch(`${urlFetchs}/api/news/${id}/commentarys/${Commentaryid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })

export const addVisited = (id) =>
  fetch(`${urlFetchs}/api/news/${id}/visualizations`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
