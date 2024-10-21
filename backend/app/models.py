from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import enum
from datetime import datetime

class StatusEnum(str, enum.Enum):
    pending = 'Pending'
    in_progress = 'In Progress'
    completed = 'Completed'

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)
    category_id = Column(Integer, ForeignKey('categories.id'))
    due_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

    category = relationship("Category", back_populates="tasks")
    subtasks = relationship("Subtask", back_populates="task")

class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

    tasks = relationship("Task", back_populates="category")

class Subtask(Base):
    __tablename__ = 'subtasks'

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey('tasks.id'))
    title = Column(String)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)

    task = relationship("Task", back_populates="subtasks")
