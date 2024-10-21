import React from 'react';
import Link from 'next/link';
import styles from './TaskList.module.css';

const TaskList = ({ tasks }) => (
  <div className={styles.taskListContainer}>
    {tasks.map((task) => (
      <div key={task.id} className={styles.taskItem}>
        {/* Use Link without the extra <a> tag */}
        <Link href={`/tasks/${task.id}`}>
          {task.title}
        </Link>
      </div>
    ))}
  </div>
);

export default TaskList;
