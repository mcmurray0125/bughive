import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TicketsChart = ({ ticketsData, focus }) => {
  const focusValues = ticketsData.map(ticket => ticket[focus]);
  const uniqueFocusValues = [...new Set(focusValues)];

  const data = uniqueFocusValues.map(value => {
    const filteredTickets = ticketsData.filter(ticket => ticket[focus] === value);
    return filteredTickets.length;
  });

  const chartData = {
    labels: uniqueFocusValues,
    datasets: [
      {
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          '#3232eab9',
          '#32ea32b9',
          '#ea3292b9',
          'rgba(153, 102, 255, 0.6)',
          '#ea8a32b9',
        ],
        hoverOffset: 4
      },
    ],
  };

  const options= {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        text: `TICKETS BY ${focus.toUpperCase()}`,
        display: true,
        position: "top"
      },
      legend: {
        position: 'bottom',
        labels: {
            boxWidth: 12,
        }
      },
    }
  }
  
    return <Pie data={chartData} options={options}/>;
  };
  
  export default TicketsChart;
