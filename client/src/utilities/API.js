import axios from "axios"

const baseURL = process.env.NODE_ENV === 'production'
  ? "/api" // Assuming your production API endpoints start with "/api"
  : "http://localhost:3100/api"; // Replace with your development API URL

 //Base URL for API calls 
const apiInstance = axios.create({
  baseURL: baseURL,
});

const API = {

  login: function (userInfo) {
    return apiInstance.post("/login", userInfo, {
      headers: {
        token: localStorage.getItem("token"),
      }
    });
  },
  
  addUser: function (userData) {
      return fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    },

    saveUser: function (userData) {
    return axios.post("/api/users", userData);
    },
    lookupUserByEmail: function (email) {
        return fetch(`/api/auth/user/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }).then((res) => res.json());
      },
    updateUser: function (userId, payload) {
      return fetch(`${baseURL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      }).then((res) => res.json());
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
    getUsers: function (abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;
    
        return fetch(`${baseURL}/users/`, { signal }).then((res) => res.json());
    },
    //Gets All Projects
    getProjects: function() {
      return fetch(`${baseURL}/projects/`, {
        headers: {
          token: localStorage.getItem("token"),
        }
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error fetching projects:", error);
          throw error;
        });
    },    
    //Get Project by ID
    getProject: function (projectId, abortController) {
      let signal = null;
      if (abortController) signal = abortController.signal;
  
      return fetch(`${baseURL}/projects/${projectId}`, {
        signal,
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((res) => res.json());
    },
    getProjectUsers: function (projectId, abortController) {
      let signal = null;
      if (abortController) signal = abortController.signal;
  
      return fetch(`${baseURL}/userprojects/${projectId}`, {
        signal,
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((res) => res.json());
    },
    getProjectTickets: function(projectId, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;

        return fetch(`${baseURL}/tickets/` + projectId, { signal }).then((res) =>
        res.json()
        );
    },
    getUserTickets: function (abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;
    
        return fetch(`${baseURL}/tickets`, {
          signal,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
      },
    createProject: function (projectData) {
        return fetch(`${baseURL}/projects`, {
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
      deleteProject: function (projectId) {
        return fetch(`/api/projects/${projectId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
      },
      getAvailableUsers: function (projectId, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;
    
        return fetch(`${baseURL}/availableUsers/` + projectId, { signal }).then((res) =>
          res.json()
        );
      },
      addContact: function (id, data) {
        return axios.put("/api/users/" + id, data);
      },
      getTicket: function (projectId, ticketId, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;
    
        return fetch(`${baseURL}/tickets/${projectId}/${ticketId}`, { signal }).then(
          (res) => res.json()
        );
      },
      getTicketComments: function (ticketId, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;
    
        return fetch(`${baseURL}/comments/${ticketId}`, {
          signal,
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }).then((res) => res.json());
      },
      getDevAssignments: function (ticketId, abortController) {
        let signal = null;
        if (abortController) signal = abortController.signal;
    
        return fetch(`${baseURL}/devassignments/${ticketId}`, { signal }).then((res) =>
          res.json()
        );
      },
      createDevAssignment: function (ticketId, devId) {
        return fetch(`/api/devassignments/${ticketId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(devId),
        }).then((res) => res.json());
      },
      removeAllDevAssignments: function (ticketId) {
        return fetch(`/api/devassignments/${ticketId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
      },
      createTicket: function (projectId, payload) {
        return fetch(`/api/tickets/${projectId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        }).then((res) => res.json());
      },
      updateTicket: function (projectId, ticketId, payload) {
        return fetch(`/api/tickets/${projectId}/${ticketId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        }).then((res) => res.json());
      },
      deleteTicket: function (projectId, ticketId) {
        return fetch(`/api/tickets/${projectId}/${ticketId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
      },
      addTeamMember: function (projectId, userId) {
        return fetch(`${baseURL}/userprojects/${projectId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(userId),
        });
      },
      removeTeamMember: function (projectId, userId) {
        return fetch(`/api/userprojects/${projectId}/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
      },
      removeAllTeamMembers: function (projectId) {
        return fetch(`/api/userprojects/${projectId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
      },
      createComment: function (ticketId, comment) {
        return fetch(`/api/comments/${ticketId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(comment),
        });
      },
      deleteComment: function (ticketId, commentId) {
        return fetch(`${baseURL}/comments/${ticketId}/${commentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
      }
}

export default API