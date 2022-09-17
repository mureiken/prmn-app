import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { COLORS } from '../../../../../constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

function createData(PreviousSettlement, NosAriving, Reason, Needs) {
  return { PreviousSettlement, NosAriving, Reason, Needs };
}

const rows = [
  createData('Alud, Adan Yabaal', 159, 'Drought', 'Food, Shelter'),
  createData('Baidoa,B/ABUURI', 34, 'Drought', 'Food, Shelter'),

];

const DenseTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Arriving from</TableCell>
            <TableCell align="right">No's</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">Needs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.PreviousSettlement}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.PreviousSettlement}, 
              </TableCell>
              <TableCell align="right">{row.NosAriving}</TableCell>
              <TableCell align="right">{row.Reason}</TableCell>
              <TableCell align="right">{row.Needs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    textAlign: 'left',
    width: (props) => props.tooltipWidth,
    minHeight: '85px',
    background: '#2588ac 0 0 no-repeat padding-box',
    opacity: '0.85',
    color: '#ffffff',
    padding: '0 0 10px 0',
  },
  countryOfOriginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
  },
  lineContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px',
  },
  countryText: {
    fontSize: '16px',
    color: COLORS.darkGray,
    width: '50%',
  },
  line: {
    backgroundColor: COLORS.blue,
    height: '5px',
    borderRadius: '11px',
    marginRight: '5px',
  },
  lineText: {
    fontSize: '16px',
    color: COLORS.blue,
  },
  content: {
    textAlign: 'left',
    fontSize: '16px',
    color: COLORS.darkGray,
    paddingLeft: '19px',
    paddingTop: '12px',
  },
  infoText: {
    textAlign: 'right',
    fontSize: '12px',
    fontStyle: 'italic',
    color: COLORS.blue,
    padding: '0px',
  },
}));

const Tooltip = ({ popupInfo, x, y, width, height }) => {
  const tooltipWidth = 385;
  const [tooltipHeight, setTooltipHeight] = useState(300);
  const buffer = 10;
  const classes = useStyles({ tooltipWidth });
  const tooltipRef = useRef(null);

  useEffect(() => {
    const { offsetHeight } = tooltipRef.current;
    setTooltipHeight(offsetHeight);
  }, []);

  // Sort nationalities by number of refugees
  const location = popupInfo.properties.CurrentSettlement;
  const district = popupInfo.properties.CurrentDistrict;
  const region = popupInfo.properties.CurentRegion;
  const numIDPS = popupInfo.properties.AllPeople;
  const dateOfArrival = popupInfo.properties.Date.replace('00:00:00 GMT','');

  // Get the top five to display
  // const topFiveNationalities = nationalities.slice(0, 5);
  // const xScale = scaleLinear()
  //   .range([0, 100])
  //   .domain([0, max(topFiveNationalities.map(valueAccessor))]);

  // If the tooltip is going over the edge of the right side of the screen
  if (tooltipWidth + x < width - buffer) {
    x -= tooltipWidth;
  }

  // If the tooltip is going over the edge of the bottom side of the screen
  if (tooltipHeight + y < height - buffer) {
    y -= tooltipHeight;
  }

  return (
    <div className="tooltip" style={{ left: x, top: y }} ref={tooltipRef}>
      <div className={classes.headerContainer}>
        <div className="tooltip_header_title">{location}, {district}, {region}</div>
        <div className="tooltip_header_subtitle">{`${numIDPS} IDPs arrived on ${dateOfArrival}`}</div>
      </div>
      <div>
        <div className={classes.infoText}><DenseTable /></div>
      </div>
    </div>
  );
};

export default Tooltip;