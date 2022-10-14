import express from "express";
const centresAdmin = express.Router();
import dotenv from "dotenv";
import { CentreAdminDAO } from "../../dao/admin/CentreAdminDAO";
const centreDB = new CentreAdminDAO();
import { Centre } from "../../model/Centre";
<<<<<<< HEAD
import { Errors } from "../configuration/errors/Errors";
import { CheckMissingProperty_Centre } from "../../services/CheckMissingProperty";
=======
>>>>>>> 0a2b3e7cb218751ef8dffc6daeed3a476f326dd2

dotenv.config();

centresAdmin.post("/", (req, res) => {
  const centre: Centre = Object.assign(new Centre(), req.body);

<<<<<<< HEAD
  const checkCorrectBody = CheckMissingProperty_Centre(centre);

  if (checkCorrectBody.ok)
    centreDB.createCentre(centre).then(
      () => {
        res.status(200).send("Centre succesfully created");
      },
      (reason) => {
        Errors.resourceNotCreated(
          res,
          "Centre could not be created : " + reason
        );
      }
    );
  else Errors.missingProperty(res, checkCorrectBody.property);
=======
  centreDB.createCentre(centre).then(
    () => {
      res.status(200).send("Centre succesfully created");
    },
    (reason) => {
      res.status(404).send("Centre could not be created : " + reason);
    }
  );
>>>>>>> 0a2b3e7cb218751ef8dffc6daeed3a476f326dd2
});

centresAdmin.put("/centre", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  const centre: Centre = Object.assign(new Centre(), req.body);
<<<<<<< HEAD

  const checkCorrectBody = CheckMissingProperty_Centre(centre);

  if (checkCorrectBody.ok)
    centreDB.updateCentre(query.id, centre).then(
      () => {
        res.status(200).send("Centre succesfully edited");
      },
      (reason) => {
        Errors.resourceNotEdited(res, "Centre could not be edited : " + reason);
      }
    );
  else Errors.missingProperty(res, checkCorrectBody.property);
=======
  centreDB.updateCentre(query.id, centre).then(
    () => {
      res.status(200).send("Centre succesfully edited");
    },
    (reason) => {
      res.status(404).send("Centre could not be edited : " + reason);
    }
  );
>>>>>>> 0a2b3e7cb218751ef8dffc6daeed3a476f326dd2
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
