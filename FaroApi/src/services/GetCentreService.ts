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
      let queryParams = []
      queryFilter = queryFilter + (query.free ? "free=? " : "free=free ");
      query.free && queryParams.push(query.free === 'true')
      
      queryFilter = queryFilter + (query.schoolarLevel ? "and schoolarLevel=? " : "and schoolarLevel=schoolarLevel ");
      query.schoolarLevel && queryParams.push(query.schoolarLevel)

      queryFilter = queryFilter + (query.centreSchedules ? "and centreSchedules=? " : "and centreSchedules=centreSchedules ");
      query.centreSchedules && queryParams.push("%" + query.centreSchedules + "%")
    
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
