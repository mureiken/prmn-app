import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from '@mui/material/Button';


/**
 * Renders a button which, when selected, will open a popup for login
 */
 export const SignInButton = () => {
    const { instance, accounts  } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

  
    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        });
    }


    async function handleLogin(loginType) {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest)
            .catch(e => {
                console.log(e);
            });
        }

        await RequestAccessToken();
    }
    return (
        <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={() => handleLogin("popup")}>Sign in</Button>
    );
}