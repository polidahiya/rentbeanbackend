const jwt = require("jsonwebtoken");

module.exports=function verifyToken(req, res, next) {
    //
    if (req.headers.cookie) {
      const cookiedata = req.headers.cookie;
      const cookiesArray = cookiedata.split(";");
      const cookiesobject = {};
      cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.trim().split("=");
        cookiesobject[key] = value.replace(/%40/g, "@");
      });
      const token = cookiesobject.token;
  
      //
      if (token) {
        jwt.verify(token, "this-world-is-toxic", (err, decoded) => {
          if (err) {
            return res.json({ message: "Invalid token" });
          }
          req.email = decoded.userId;
          next();
        });
      } else {
        return res.json({ message: "Token not provided" });
      }
    } else {
      console.log("unlogined request");
      return res.json({ message: "Please login first" });
    }
  }