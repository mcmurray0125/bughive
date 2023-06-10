import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from "react-chartjs-2"
import { FadeLoader } from "react-spinners"

import API from "../../utilities/API"

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TicketsChart = ({ focus }) => {
  const [ticketsData, setTicketsData] = useState([])
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true)

    async function fetchUserTickets() {
      try {
        const userTicketsRes = await (
          await API.getUserTickets(abortController)
        ).json();

        setTicketsData(userTicketsRes);
        setLoading(false);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.log("Error fetching user tickets", err);
        }
      }
    }
    
    fetchUserTickets();
    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-wrapper d-flex justify-content-center">
        <FadeLoader color="#372c62" />
      </div>
      )
  }
  
    return (
      <Pie data={chartData} options={options}/>
    )
  };
  
  export default TicketsChart;
