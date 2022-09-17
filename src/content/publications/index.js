import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Publication from './Publication';

import Footer from 'src/components/Footer';
function Publications() {

  const documents = [
    {
    "type": "MonthlyReport",
    "title": "UNHCR Somalia PRMN Internal Displacements - December 2021",
    "summary": "The UNHCR-led PRMN implemented in partnership with NRC reported 96,000 new internal displacements in the month of December 2021. Of these, 90,000 were triggered by drought or lack of livelihood while 3,000 were related to conflict / insecurity.",
    "publishDate": "10 January 2022",
    "thumbnail": "https://data.unhcr.org/images/documents/c80e8a2c6b1b599b5888179f0a858a49fd678e4d.jpg",
    "link": "https://data.unhcr.org/en/documents/download/90378"
},
{
    "type": "MonthlyReport",
    "title": "UNHCR Somalia PRMN Internal Displacements - 31 January 2022",
    "summary": "The UNHCR-led PRMN implemented in partnership with NRC reported 317,000 new internal displacements in the month of January 2022. Of these, 309,000 were triggered by drought or lack of livelihood while 7,000 were related to conflict / insecurity.",
    "publishDate": "10 February 2022 ",
    "thumbnail": "https://data.unhcr.org/images/documents/08afa46837c42871a9b4abf9866ec22c76c57e81.jpg",
    "link": "https://data.unhcr.org/en/documents/download/90885"
},
{
    "type": "MonthlyReport",
    "title": "UNHCR Somalia PRMN Internal Displacements - 28 February 2022",
    "summary": "TThe UNHCR-led PRMN implemented in partnership with NRC reported 136,000 new internal displacements in the month of February 2022. Of these, 115,000 were triggered by drought or lack of livelihood while 21,000 were related to conflict / insecurity.",
    "publishDate": "10 March 2022",
    "thumbnail": "https://data.unhcr.org/images/documents/46792a0a52921059b383855af27fe6ba638b9007.jpg",
    "link": "https://data.unhcr.org/en/documents/download/91286"
},
{
    "type": "MonthlyReport",
    "title": "UNHCR Somalia PRMN Internal Displacements - 31 March 2022",
    "summary": "The UNHCR-led PRMN implemented in partnership with NRC reported 84,000 new internal displacements in the month of March 2022. Of these, 74,000 were triggered by drought or lack of livelihood while 7,000 were related to conflict / insecurity and 3,000 were displaced due to other reasons.",
    "publishDate": "13 April 2022",
    "thumbnail": "https://data.unhcr.org/images/documents/8d638f61a6a533aeabc93b0fc98297789f746510.jpg",
    "link": "https://data.unhcr.org/en/documents/download/91976"
},
{
    "type": "MonthlyReport",
    "title": "UNHCR Somalia PRMN Internal Displacements - 30 April 2022",
    "summary": "The UNHCR-led PRMN implemented in partnership with NRC reported 45,619 new internal displacements in the month of April 2022. Of these, 25,468 were triggered by drought or lack of livelihood while 18,524 were related to conflict / insecurity and 1,591 were displaced due to other reasons as well as 36 displaced due to floods.",
    "publishDate": "10 May 2022",
    "thumbnail": "https://data.unhcr.org/images/documents/32b8589a5dc540aaec46b4bf0b27c607d74935e0.jpg",
    "link": "https://data.unhcr.org/en/documents/download/92663"
},
{
    "type": "MonthlyReport",
    "title": "UNHCR Somalia PRMN Internal Displacements - 31 May 2022",
    "summary": "The UNHCR-led PRMN implemented in partnership with NRC reported 107,426 new internal displacements in the month of May 2022. Of these, 33,404 were triggered by drought or lack of livelihood while 73,470 were related to conflict / insecurity and 534 were displaced due to other reasons as well as 18 displaced due to floods.",
    "publishDate": "12 June 2022 ",
    "thumbnail": "https://data.unhcr.org/images/documents/97e0f78b3e3fa18725a362822a7a587f26158bfc.jpg",
    "link": "https://data.unhcr.org/en/documents/download/93527"
},
{
    "type": "MonthlyReport",
    "title": "UNHCR Somalia PRMN Internal Displacements - 30 June 2022",
    "summary": "The UNHCR-led PRMN implemented in partnership with NRCreported 114,606 new internal displacements in the month ofJune 2022. Of these, 112,448 were triggered by drought or lack of livelihood while 1,321 were related to conflict / insecurity and 837 were displaced due to other reasons.",
    "publishDate": "14 July 2022",
    "thumbnail": "https://data.unhcr.org/images/documents/af5801eada65580683b5d80dd01fa60c8c8a16e0.jpg",
    "link": "https://data.unhcr.org/en/documents/download/94205"
},
{
    "type": "MonthlyReport",
    "title": "UNHCR Somalia PRMN Internal Displacements - 31 July 2022",
    "summary": "TThe UNHCR-led PRMN implemented in partnership with NRC reported 124,000 new internal displacements in the month of July 2022. Of these, 83,518 were triggered by drought or lack of livelihood while 39,372 were related to conflict / insecurity and 1,366 were displaced due to other reasons.",
    "publishDate": "10 August 2022",
    "thumbnail": "https://data.unhcr.org/images/documents/bde88baf07a278745efe0d469c51048f78627ed3.jpg",
    "link": "https://data.unhcr.org/en/documents/download/94768"
}
];

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
            <Publication publications={documents} />
          </Grid>
        </Grid>
        </Box>
        <Footer />
      </>
  );
}

export default Publications;
