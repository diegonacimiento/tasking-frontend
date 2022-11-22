import axios from "axios";

class tasksService {
  async searchAll(token) {
    const tasks = await axios(
      "https://tasking-app.herokuapp.com/api/v1/tareas",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return tasks;
  }

  async create(task, token) {
    const newTask = await axios.post(
      "https://tasking-app.herokuapp.com/api/v1/tareas/create",
      { description: `${task}` },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return newTask;
  }

  async update(body, id, token) {
    await axios.put(
      `https://tasking-app.herokuapp.com/api/v1/tareas/${id}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async delete(id, token) {
    await axios.delete(
      `https://tasking-app.herokuapp.com/api/v1/tareas/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async searchUser(token) {
    const user = await axios(`https://tasking-app.herokuapp.com/api/v1/usuarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return user;
  }

  async updateTaskId(body, token) {
    await axios.put(
      `https://tasking-app.herokuapp.com/api/v1/usuarios/editar`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}

export default tasksService;
