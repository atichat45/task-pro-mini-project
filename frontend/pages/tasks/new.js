import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from './NewTask.module.css';

const NewTask = () => {
  const router = useRouter();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const createTask = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/tasks/', task)
      .then(() => {
        router.push('/');
      });
  };

  return (
    <Layout>
      <h1 className={styles.heading}>Create New Task</h1>
      <form onSubmit={createTask} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input 
            name="title" 
            value={task.title} 
            onChange={handleChange} 
            required 
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea 
            name="description" 
            value={task.description} 
            onChange={handleChange} 
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select 
            name="status" 
            value={task.status} 
            onChange={handleChange} 
            className={styles.select}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Create Task</button>
      </form>
    </Layout>
  );
};

export default NewTask;
