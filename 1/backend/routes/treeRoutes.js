const express = require('express');
const router = express.Router();
const treeService = require('../services/treeService');
const { treeSchema } = require('../validators/treeValidator');
const { toTreeDTO } = require('../dto/treeDTO');
const Joi = require('joi');

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  };
}

// 取得所有資源
router.get('/', async (req, res, next) => {
  try {
    const trees = await treeService.getAllTrees();
    res.json(trees);
  } catch (error) {
    next(error); // 傳遞給 errorHandler
  }
});

// 取得單一資源
router.get('/:id', async (req, res, next) => {
  try {
    const tree = await treeService.getTreeById(req.params.id);
    if (!tree) return res.status(404).json({ error: 'Resource not found' });
    res.json(tree);
  } catch (error) {
    next(error);
  }
});

// 建立資源
router.post('/', validate(treeSchema), async (req, res, next) => {
  try {
    const dto = toTreeDTO(req.body);
    console.log('📦 DTO:', dto);
    const result = await treeService.createTree(dto);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// 更新資源
router.put('/:id', validate(treeSchema), async (req, res, next) => {
  try {
    const dto = toTreeDTO(req.body);
    await treeService.updateTree(req.params.id, dto);
    res.json({ success: true, message: 'Resource updated' });
  } catch (error) {
    next(error);
  }
});

// 刪除資源
router.delete('/:id', async (req, res, next) => {
  try {
    await treeService.deleteTree(req.params.id);
    res.json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
