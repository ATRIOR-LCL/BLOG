import sqlite3 from "sqlite3";
import { open } from "sqlite";
import crypto from "crypto";
import { setCookie } from "h3";

export default defineEventHandler(async (event) => {
  let db;
  try {
    const { username, password, remember } = await readBody(event);

    db = await open({
      filename: "./userinfo.sqlite",
      driver: sqlite3.Database,
    });

    const user = await db.get(
      "SELECT * FROM userinfo WHERE username=?",
      username
    );
    console.log(user);

    if (user) {
      if (remember == true) {
        const sessionId = crypto.randomBytes(16).toString("hex");
        const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString(); // 转为 ISO 格式
        await db.run(
          "UPDATE userinfo SET token=?, token_expires_at=? WHERE username=?",
          sessionId,
          expiresAt,
          username
        );

        setCookie(event, "session_id", sessionId, {
          httpOnly: true,
          path: "/",
          maxAge: 3600,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        return {
          statusCode: 200,
          message: "登陆成功",
        };
      } else {
        return {
          statusCode: 200,
          message: "登陆成功",
        };
      }
    } else {
      return {
        statusCode: 402,
        message: "请先注册",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      message: "Internal Server error:" + e,
    };
  } finally {
    if (db) await db.close();
  }
});
