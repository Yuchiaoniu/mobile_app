import api from './api';

const RESOURCE_URL = '/trees';

/**
 * 取得所有樹木資料 (GET /trees)
 * @returns {Promise<Array>} 樹木資料陣列
 */
export async function getTrees() {
  try {
    const response = await api.get(RESOURCE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching trees:', error);
    throw error;
  }
}

/**
 * 依 ID 取得單一樹木資料 (GET /trees/:id)
 * @param {number} id - 樹木 ID
 * @returns {Promise<Object>} 單一樹木資料
 */
export async function getTreeById(id) {
  try {
    const response = await api.get(`${RESOURCE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tree ${id}:`, error);
    throw error;
  }
}

/**
 * 建立新樹木 (POST /trees)
 * 注意：此處的參數是根據後端 schema.sql 欄位推導而來。
 * @param {object} treeData - 包含 { CREATE,name,treename } 的物件
 * @returns {Promise<Object>} 新建立樹木的 ID
 */
export async function createTree(treeData) {
  // 後端 validator 期待的欄位： CREATE,name,treename
  // treeData 必須符合這些欄位。
  try {
    const response = await api.post(RESOURCE_URL, treeData);
    return response.data;
  } catch (error) {
    console.error('Error creating tree:', error);
    throw error;
  }
}

/**
 * 更新樹木資料 (PUT /trees/:id)
 * @param {number} id - 樹木 ID
 * @param {object} treeData - 包含 { CREATE,name,treename } 的物件
 * @returns {Promise<Object>} 更新結果訊息
 */
export async function updateTree(id, treeData) {
  try {
    const response = await api.put(`${RESOURCE_URL}/${id}`, treeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating tree ${id}:`, error);
    throw error;
  }
}

/**
 * 刪除樹木 (DELETE /trees/:id)
 * @param {number} id - 樹木 ID
 * @returns {Promise<Object>} 刪除結果訊息
 */
export async function deleteTree(id) {
  try {
    const response = await api.delete(`${RESOURCE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting tree ${id}:`, error);
    throw error;
  }
}

// 導出所有服務
const treeService = {
    getTrees,
    getTreeById,
    createTree,
    updateTree,
    deleteTree,
};

export default treeService;
