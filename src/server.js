import dotenv from 'dotenv'; // samma som import dotenv from 'dotenv'; dotenv.config();
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running on g5app-ctepc9hrehedf2fw.swedencentral-01.azurewebsites.net`
  );
});
