import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.js" });
import { api } from './api'

const PORT = process.env.PORT;


api.listen(PORT, () => console.log(`Your port is ${PORT}`));
