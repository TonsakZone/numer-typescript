import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
    ChartOptions
} from 'chart.js';

interface TestProps {}

const Test: FC<TestProps> = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: 'Log Scale Chart',
        data: [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000],
        borderColor: '#00aabb',
        backgroundColor: 'rgba(0, 170, 187, 0.2)',
        borderWidth: 2,
        pointBorderColor: '#00aabb',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#00aabb',
        pointHoverBorderColor: '#00aabb',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        yAxisID: 'y-axis-1',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    // scales: {
    //   yAxes: [
    //     {
    //       type: 'logarithmic',
    //       ticks: {
    //         min: 0,
    //         max: 10000000000,
    //         callback: function (value: number, index: number, values: number[]) {
    //           return Number(value.toString());
    //         },
    //       },
    //       display: true,
    //       scaleLabel: {
    //         display: true,
    //         labelString: 'Value',
    //       },
    //       id: 'y-axis-1',
    //     },
    //   ],
    // },
  };

  return (
    <div>
      <h2>Log Scale Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Test;
