const express = require('express');
const { Workspace } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all workspaces for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const workspaces = await Workspace.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new workspace
router.post('/', auth, async (req, res) => {
  try {
    const workspace = await Workspace.create({
      ...req.body,
      UserId: req.user.id
    });
    res.status(201).json(workspace);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific workspace
router.get('/:id', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      where: { 
        id: req.params.id,
        UserId: req.user.id
      }
    });
    
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a workspace
router.put('/:id', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      where: { 
        id: req.params.id,
        UserId: req.user.id
      }
    });
    
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    
    await workspace.update(req.body);
    res.json(workspace);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a workspace
router.delete('/:id', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      where: { 
        id: req.params.id,
        UserId: req.user.id
      }
    });
    
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    
    await workspace.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;