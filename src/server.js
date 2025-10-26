import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `✅ Server is running on http://localhost:${PORT}`
  );
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_SERVER:', process.env.DB_SERVER);
  console.log('DB_PORT:', process.env.DB_PORT);
});
