import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './PowerOutputChart.css';

class PowerOutputChart extends Component {
  constructor(props) {
    super(props);

    const powerValues = [5.3, 6.2, 5.3, 6.2, 5.3];

    const maximumPowerValue = 10;

    const xAxisLabel = 'Time (seconds)';

    const yAxisLabel = 'kW';

    this.powerLineLabel = 'Power Output';

    this.powerLineBackgroundColor = 'rgba(65, 198, 94, 0.0)';

    this.powerLineBorderColor = 'rgba(65, 198, 94, 1)';

    this.timeLabels = ['-4', '-3', '-2', '-1', 'Now'];

    this.options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: xAxisLabel
          },
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: yAxisLabel
          },
          ticks: {
            beginAtZero: true,
            suggestedMax: maximumPowerValue
          }
        }]
      },
      tooltips: {
        position: 'nearest',
        intersect: false,
        callbacks: {
          // Display the line label as the tooltip title.
          title: function (tooltipItem, data) {
            const datasetIndex = tooltipItem[0].datasetIndex;
            return data.datasets[datasetIndex].label;
          },
          // Display a truncated version of the power value as the tooltip text.
          label: function (tooltipItem, data) {
            const powerValue = tooltipItem.yLabel;
            return powerValue.toFixed(1) + ' kW';
          }
        }
      }
    };

    // Store these values in the component state so React re-renders the component whenever these values change.
    this.state = {
      powerValues: powerValues
    };
  }

  render() {
    // Construct the `data` object in the format the `Line` component expects.
    const data = {
      labels: this.timeLabels,
      datasets: [{
        label: this.powerLineLabel,
        data: this.state.powerValues,
        backgroundColor: this.powerLineBackgroundColor,
        borderColor: this.powerLineBorderColor,
        borderWidth: 1,
        pointRadius: 0
      }]
    };

    return (
      <div className='power-output-chart--chart-wrapper'>
        <Line data={data} options={this.options}/>
      </div>
    );
  }
}

export default PowerOutputChart;
