const bcrypt = require("bcryptjs");

module.exports = [
  {
    username: "admin",
    password: bcrypt.hashSync("1", 10),
    isCreator: true,
    avatar: "",
  },
  {
    username: "party-supplier",
    password: bcrypt.hashSync("1", 10),
    isCreator: true,
    avatar: "",
  },
  {
    username: "owner55",
    password: bcrypt.hashSync("1", 10),
    isCreator: true,
    avatar: "",
  },
  {
    username: "scientology1954",
    password: bcrypt.hashSync("1", 10),
    isCreator: true,
    avatar: "",
  },
];
