import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import Layout from '../components/Layout';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/tasks/')
      .then((response) => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Task List</h1>
        <TaskList tasks={tasks} />
      </div>
    </Layout>
  );
};

export default Home;