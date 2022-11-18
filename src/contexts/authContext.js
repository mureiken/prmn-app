import * as Msal from 'msal';
import React, { useContext, useState, useEffect } from "react";

//switches our redirect uri to local host, though we could get this dynamically instead.
let redirectUri = 'https://prmn-somalia.unhcr.org/';
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    redirectUri = "http://" + window.location.host + '/';
}


// Our MSAL config file which we'll use to get our token:
let msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_MICROSOFT_APP_CLIENT_ID,
      authority: "https://login.microsoftonline.com/unhcr.org", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: redirectUri,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };


const AuthContext = React.createContext({
    authenticated: false, // to check if authenticated or not
    user: {}, // store all the user details
    accessToken: "", // accessToken of user for Auth0
    initiateLogin: () => { }, // to start the login process
    initiateLoginIfCached: () => { }, // to start the login process is cached (i.e. if the user is already logged in.)
    handleAuthentication: () => { }, // handle Auth0 login process
    logout: () => { } // logout the user
});

export function useAuth() {
    return useContext(AuthContext)
  }

//Our React component
export function AuthProvider({ children }) {
    //create a new msal instance and store it as a property of this component
    let msalInstance = new Msal.UserAgentApplication(msalConfig);


    const [state, setState] = useState({
        authenticated: false,
        user: {
            role: "visitor"
        },
        accessToken: ""
    })

    useEffect(() => {
        initiateLoginIfCached(); 
    });
    

//tries to aquire the token from the cache and logs in if possible
    const initiateLoginIfCached = () => {
    let loginRequest = {
            scopes: ["user.read"] // optional Array<string>
        };
        msalInstance.acquireTokenSilent(loginRequest)
            .then(res => {
                setSession(res.idToken);
            })
            .catch(err => {
                console.log(err);
            })
    }

//tries to acquire the token from the cache and if fails prompts the user to login.
    const initiateLogin = () => {
        let loginRequest = {
            scopes: ["user.read"] // optional Array<string>
        };
        msalInstance.acquireTokenSilent(loginRequest)
            .then(res => {
                setSession(res.idToken);
            })
            .catch(err => {
                msalInstance.loginPopup(loginRequest).then(res => {
                    setSession(res.idToken)
                }).catch(err => {
                    console.log(err);
                });
            })

    };

//clears the cached token and sets their state to logged out.
    const logout = () => {
        setState({
            authenticated: false,
            user: {
                role: "visitor"
            },
            accessToken: ""
        })
        //msalInstance.logout(); - this will fully log them out of their microsoft account if you're using localstorage for SSO.
    };

//used when the callback recieves a token and return information
    const handleAuthentication = (hash) => {
        console.log('handling auth?')
        console.log(msalInstance.deserializeHash(hash))
    };

//this is the method that actually attaches the user data to the Auth component for reuse, and sets the bearer token for our api., 
    const setSession = (idToken) => {
        //console.log(idToken)

        let roles = [];
        if (idToken.claims.roles) {
            roles = idToken.claims.roles;
        }
        const user = {
            id: idToken,
            name: idToken.claims.name,
            roles: roles
        };
        setState({
            authenticated: true,
            idToken: idToken.rawIdToken,//this is the raw token that you want to pass to as your Bearer token.
            user: user
        });

    }

    const authProviderValue = {
        ...state,
        initiateLogin: initiateLogin,
        handleAuthentication: handleAuthentication,
        logout: logout
    };

    return (
        <AuthContext.Provider value={authProviderValue}>
            {children}
        </AuthContext.Provider>
    );
    
}

export const AuthConsumer = AuthContext.Consumer;