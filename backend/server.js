require('dotenv').config();
const express = require('express');
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
const app = express();
const routes = require('./routes/users');
const cookieParser = require('cookie-parser');
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to db', db.name));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './images/');
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage }).single('file');
app.use('/images', express.static('images/'));
// app.post('/api/uploads', (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       imgPath = req.file.path;
//       console.log(imgPath);
//       res.json({
//         succes: true,
//         pofile_url: `http://localhost:3000/file/${req.file.filename}`,
//       });
//       console.log(`http://localhost:3000/file/${req.file.filename}`);
//     }
//   });
// });
app.use('/api', routes);
app.listen(port, () => {
  console.log('Website served on http://localhost:' + port);
});
