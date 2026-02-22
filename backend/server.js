const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createClient } = require('redis');
const { Pool } = require('pg');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

/* ================= Redis ================= */
const redisClient = createClient({
  url: 'redis://localhost:6379'
});

redisClient.connect()
  .then(() => console.log('Redis connected'))
  .catch(console.error);

/* ================= PostgreSQL ================= */
const pgPool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'authuser',
  password: 'authpass',
  database: 'authdb',
});

pgPool.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(console.error);

/* ================= Express ================= */
const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

/* ================= SEND OTP ================= */
app.post('/auth/otp/send', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      ok: false,
      message: 'phone is required'
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await redisClient.setEx(`otp:${phone}`, 60, otp);


  return res.json({
    ok: true,
    message: 'OTP sent'
  });
});

/* ================= VERIFY OTP + LOGIN / SIGN UP ================= */
app.post('/auth/otp/verify', async (req, res) => {
  
  const { phone, otp, mode, password } = req.body;

  /* ===== verification ===== */
  if (!phone || !otp || !mode) {
    return res.status(400).json({
      ok: false,
      message: 'Invalid request'
    });
  }

  if (!password) {
    return res.status(400).json({
      ok: false,
      message: 'Password is required'
    });
  }

  /* ===== OTP verification ===== */
  const savedOtp = await redisClient.get(`otp:${phone}`);

  if (!savedOtp) {
    return res.status(400).json({
      ok: false,
      message: 'OTP expired or not found'
    });
  }

  if (savedOtp !== otp) {
    return res.status(400).json({
      ok: false,
      message: 'Password or verification code is incorrect'
    });
  }

  // await redisClient.del(`otp:${phone}`);

  /* ===== user query ===== */
  const result = await pgPool.query(
    'SELECT id, password_hash FROM users WHERE phone = $1',
    [phone]
  );

  let userId;
  let action;

  /* ================= SIGN UP ================= */
  if (result.rows.length === 0) {
    if (mode === 'login') {
      return res.status(400).json({
        ok: false,
        message: 'Account not found. Please sign up first.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await pgPool.query(
      'INSERT INTO users (phone, password_hash) VALUES ($1, $2) RETURNING id',
      [phone, passwordHash]
    );

    userId = created.rows[0].id;
    action = 'registered';
  }

  /* ================= LOGIN ================= */
  else {
    if (mode === 'register') {
      return res.status(400).json({
        ok: false,
        message: 'This account already exists. Please log in.'
      });
    }

    const user = result.rows[0];

const { password } = req.body;

if (!password) {
  return res.status(400).json({
    ok: false,
    message: 'Password is required.'
  });
}

// ✅ situation A：existing user，no password in the database yet（password_hash is null）
if (!user.password_hash) {
  const newHash = await bcrypt.hash(password, 10);

  await pgPool.query(
    'UPDATE users SET password_hash = $1 WHERE id = $2',
    [newHash, user.id]
  );

  userId = user.id;
  action = 'logged_in'; // first password reset → successful login

  return res.json({
    ok: true,
    action,
    userId,
    token: jwt.sign(
      { sub: userId, phone },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
  });
}

// ✅ situation B：existed user，password already exists → verify password  
const isPasswordValid = await bcrypt.compare(
  password,
  user.password_hash
);

if (!isPasswordValid) {
  return res.status(400).json({
    ok: false,
    message: 'Password or verification code is incorrect.'
  });
}

// ✅ password is correct → login successful
userId = user.id;
action = 'logged_in';

}

  /* ===== JWT ===== */
  const token = jwt.sign(
    { sub: userId, phone },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  console.log('AUTH SUCCESS:', action, 'USER:', userId);

  return res.json({
    ok: true,
    action,
    userId,
    token
  });
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
