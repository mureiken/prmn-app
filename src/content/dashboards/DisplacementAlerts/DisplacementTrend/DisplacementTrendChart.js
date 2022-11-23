import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useTheme } from '@mui/material';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const DisplacementTrendChart = ({ arrayOfWeeklyData, min, max }) => {
  
  const labels  = [...Array(53).keys()]
  const theme = useTheme();
  const data = {
    labels,
    datasets: [
      {
        data:arrayOfWeeklyData,
        borderColor: theme.colors.secondary.main,
        //backgroundColor: theme.colors.secondary.main,
        // barThickness: 12,
        // maxBarThickness: 15,
        // barPercentage: 0.5,
        // categoryPercentage: 0.5
      }
    ],
  };

  const options = {
    responsive: true,
    // elements: {
    //     bar: {
    //       borderWidth: 5,
    //     }
    //   },
    maintainAspectRatio: false,
    // cornerRadius: 1,
    legend: {
        display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [ 
         {
          beginAtZero: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 18,
            fontColor: theme.palette.text.secondary
          },
          //type: 'linear',
          min: min,
          max: max,
          // time: {
          //   unit: 'month'
          // },
        }
      ],
      yAxes: [
        {
          beginAtZero: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 12,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            maxTicksLimit: 8,
            callback: function (value) {
              return numberWithCommas(value);
            },
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
            return `Population displaced: ${tooltipItem.yLabel}`;
          }
        }
      }
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

DisplacementTrendChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DisplacementTrendChart;
