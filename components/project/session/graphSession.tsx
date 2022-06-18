import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


type Props = {}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,

    );
    function Graph({arrayOfLabel}: Props) {
  
const options = {
      responsive: true,
      plugins: {

    title: {
        display: true,
        text: 'Chart.js Line Chart',
    },
},
};

const labels = arrayOfLabel;

const data = {
    labels,
    datasets: [
        {
            data: [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

console.log(arrayOfLabel)

return (
    <Line options={options} data={data} />
    )
}

export default Graph;