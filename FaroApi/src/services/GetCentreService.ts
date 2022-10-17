import { CentrePublicDAO } from "../dao/public/CentrePublicDAO";
import { Centre } from "../model/Centre";
const centreDB = new CentrePublicDAO();

export const getCentreByParams = (query): Promise<Centre | any> => {
  return new Promise((resolve, reject) => {
    if (query.id) {
      centreDB.getCentre(query.id).then(
        (centre) => {
          resolve(centre);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else if (query.name) {
      centreDB.getCentreByName(query.name).then(
        (centre) => {
          resolve(centre);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else {
      let queryFilter = "select * from CENTRES_VW where ";
      const queryParams = []

      queryFilter = queryFilter + (query.free ? "free=? " : "free=free ");
      if(query.free) queryParams.push(query.free)

      queryFilter = queryFilter + (query.schoolarLevel ? "and schoolarLevel=? " : "and schoolarLevel=schoolarLevel ");
      if(query.schoolarLevel) queryParams.push(query.schoolarLevel)

      queryFilter = queryFilter + (query.centreSchedules ? "and centreSchedules=? " : "and centreSchedules=centreSchedules ");
      if(query.centreSchedules) queryParams.push("%" + query.centreSchedules + "%")

      centreDB
        .getCentresByFilter(
          queryFilter,
          query.free,
          query.schoolarLevel,
          query.centreSchedule,
          query.career,
          queryParams
        )
        .then(
          (centre) => {
            resolve(centre);
          },
          (reason) => {
            reject(reason);
          }
        );
    }
  });

};
