import cluster from "cluster";
import os from "os";
import express from "express";
import sequelize from "./utilities/database.js";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

//all routes imported here
import authenticationRoutes from "./routes/authentication-routes.js";
import userRoutes from "./routes/user-routes.js";
import { centralError } from "./middleware/error-handlers/central-error.js";
// import bodyParser from "body-parser";

const cpu = os.cpus().length;

const port = process.env.PORT || 3300;

// app.use(corsError);
const app = express();

app.use(cors());
app.options("*", cors());

//handle cors error

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Callback-Type, Content-Type, Accept"
  );
  res.header("Cache-Control", "no-cache");
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < cpu; i++) {
    cluster.fork();
  }
  console.log(cpu);
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  //all routes entrypoint here
  app.use("/auth", authenticationRoutes);

  app.use("/user", userRoutes);

  app.use(helmet());
  app.use(compression());

  //central error handler here
  app.use(centralError);

  // sync with database
  sequelize
    .sync()
    .then(() => {
      app.listen(port);
      console.log(`Listening on ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
