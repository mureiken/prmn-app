import React, { useContext, useState, useEffect } from "react"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(token));
  }, [token]);


  function login(username, password) {
    console.log("token");
    let credentials = {
        'username': username,
        'password':  password
      }
      fetch('/api/tokens', {
        method: 'post',
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Basic a2FtYXU6MTIzNDU2Nw=="
        },
        body: JSON.stringify(credentials)
      }).then(response => response.json())
        .then(response => {
          if (response.access_token){
            setToken(response);
            getUser(username, response.access_token);         
          }
          else {
            console.log("Invalid login credentials")
          }
        })
  }
  
  function getUser(username, token) {
    fetch(`/api/users/${username}`, {
      method: 'GET',
      "headers": {
        "Content-Type": "application/json",
        "Authorization":  "Bearer " + token
      },
    }).then(r => r.json())
      .then(response => {
        if (response.email){
          setUser(response);          
        }
        else {
          console.log("No user found")
        }
      })
}

  function logout() {
    fetch("/api/tokens", {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer <token>"
        },
    })
    .then((response) => {
        setToken(null);  
    })
    .catch(err => {
        console.error(err);
    });
  }

  function resetPassword(email) {
    //return auth.sendPasswordResetEmail(email)
  }


  function updatePassword(password) {
   // return currentUser.updatePassword(password)
  }

 

  const value = {
    token,
    user,
    login,
    logout,
    resetPassword,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
