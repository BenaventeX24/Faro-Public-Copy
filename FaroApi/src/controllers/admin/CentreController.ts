import express from "express";
const centresAdmin = express.Router();
import dotenv from "dotenv";
import { CentreAdminDAO } from "../../dao/admin/CentreAdminDAO";
const centreDB = new CentreAdminDAO();
import { Centre } from "../../model/Centre";

dotenv.config();

centresAdmin.post("/", (req, res) => {
  const centre: Centre = Object.assign(new Centre(), req.body);

  centreDB.createCentre(centre).then(
    () => {
      res.status(200).send("Centre succesfully created");
    },
    (reason) => {
      res.status(404).send("Centre could not be created : " + reason);
    }
  );
});

centresAdmin.put("/centre", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  const centre: Centre = Object.assign(new Centre(), req.body);
  centreDB.updateCentre(query.id, centre).then(
    () => {
      res.status(200).send("Centre succesfully edited");
    },
    (reason) => {
      res.status(404).send("Centre could not be edited : " + reason);
    }
  );
});

centresAdmin.delete("/centre", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  centreDB.deleteCentre(query.id).then(
    () => {
      res.status(200).send("Centre was succesfully deleted");
    },
    (reason) => {
      res.status(404).send("Centre could not be deleted: " + reason);
    }
  );
});

export default centresAdmin;
