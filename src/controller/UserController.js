import crypto from "crypto";
import UserModel from "../model/UserModel.js";



const Controller = {
  index: async (request, response) => {
    response.send(users);
  },
  getOne: (request, response) => {
    const id = request.params.id;

    const user = users.find((user) => user.id === id);

    if (user) {
      return response.send({ user });
    }

    response.status(404).send({ message: "User not exist" });
  },
  store: async (request, response) => {
    const { name, email, role, password, phones } = request.body;
    const user = { name, email, role, password, phones, id: crypto.randomUUID(), };


    try{
      const newUser = await UserModel.create(user);
      if (user) return response.status(201).json({ message:  "User created: ", user })

      response.status(400).json({ message: "User not created" })
    }catch (error){
      console.log(error.message);
      response.status(500).json({ message: "Unexpected Error" })
    }


    users.push(user);

    response.send(user);
  },
  remove: (request, response) => {
    const { id } = request.params;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return response.status(404).send({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    response.send({ message: "User deleted" });
  },
  update: (request, response) => {
    const { id } = request.params;
    const { email, name } = request.body;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return response.status(404).send({ message: "User not found" });
    }

    users[userIndex] = {
      id,
      name,
      email,
    };

    response.send({ user: users[userIndex] });
  },
};

export default Controller;
