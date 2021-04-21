const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
  // find all categories
  const categoryData = await Category.findAll({
    //including associated model Product
    include: [{ model: Product, attributes:['id', 'product_name', 'price', 'stock','category_id']}]
  });
  res.status(200).json(categoryData);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
  // find one category by its `id` value
  const  categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product, attributes:['id', 'product_name', 'price', 'stock','category_id']}]
  });
  if(!categoryData){
    res.status(404).json({message: 'No category found with this ID'});
    return
  }
  res.status(200).json(categoryData);
}catch(err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  try{
  // create a new category
  const  categoryData = await Category.create(req.body);
  res.status(200).json(categoryData);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
 
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
