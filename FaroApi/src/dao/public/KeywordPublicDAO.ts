<<<<<<< HEAD
/*import { dbPublic } from "../../databaseCon/Database";
import { KeywordDB } from "../../model/Generics";
=======
import { OkPacket } from "mysql2";
import { dbPublic } from "../../databaseCon/Database";
import { KeywordDB, selectCount } from "../../model/Generics";
>>>>>>> 0a2b3e7cb218751ef8dffc6daeed3a476f326dd2

export class KeywordPublicDAO {
  getKeywordsByCareer(careerId: number): Promise<string[]> {
    const keywords: string[] = [];
    return new Promise((resolve, reject) => {
      dbPublic.query<KeywordDB[]>(
        "select  from KEYWORD natural join CAREER_KEYWORD where idCareer= ?",
        [careerId],
        (err, res) => {
          if (err) reject(err);
          else {
            res.forEach((word) => {
              keywords.push(word.keyword);
            });
            resolve(keywords);
          }
        }
      );
    });
  }

  getKeywords(): Promise<KeywordDB[]> {
    return new Promise((resolve, reject) => {
      dbPublic.query<KeywordDB[]>("select * from KEYWORD", async (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });
  }
}
*/
