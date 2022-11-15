import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from '@mui/material/Button';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/" // redirects the top level app after logout
            });
        }
    }

    return (
        <Button variant="outlined"  color="primary" fullWidth onClick={() => handleLogout("popup")}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
        </Button>
    );
}