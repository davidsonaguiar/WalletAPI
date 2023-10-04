import app from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT): 3001;

app.listen(PORT, () => console.log("Service listening on port: " + PORT));