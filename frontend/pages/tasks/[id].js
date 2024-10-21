import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layout';
import styles from './TaskDetail.module.css'; // Import the CSS module

const TaskDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/tasks/${id}`)
        .then((response) => {
          setTask(response.data);
        })
        .catch(() => {
          router.push('/');
        });
    }
  }, [id]);

  if (!task) return <div className={styles.loading}>Loading...</div>;

  const deleteTask = () => {
    axios.delete(`http://localhost:8000/tasks/${id}`)
      .then(() => {
        router.push('/');
      });
  };

  return (
    <Layout>
      <div className={styles.taskDetailContainer}>
        <h1 className={styles.title}>{task.title}</h1>
        <p className={styles.description}>{task.description}</p>
        <p className={styles.status}>Status: {task.status}</p>
        <button onClick={deleteTask} className={styles.deleteButton}>Delete Task</button>
      </div>
    </Layout>
  );
};

export default TaskDetail;