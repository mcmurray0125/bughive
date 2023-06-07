import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);

const TicketsChart = ({ ticketsData, focus }) => {
    const chartData = {
      labels: [...new Set(ticketsData.map(ticket => ticket[focus]))],
      datasets: [
        {
          data: ticketsData.map(ticket => ticket[focus]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
        },
      ],
    };
  
    return <Pie data={chartData} />;
  };
  
  export default TicketsChart;
