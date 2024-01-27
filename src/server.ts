import app from "./app";
import { Config } from "./config/development";


app.listen(Config.PORT, () => console.log("Service listening on port: " + Config.PORT));