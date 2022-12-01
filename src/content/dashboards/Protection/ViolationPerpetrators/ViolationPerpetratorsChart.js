import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

const ViolationPerpetratorsChart = ({ handleFilter, data: dataProp, ...rest }) => {
  const theme = useTheme();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const data = {
    datasets: dataProp.datasets.map((dataset) => ({
      ...dataset,
      borderWidth: 5,
      borderColor: theme.colors.alpha.white[100],
      hoverBorderColor: theme.colors.alpha.white[30]
    })),
    labels: dataProp.labels
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 60,
    legend: {
      display: true,
      position: 'left',
      align: 'start'
    },
    layout: {
      padding: 0
    },
    tooltips: {
      enabled: true,
      caretSize: 6,
      displayColors: false,
      mode: 'label',
      intersect: true,
      yPadding: 8,
      xPadding: 16,
      borderWidth: 2,
      bodySpacing: 10,
      borderColor: theme.colors.alpha.black[30],
      backgroundColor: theme.palette.common.white,
      titleFontColor: theme.palette.common.black,
      bodyFontColor: theme.palette.common.black,
      footerFontColor: theme.palette.common.black,
      callbacks: {
        label(tooltipItem, _data) {
          const label = _data.labels[tooltipItem.index];
          const value = _data.datasets[0].data[tooltipItem.index];

          return `${label}: ${numberWithCommas(value)}`;
        }
      }
    },
    onClick: function(evt, element) {
      if (element.length > 0) {
        handleFilter(
          "Perpetrators", 
          [data.labels[element[0]._index]]
        )
      }
    }
  };

  return <Doughnut data={data} options={options}  {...rest} />;
};

ViolationPerpetratorsChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default ViolationPerpetratorsChart;
