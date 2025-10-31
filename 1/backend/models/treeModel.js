const mysql = require('mysql2/promise');
require('dotenv').config();

// 使用 dotenv 載入的環境變數進行連線
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function getAllTrees() {
  const [rows] = await pool.query('SELECT * FROM trees');
  return rows;
}

async function getTreeById(id) {
  const [rows] = await pool.query('SELECT * FROM trees WHERE id = ?', [id]);
  return rows[0];
}

/**
 * 動態建立 INSERT 語句，適應 DTO 傳入的任何欄位組合。
 * 自動過濾 undefined/null 欄位，並加上反引號避免保留字衝突。
 */
async function createTree(data) {
  const cleanData = {};
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      cleanData[key] = data[key];
    }
  }

  const fields = Object.keys(cleanData).map(k => `\`${k}\``).join(', ');
  const placeholders = Object.keys(cleanData).map(() => '?').join(', ');
  const values = Object.values(cleanData);

  // 可選：顯示 SQL 組合內容
  console.log('🧾 SQL 欄位:', fields);
  console.log('📦 SQL 值:', values);

  const [result] = await pool.query(
    `INSERT INTO trees (${fields}) VALUES (${placeholders})`,
    values
  );
  return { id: result.insertId };
}

/**
 * 動態建立 UPDATE 語句，適應 DTO 傳入的任何欄位組合。
 * 自動加上反引號避免保留字衝突。
 */
async function updateTree(id, data) {
  const cleanData = {};
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      cleanData[key] = data[key];
    }
  }

  const setClauses = Object.keys(cleanData).map(key => `\`${key}\` = ?`).join(', ');
  const values = [...Object.values(cleanData), id];

  await pool.query(
    `UPDATE trees SET ${setClauses} WHERE id = ?`,
    values
  );
}

async function deleteTree(id) {
  await pool.query('DELETE FROM trees WHERE id = ?', [id]);
}

module.exports = {
  getAllTrees,
  getTreeById,
  createTree,
  updateTree,
  deleteTree
};
