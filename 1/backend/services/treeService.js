const treeModel = require('../models/treeModel');

async function getAllTrees() {
  return await treeModel.getAllTrees();
}

async function getTreeById(id) {
  return await treeModel.getTreeById(id);
}

async function createTree(data) {
  return await treeModel.createTree(data);
}

async function updateTree(id, data) {
  return await treeModel.updateTree(id, data);
}

async function deleteTree(id) {
  return await treeModel.deleteTree(id);
}

module.exports = {
  getAllTrees,
  getTreeById,
  createTree,
  updateTree,
  deleteTree
};
