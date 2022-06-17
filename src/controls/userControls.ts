import * as User from "../models/userModels";
import * as http from "http";

export const getUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const users = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Internal server error" }))
  }
};

export const getUser = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
  try {
    if ((/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(id)) {
      const user = await User.findById(id);

      if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User is not found" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(user));
        res.end();
      }
    } else {
      res.writeHead(400, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ message: "Provided id is not valid" }))
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Internal server error" }))
  }
};

export const createUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const { username, age, hobbies } = JSON.parse(body);
      console.log(username, age, hobbies)
      if (username && age && hobbies) {
        const user = {
          username,
          age,
          hobbies,
        };
        const newUser = await User.create(user);

        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Some fields are missing" }));
      }
    });
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Internal server error" }))
  }
};

export const updateUser = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
  try {
    if ((/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(id)) {
      const user: User.IUser = await User.findById(id);
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

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(updatedUser));
        });
      }
    } else {
      res.writeHead(400, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ message: "Provided id is not valid" }))
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Internal server error" }))
  }
};
export const deleteUser = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
  try {
    if ((/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(id)) {
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
    } else {
      res.writeHead(400, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ message: "Provided id is not valid" }))
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Internal server error" }))
  }
};
