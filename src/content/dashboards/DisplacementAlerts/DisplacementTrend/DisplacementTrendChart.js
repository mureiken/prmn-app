import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useTheme } from '@mui/material';

const DisplacementTrendChart = (props) => {
  const labels  = [1,2,3,4,5,6,7,8,9,10, 11,12,13,14,15,16,17,18,19,20, 21, 22,23, 24,25,26,27, 28, 27, 30, 31,32,33,34, 35, 36, 37,38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
  const theme = useTheme();
  const data = {
    labels,
    datasets: [
      {
        data: props.data,
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
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 18,
            fontColor: theme.palette.text.secondary
          },
          // type: 'time',
          // distribution: 'linear',
          // time: {
          //   unit: 'month'
          // },
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
