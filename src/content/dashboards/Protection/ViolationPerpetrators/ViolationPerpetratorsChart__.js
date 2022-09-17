import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

const ViolationPerpetratorsChart = ({
  data: dataProp,
  labels,
  ...rest
}) => {
  const theme = useTheme();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const myData = {
    datasets: [
      {
        label: 'Responses',
        backgroundColor: theme.colors.secondary.main,
        data: dataProp.numbers,
        barThickness: 15,
        maxBarThickness: 20,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ],
    labels
  };

  const options = {
    
    responsive: true,
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
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
            fontColor: theme.palette.text.secondary,
            callback: function (value) {
              return value + '%';
            },
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 12,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            callback: function(tick) {
              return tick.toLocaleString();
            },
            min: 0,
            maxTicksLimit: 8
          }
        }
      ],
    },
    tooltips: {
      enabled: true,
      caretSize: 6,
      displayColors: false,
      mode: 'label',
      intersect: true,
      yPadding: 8,
      xPadding: 16,
      borderWidth: 0,
      bodySpacing: 10,
      titleFontSize: 16,
      borderColor: theme.palette.common.black,
      backgroundColor: '#8EBEFF',
      titleFontColor: theme.palette.common.white,
      bodyFontColor: theme.palette.common.white,
      footerFontColor: theme.palette.common.white,
      callbacks: {
        label(tooltipItem, _data) {
          // const label = _data.labels[tooltipItem.index];
          const value = _data.datasets[0].data[tooltipItem.index];

          return `${numberWithCommas(value)}%`;
        }
      }
    },
    onClick: function(evt, element) {
        if (element.length > 0) {
          console.log(myData.labels[element[0]._index]);
          // you can also get dataset of your selected element
          //console.log(myData.datasets[element[0]._datasetIndex].data[element[0]._index])
        }
      }
  };

  
  return (
    <div {...rest}>
      <HorizontalBar 
        data={myData}
        options={options}
      />
    </div>
  );
};

ViolationPerpetratorsChart.propTypes = {
  data: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired
};

export default ViolationPerpetratorsChart;
