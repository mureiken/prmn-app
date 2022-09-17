import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Footer from 'src/components/Footer';

export default function About() {
  return (
    <>
      <Helmet>
        <title>PRMN Publications</title>
      </Helmet>
      <Box sx={{mx: 5}}>
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
          sx={{ marginTop: 5}}
        >
            <Grid item xs={12}>
            <Paper sx={{p: 3}}>
                <Typography variant="h2" component="div" gutterBottom>
                    About the Project
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" gutterBottom>
                    The PRMN (Protection & Return Monitoring Network) is a UNHCR-led project which acts as a 
                    platform for identifying and reporting on displacements (including returns) of populations in 
                    Somalia as well as protection incidents underlying such movements. This note covers issues 
                    relating to the methodology of recording displacements but does not cover all aspects of the 
                    PRMN platform.
                </Typography>
                <Typography variant="h4" gutterBottom component="div" sx={{mt: 2}}>
                    Network coverage
                </Typography>
                <Typography variant="body1" gutterBottom>
                    On behalf of UNHCR, the Norwegian Refugee Council (NRC) works through 41 local partners in the 
                    field in Somalia: four (6) local partners in Somaliland, nine (9) in Puntland and twenty-six (26) 
                    in South Central Somalia. Each partner organization has been assigned a geographic area within a 
                    given region. In South and Central Somalia, the project is implemented in Banadir, Bay, Bakool, 
                    Gedo, Lower Jubba, Hiraan, Lower Shabelle, Middle Shabelle, middle Juba and Galgaduud region; in 
                    Puntland, project operations focus in the regions of Galmadug, Mudug and Bari; and in Somaliland, 
                    geographic coverage includes Woqooyi Galbeed, Marodijeh, Sool and Awdal regions. Partners in these 
                    locations work through specifically trained monitors, and who are supported by NRC area focal 
                    points spread across its twelve area support offices and/or operational bases in the field. 
                    The level of geographic coverage for displacement tracking and protection monitoring within 
                    regions will depend on the local security situation and access, and the numbers of partners and of 
                    local field staff.
                </Typography>
                <Typography variant="h4" gutterBottom component="div" sx={{mt: 2}}>
                    Monitoring methodology
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Partners monitor population displacements and movements such as returns by targeting strategic 
                    points including transit sites, established IDP settlements, border crossings and other ad hoc 
                    locations. The data is captured by partner staff interviewing displaced persons 
                    (generating 'household-level' reports) primarily at points of arrival or by interviewing key 
                    informants (generating 'group reports') at IDP settlements, transit centers and other strategic 
                    locations. The interviews rely on the use of a standardized form that is designed to capture 
                    information on displacements and protection incidents and in the case of household-level reports, 
                    this includes disaggregated demographic data and family vulnerabilities. During the interview, both 
                    the point of departure and reason for departure are recorded; sensitive personal information is not 
                    stored. Reports are uploaded onto a web-based platform, through which they are quality-controlled by 
                    NRC. Reports are also verified prior to approval by NRC field staff, either in person or through third 
                    party verification. Referral services and basic emergency support assistance are available through the 
                    network to victims and survivors of serious protection incidents.
                </Typography>
                <Typography variant="h4" gutterBottom component="div" sx={{mt: 2}}>
                    Strengths
                </Typography>
                <List sx={{ listStyleType: 'square' }}>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        <Typography variant="body1" gutterBottom>
                            The PRMN methodology enables reporting on population movements and displacements 
                            together with analysis oftrends over time and displacement from or to specific areas. 
                            Earlier forms of the PRMN network have existed inSomalia since 2006 - PMT 
                            (Population Movement tracking), PMN (Protection Monitoring Network) were combined in 
                            2010 meaning trend analysis and comparisons over time can be performed (within certain limitations).
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        <Typography variant="body1" gutterBottom>
                            Where the network can excel is in real-time identification of displacements especially 
                            where catalyzed by natural disasters (flood, drought etc.) or man-made events such as 
                            conflict. Procedures are in place for monitors in the field toflag key events to NRC focal 
                            points, who verify and together with UNHCR may issue a 'flash report' informing the wider 
                            humanitarian community of the displacements,the cause and wherever possible a preliminary 
                            indicator of immediate priority needs.
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        <Typography variant="body1" gutterBottom>
                            The breadth of coverage of the network combined with the capture of origins, 
                            destinations and causes of movements mean that the network can provide insight 
                            into displacements over a significant proportion of Somalia.
                        </Typography>
                    </ListItem>
                </List>
                <Typography variant="h4" gutterBottom component="div" sx={{mt: 2}}>
                    Limitations
                </Typography>
                <List sx={{ listStyleType: 'square' }}>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        <Typography variant="body1" gutterBottom>
                            PRMN does not, at present, seek to collect data on fixed IDP numbers present at any 
                            one location at a given time so is not currently a platform for deriving total or 
                            cumulative IDP populations although data derived for the network can inform analysis of 
                            the same.
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        <Typography variant="body1" gutterBottom>
                            The network does not capture all population movements in all areas of Somalia at all times 
                            - reports of displacement figures can be seen as indicators of potentially larger movements 
                            and their underlying causes. Some types of movement such as short-term displacement of 
                            individuals or groups and subsequent returns, may not always beeasily identified by the 
                            network.
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        <Typography variant="body1" gutterBottom>
                            Currently one main reason for each movement identified is recorded during PRMN 
                            interviews, however, often the real driver for displacement may be combination of 
                            closely interrelated factors. Improvements are in progress to the methodology for 
                            capturing the reason(s) for displacement in order to better understand the underlying 
                            causes andinform the response.
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        <Typography variant="body1" gutterBottom>
                            There are periods of time where certain regions will havea reduced monitoring footprint as 
                            a result of external events, changes in field partners or other reasons. Where NRC and UNHCR 
                            consider that data is insufficient to provide results for a specific time-frame, data for a 
                            given location may be omitted from published reports (but may still be used in aggregated trends analysis)
                        </Typography>
                    </ListItem>
                </List>
                </Paper>
            </Grid>
        </Grid>
    </Box>
<Footer />
</>
  );
}
