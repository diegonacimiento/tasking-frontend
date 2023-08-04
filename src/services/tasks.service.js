import axios from "axios";

const config = {
  db_Url: import.meta.env.VITE_URL,
};

class tasksService {
  async searchAll(token) {
    const tasks = await axios(`${config.db_Url}/api/v1/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return tasks;
  }

  async create(task, token) {
    const newTask = await axios.post(
      `${config.db_Url}/api/v1/tasks/create`,
      { description: `${task}` },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return newTask;
  }

  async update(body, id, token) {
    await axios.put(`${config.db_Url}/api/v1/tasks/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async delete(id, token) {
    await axios.delete(`${config.db_Url}/api/v1/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async searchUser(token) {
    const user = await axios(`${config.db_Url}/api/v1/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return user;
  }

  async updateTaskId(body, token) {
    await axios.put(`${config.db_Url}/api/v1/users/update`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default tasksService;
