import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({ title, children, isOpen, handleClose }) {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
             <DialogTitle>
                <Box>{title}</Box>
             </DialogTitle>
             <DialogContent>
                <Box>{children}</Box>
             </DialogContent>
             <DialogActions>
                <Button onClick={handleClose}>Close</Button>
             </DialogActions>     
        </Dialog>
    )
}