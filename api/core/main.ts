import { createApp } from "./src/index";

const app = createApp();

app.listen(8002, () => {
  console.log("Server is running on port 8002");
});
