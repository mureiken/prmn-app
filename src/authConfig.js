export const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_MICROSOFT_APP_CLIENT_ID,
      authority: "https://login.microsoftonline.com/unhcr.org", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: process.env.REACT_APP_MICROSOFT_APP_REDIRECT_URL,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/User.Read"
  };