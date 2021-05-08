const app = require("./server");
const config = require("./config");

const Database = require("./database");
const { instance } = require("./database");
const db = new Database();

let connectionString =
  "mongodb+srv://huuthang:huuthang@cluster0.6gdfq.mongodb.net/Imgtest?retryWrites=true&w=majority";

async function main() {
  try {
    await instance.connectToDb(connectionString);
    // app.use(cors());
    app.listen(config.PORT, config.HOST, () => {
      console.log(`server is running on ${config.HOST}:${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
