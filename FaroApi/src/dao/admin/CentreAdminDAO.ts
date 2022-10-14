import { OkPacket } from "mysql2";
import { Centre, CentreDB } from "../../model/Centre";
import { dbAdmin } from "../../databaseCon/Database";
import { Career } from "../../model/Career";
import { CareerAdminDAO } from "./CareerAdminDAO";
import { CareerPublicDAO } from "../public/CareerPublicDAO";
import { createCareerVinculateCentreService } from "../../services/CreateCareerVinculateCentreService";
const careerAdminDB = new CareerAdminDAO();
const careerPublicDB = new CareerPublicDAO();

/*-
Only first method (getCareerById) is explained in detail,
every other method has only very specific comments
in order to avoid unnecessary excesive documentation
-*/

export class CentreAdminDAO {
  /*Method of type Promise of type Centre*/
  getCentre(id: number): Promise<Centre | undefined> {
    let centre: Centre;
    /*Database request are handled with Promises*/
    return new Promise((resolve, reject) => {
      /*Database requests are handled with Promises*/
      /*mysql2 driver requires classes that extend RowDataPacket*/
      dbAdmin.query<CentreDB[]>(
        /*Raw mysql query*/
        "select idCentre, centreName, free, addressStreet, addressNumber, latitude, longitude, phoneNumber, schoolarLevel, group_concat(centreSchedule) as centreSchedules from centre natural left join centre_schedules natural left join schoolarlevel natural left join SCHEDULES where idCentre=?",
        /*Every sent paramether will match every '?' mark*/
        [id],
        /*callback*/
        async (err, res) => {
          /*If error then reject the promise*/
          if (err) reject(err);
          else {
            /*if something was returned from database*/
            if (res?.[0].centreName !== null) {
              /*Just an assistant variable*/
              const centreData = res?.[0];
              /*Create a new centre (type Centre)*/
              centre = new Centre(
                centreData.idCentre,
                centreData.centreName,
                Boolean(centreData.free),
                centreData.addressStreet,
                centreData.addressNumber,
                centreData.latitude,
                centreData.longitude,
                centreData.centreSchedules.split(","),
                centreData.schoolarLevel,
                centreData.phoneNumber
              );
              /*then call method getCareers from careerDB in order to set the careers of the centre*/
              await careerPublicDB
                .getCareersByCentre(centre.getIdCentre())
                .then((careers) => {
                  centre.setCareers(careers);
                })
                .catch((err) => resolve(centre));
              resolve(centre);
            } else {
              reject("Centre not found");
            }
          }
        }
      );
    });
  }

  vinculateCentreSchoolarLevel(idCentre: number, scholarLevel: string) {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "call DBFiller_Centre_VinculateSchoolarLevel(?,?)",
        [idCentre, scholarLevel],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  createCentre(centre: Centre): Promise<Centre> {
    const centreCareers = centre.getCareers().map((career) => {
      return Object.assign(new Career(), career);
    });

    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "insert into CENTRE (centreName, free, addressStreet, addressNumber, latitude, longitude, phoneNumber) values(?,?,?,?,?,?,?)",
        [
          centre.getCentreName(),
          centre.isFree(),
          centre.getAddressStreet(),
          centre.getAddressNumber(),
          centre.getLatitude(),
          centre.getLongitude(),
          centre.getPhoneNumber(),
        ],
        async (err, res) => {
          if (err) reject(err);
          else {
            /*For every given schedule vinculate it to the centre*/
            await this.vinculateCentreSchedules(
              res.insertId,
              centre.getCentreSchedules()
            );
            /*For the given schoolar level, vinculate it to the centre*/
            await this.vinculateCentreSchoolarLevel(
              res.insertId,
              centre.getSchoolarLevel()
            );
            /*For every given career vinculate it to the centre*/
            if (centreCareers.length > 0) {
              createCareerVinculateCentreService(
                centreCareers,
                res.insertId
              ).then(() => {
                this.getCentre(res.insertId)
                  .then((centre) => resolve(centre!))
                  .catch(reject);
              });
            }
          }
        }
      );
    });
  }

  deleteSchedules(idCentre: number) {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "delete FROM CENTRE_SCHEDULES where idCentre=?",
        [idCentre],
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(res);
          }
        }
      );
    });
  }

  vinculateCentreSchedules(idCentre: number, schedule: string[]) {
    return new Promise((resolve, reject) => {
      schedule.forEach((sch) => {
        dbAdmin.query<OkPacket>(
          "call DBFiller_Centre_VinculateSchedules(?,?)",
          [idCentre, sch],
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );
      });
    });
  }

  updateSchedules(schedules: string[], idCentre: number) {
    return new Promise((resolve, reject) => {
      this.deleteSchedules(idCentre).then(() => {
        this.vinculateCentreSchedules(idCentre, schedules).then((res) => {
          resolve(res);
        });
      });
    });
  }

  updateCentre(idCentre: number, centre: Centre): Promise<Centre> {
    const centreCareers = centre.getCareers().map((career) => {
      return Object.assign(new Career(), career);
    });

    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "UPDATE CENTRE set centreName=?, free=?, addressStreet=?, addressNumber=?, latitude=?, longitude=?, phoneNumber=? where idCentre = ?",
        [
          centre.getCentreName(),
          centre.isFree(),
          centre.getAddressStreet(),
          centre.getAddressNumber(),
          centre.getLatitude(),
          centre.getLongitude(),
          centre.getPhoneNumber(),
          idCentre,
        ],
        async (err, res) => {
          if (err) reject(err);
          else {
            await this.vinculateCentreSchoolarLevel(
              idCentre,
              centre.getSchoolarLevel()
            );
            await this.updateSchedules(centre.getCentreSchedules(), idCentre);
            if (centreCareers.length > 0)
              await createCareerVinculateCentreService(
                centreCareers,
                res.insertId
              );
            this.getCentre(idCentre)
              .then((centre) => resolve(centre!))
              .catch(reject);
          }
        }
      );
    });
  }

  deleteCentre(idCentre: number): Promise<number> {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "call DBFiller_Centre_Delete(?)",
        [idCentre],
        async (err, res) => {
          if (err) reject(err);
          else {
            if (res.affectedRows === 0) reject(Error("Centre not found"));
            else {
              await this.deleteSchedules(idCentre);
              await careerAdminDB.clearCareers(idCentre);
              resolve(res.affectedRows);
            }
          }
        }
      );
    });
  }
}
