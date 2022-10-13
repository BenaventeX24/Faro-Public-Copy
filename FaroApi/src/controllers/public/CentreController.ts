import express from "express";
const centrePublic = express.Router();
import dotenv from "dotenv";
import { CentrePublicDAO } from "../../dao/public/CentrePublicDAO";
const centreDB = new CentrePublicDAO();

dotenv.config();

centrePublic.get("/", (req, res) => {
  centreDB.getAllCentres().then(
    (centre) => {
      res.status(200).json(centre);
    },
    (reason) => {
      res.status(404).send("Centres could no be returned: " + reason);
    }
  );
});

centrePublic.get("/centresName", (req, res) => {
  centreDB.getAllCentresName().then(
    (centre) => {
      res.status(200).json(centre);
    },
    (reason) => {
      res.status(404).send("Centres could no be returned: " + reason);
    }
  );
});

centrePublic.get("/centresCoordinates", (req, res) => {
  centreDB.getAllCentresCoordinates().then(
    (coordinates) => {
      res.status(200).json(coordinates);
    },
    (reason) => {
      res.status(404).send("Centres could no be returned: " + reason);
    }
  );
});
