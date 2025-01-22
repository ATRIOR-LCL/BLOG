import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { parseCookies } from "h3";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const sessionId = cookies.session_id;
  if (!sessionId) {
    return {
      statusCode: 201,
      message: "请先登陆",
      
    };
  }
  const db = await open({
    filename: "./userinfo.sqlite",
    driver: sqlite3.Database,
  });
  try {
    const session = await db.get(
      "SELECT username FROM userinfo WHERE token=? AND token_expires_at > ?",
      [sessionId, new Date().toISOString()]
    );
    if(session){
        return {
            statusCode: 200,
            message:session.username as string,
        }
    }else{
        return {
            statusCode: 201,
            message:"NO",
        }
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      message: "Internal Server Error:" + e,
      data:{
        username:null
      }
    };
  } finally {
    await db.close();
  }
});
