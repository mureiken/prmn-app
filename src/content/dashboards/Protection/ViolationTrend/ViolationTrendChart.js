import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useTheme } from '@mui/material';


const ViolationTrendChart = (props) => {
  const theme = useTheme();

  const [xAxisSeriesType, setXAxisSeriesType] = useState('day');

  

  useEffect(() => {
    const { series } = props;
    console.log("series: ", props);
      if (series <= 7) {
        setXAxisSeriesType('day');
      } else if(series > 7 && series <= 30) {
        setXAxisSeriesType('week')
      } else if(series > 30 && series <=90) {
        setXAxisSeriesType('month')
      } else if (series > 90) {
        setXAxisSeriesType('quarter')
      }
    
  }, [props])


  const data = {
    datasets: [
      {
        label: 'Violation Cases',
        data: props.data,
        borderColor: theme.colors.secondary.main,
        backgroundColor: theme.colors.secondary.main,
        barThickness: 12,
        maxBarThickness: 15,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ],
  };

  const options = {
    responsive: true,
    elements: {
        bar: {
          borderWidth: 5,
        }
      },
    maintainAspectRatio: false,
    cornerRadius: 1,
    legend: {
        display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 18,
            fontColor: theme.palette.text.secondary
          },
          type: 'time',
          time: {
            unit: 'week'
          },
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 12,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            maxTicksLimit: 8
          }
        }
      ]
    },
    tooltips: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        caretSize: 6,
        displayColors: false,
        yPadding: 8,
        xPadding: 16,
        borderWidth: 0,
        borderColor: theme.palette.common.black,
        backgroundColor: '#8EBEFF',
        titleFontColor: theme.palette.common.white,
        bodyFontColor: theme.palette.common.white,
        footerFontColor: theme.palette.common.white,
        callbacks: {
          title: () => { },
          label: (tooltipItem) => {
            return `Victims violated: ${tooltipItem.yLabel}`;
          }
        }
      }
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

ViolationTrendChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ViolationTrendChart;
