import express from "express";
const careersPublic = express.Router();
import dotenv from "dotenv";
import { CareerPublicDAO } from "../../dao/public/CareerPublicDAO";
const careerDB = new CareerPublicDAO();
dotenv.config();

careersPublic.get("/", (req, res) => {
  careerDB.getAllCareers().then(
    (careers) => {
      res.status(200).json(careers);
    },
    (reason) => {
      res.status(404).send("Careers could not be returned " + reason);
    }
  );
});

careersPublic.get("/career", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  const byId = query.id ? true : false;
  const byName = query.name ? true : false;
  const byCentre = query.centreId ? true : false;
  const byNameLike = query.nameLike ? true : false;

  if (byId && !byName) {
    careerDB.getCareerById(query.id).then(
      (career) => {
        res.status(200).json(career);
      },
      (reason) => {
        res.status(404).send("Career could no be returned: " + reason);
      }
    );
  } else if (byName && !byId) {
    careerDB.getCareerByName(query.name).then(
      (career) => {
        res.status(200).json(career);
      },
      (reason) => {
        res.status(404).send("Career could no be returned: " + reason);
      }
    );
  } else if (byCentre) {
    careerDB.getCareersByCentre(query.centreId).then(
      (career) => {
        res.status(200).json(career);
      },
      (reason) => {
        res.status(404).send("Career could no be returned: " + reason);
      }
    );
  } else if (byNameLike && !byCentre && !byName && !byId) {
    careerDB.getCareersByNameLike(query.nameLike).then(
      (career) => {
        res.status(200).json(career);
      },
      (reason) => {
        res.status(404).send("Career could no be returned: " + reason);
      }
    );
  } else {
    res.status(400).send("Must send either an id, a name or a centre");
  }
});

export default careersPublic;
