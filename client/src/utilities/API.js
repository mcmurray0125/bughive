import axios from "axios"

const API = {

    //Gets All Projects
    getProjects: function () {
        return fetch("/api/projects", {
            headers: {
                token: localStorage.getItem("token"),
            },
        }).then((res) => res.json());
    },
    //Get Project by ID
    getProject: function (id, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;

        return axios.get("api/projects/" + id, {
            signal,
            headers: {
                token: localStorage.getItem("token"),
            }
        });
    },
    getProjectUsers: function(projectId, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;

        return fetch(`/api/userProjects/${projectId}`, {
            signal,
            headers: {
                token: localStorage.getItem("token"),
            },
        }).then((res) => res.json());
    },
    getProjectTickets: function(projectId, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;

        return fetch("/api/tickets/" + projectId, { signal }).then((res) =>
        res.json()
        );
    },
    createProject: function (projectData) {
        return fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(projectData),
        }).then((res) => res.json());
      },
      updateProject: function (projectId, projectData) {
        return fetch(`/api/projects/${projectId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(projectData),
        });
      },
      saveUser: function (userData) {
        return axios.post("/api/users", userData);
      },
      removeUser: function (userId) {
        return fetch(`/api/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
      },
      addContact: function (id, data) {
        return axios.put("/api/users/" + id, data);
      },
      getTicket: function (projectId, ticketId, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;
    
        return fetch(`/api/tickets/${projectId}/${ticketId}`, { signal }).then(
          (res) => res.json()
        );
      },
}
