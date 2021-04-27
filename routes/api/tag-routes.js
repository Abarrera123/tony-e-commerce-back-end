const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    // find all tags
    const tagData = await Tag.findAll({
      //including associated model Product
      include: [{ model: Product, attributes:['id', 'product_name', 'price', 'stock','category_id']}]
    });
    res.status(200).json(tagData);
    }catch(err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  try{
    // find one tag by its `id` value
    const  tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, attributes:['id', 'product_name', 'price', 'stock','category_id']}]
    });
    if(!tagData){
      res.status(404).json({message: 'No tagfound with this ID'});
      return
    }
    res.status(200).json(tagData);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    // create a new tag
    const  tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
    }catch(err) {
      res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
