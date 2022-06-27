import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type Props = {
  arrayOfLabel: any;
  arrayOfDate: string[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip
);
function Graph(tab: { tab: { duree: any; date: any } }) {
  useEffect(() => {}, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const myData = tab.tab.duree;
  const labels = tab.tab.date;
  // console.log("durée dans graph", tab.tab.duree);
  // console.log("date dans graph", myData);
 //Le but est de faire une autre tableau avec les valeur en nombre pour pouvoir les mettre en absis
  let tabFormat:any[] = [];

  const mapDeDate = myData.map((duree: string | any[]) => {
    const heureNumber:number[]|any = duree.slice(0, 2);
      const minutesNumber: number[] | any = duree.slice(3, 5);
      

      const formatDuree = heureNumber + '.' + minutesNumber
      // console.log(formatDuree)
    tabFormat.push(Number.parseFloat(formatDuree));

 
  });

  // console.log("map de date", tabFormat);

  const data = {
    labels,
    datasets: [
      {
        data: tabFormat,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
export default Graph;
