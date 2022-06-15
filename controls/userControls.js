import * as User from "./../models/userModels.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ messae: "User is not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(user));
      res.end();
    }
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const { username, age, hobbies } = JSON.parse(body);
      const user = {
        username,
        age,
        hobbies,
      };
      const newUser = await User.create(user);

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newUser));
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User is not found" }));
    } else {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const { username, age, hobbies } = JSON.parse(body);
        const userData = {
          username: username || user.username,
          age: age || user.age,
          hobbies: hobbies || user.hobbies,
        };
        const updatedUser = await User.update(id, userData);

        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(updatedUser));
      });
    }
  } catch (e) {
    console.log(e);
  }
};
export const deleteUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User is not found" }));
    } else {
      await User.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `User ${id} is deleted successfully` })
      );
    }
  } catch (e) {
    console.log(e);
  }
};
