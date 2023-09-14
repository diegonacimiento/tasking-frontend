import axios from "axios";

const config = {
  db_Url: import.meta.env.VITE_URL,
};

class usersService {
  async loginUser(body) {
    const login = await axios.post(`${config.db_Url}/api/v1/auth/login`, body);
    return login;
  }

  async create(body) {
    const newUser = await axios.post(
      `${config.db_Url}/api/v1/users/create`,
      body,
    );
    return newUser;
  }

  async update(body, token) {
    const update = await axios.put(
      `${config.db_Url}/api/v1/users/update`,
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return update;
  }

  async updatePassword(body, token) {
    const updatePass = await axios.put(
      `${config.db_Url}/api/v1/users/change-password`,
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return updatePass;
  }

  async recoveryPassword(body) {
    const response = await axios.post(
      `${config.db_Url}/api/v1/auth/recoveryPassword`,
      body,
    );
    return response;
  }

  async recoveryChangePassword(body) {
    const response = await axios.post(
      `${config.db_Url}/api/v1/auth/newPassword`,
      body,
    );
    return response;
  }
}

export default usersService;
