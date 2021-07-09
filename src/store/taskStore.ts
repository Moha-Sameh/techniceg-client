import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

export interface ITasks {
  tasks: ITaskData[];
}

export interface ITaskData {
  id: number;
  status: string;
  title?: string;
  description?: string;
  price?: number;
}

class TaskStore {
  tasks: any[] = [];
  loading = true;
  constructor() {
    makeAutoObservable(this);
  }

  createTask = async (taskData: ITaskData | any) => {
    try {
      await instance.post("/tasks", taskData);
      this.getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  getTasks = async () => {
    try {
      const response = await instance.get("/tasks");
      runInAction(() => {
        this.tasks = response.data;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };
  updateTask = async (taskDetails: ITaskData, history: any) => {
    try {
      const response = await instance.put("/tasks", taskDetails);
      runInAction(() => {
        this.tasks = this.tasks.map((task) =>
          task.id === response.data.id ? response.data : task
        );
      });
    } catch (error) {
      if (error.response.status === 401) {
        history.push("/");
      } else {
        console.error(error);
      }
    }
  };
}

const taskStore = new TaskStore();
taskStore.getTasks();

export default taskStore;
