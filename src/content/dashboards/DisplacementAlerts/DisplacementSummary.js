import React from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone';
import DisplacementRegions from './DisplacementRegions';
import DisplacementNeeds from './DisplacementNeeds';
import DisplacementTriggers from './DisplacementTriggers';
import IconButton from '@mui/material/IconButton';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { red } from '@mui/material/colors';

const DisplacementSummaryDashboard = ({ handleClick }) => {

  return (
    <>
        <Card sx={{ mb: 1 }}>
            <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="total displacement">
                    <TransferWithinAStationTwoToneIcon />
                </Avatar>
              }
                action={
                    <IconButton aria-label="settings"  onClick={handleClick}>
                        <SettingsTwoToneIcon />
                    </IconButton>
                }
                title="Displacement Snapshot"
                subheader="700, 000 displaced between dates 01/01/2022 - 29/02/2022"
            />
        </Card>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardHeader title="Top Regions" />
                    <Divider />
                    <CardContent>
                        <DisplacementRegions />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardHeader title="Top Needs" />
                    <Divider />
                    <CardContent>
                        <DisplacementNeeds />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardHeader title="Top Causes" />
                    <Divider />
                    <CardContent>
                        <DisplacementTriggers />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
  )
}

export default DisplacementSummaryDashboard;