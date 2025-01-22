import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { deleteCookie } from "h3";


export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const sessionId = cookies.session_id
  if(!sessionId){
    console.log("No session found")
    return {
      statusCode: '402',
      message:"No Session Found"
    }
  }

  const db = await open({
    filename: "./userinfo.sqlite",
    driver: sqlite3.Database,
  });
  try {
    
    await db.run('DELETE FROM userinfo WHERE token=?', [sessionId])
    deleteCookie(event, sessionId)
    console.log(sessionId)
    return {
      statusCode:200,
      message: "OK"
    }
    // const sessionId = await db.get(
    //   "SELECT token FROM userinfo WHERE username=?",
    //   username
    // );

    // if (username) {
    //   if (sessionId.token) {
    //     await db.run("DELETE FROM userinfo WHERE token=?", sessionId.token);

    //     setCookie(event, "session_id", sessionId.token, { maxAge: -1 });


    //     return {
    //       statusCode: 200,
    //       message: "OK",
    //     };
    //   } else {
    //     return {
    //       statusCode: 200,
    //       message: "OK",
    //     };
    //   }
    // } else {
    //   return {
    //     statusCode: 402,
    //     message: "请先登陆",
    //   };
    // }
  }
  finally{
    await db.close()
  }
});
