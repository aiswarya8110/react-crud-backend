const { connect } = require("mongoose");
connect(process.env.DB_CONNECTION_URL).then(()=> console.log("Database is connected Successfully"))
.catch(()=> console.log("Unable to connect to database"));