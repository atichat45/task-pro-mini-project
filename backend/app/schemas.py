from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import enum

class StatusEnum(str, enum.Enum):
    pending = 'Pending'
    in_progress = 'In Progress'
    completed = 'Completed'

class SubtaskBase(BaseModel):
    title: str
    status: StatusEnum = StatusEnum.pending

class SubtaskCreate(SubtaskBase):
    pass

class Subtask(SubtaskBase):
    id: int
    task_id: int

    class Config:
        orm_mode = True

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: StatusEnum = StatusEnum.pending
    category_id: Optional[int] = None
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    created_at: datetime
    subtasks: List[Subtask] = []

    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    tasks: List[Task] = []

    class Config:
        orm_mode = True
