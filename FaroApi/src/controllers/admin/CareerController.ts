import express from "express";
const careersAdmin = express.Router();
import dotenv from "dotenv";
import { CareerAdminDAO } from "../../dao/admin/CareerAdminDAO";
const careerDB = new CareerAdminDAO();
dotenv.config();

careersAdmin.delete("/career", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  if (!query.idCareer || !query.idCentre) {
    res.status(400).send("Must send both id of career and id of centre");
  } else {
    careerDB.deleteCareer(query.idCareer, query.idCentre).then(
      (response) => {
        res
          .status(200)
          .send("Career was succesfully desvinculated from centre");
      },
      (reason) => {
        res.status(404).send("Career could not be desvinculated: " + reason);
      }
    );
  }
});

export default careersAdmin;
