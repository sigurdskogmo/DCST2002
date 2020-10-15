// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Task = {
  id: number,
  title: string,
  done: boolean,
};

class TaskService {
 
  cmd(command: string) {
    return axios
      .post<{}, {stdout: string, stderr: string, code: number}>('/cmd', {command: command})
      .then((response) => response.data);
  }

  create(title: string) {
    return axios
      .post<{}, { id: number }>('/tasks', { title: title })
      .then((response) => response.data.id);
  }
}

const taskService = new TaskService();
export default taskService;
