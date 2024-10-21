import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/tasks/')
      .then((response) => {
        const tasks = response.data;
        const counts = tasks.reduce((acc, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1;
          return acc;
        }, {});
        setStatusCounts(counts);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
          color: '#333',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  return (
    <Layout>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#4A4A4A' }}>Task Status Dashboard</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Pie data={data} options={options} />
      </div>
    </Layout>
  );
};

export default Dashboard;
