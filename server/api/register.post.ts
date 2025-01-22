import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default defineEventHandler(async (event) => {
  let db;
  try {
    const {username, password} = await readBody(event)
      db = await open({
      filename: "./userinfo.sqlite",
      driver: sqlite3.Database,
    });
    await db.run(
        'INSERT INTO userinfo (username, password, token, token_expires_at) VALUES (?,?,?,?)',
        [username, password, null, null]
    )
    return {
        statusCode: 200,
        message:"注册成功"
    }
  } catch (e) {
    return {
        statusCode: 500,
        message: "Internal Error:"+e
    }
  }
  finally{
    if(db)await db.close()
  }
});
