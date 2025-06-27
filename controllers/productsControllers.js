const data = require('../data/products')
const getProducts =  (req, res) => {
  let { search, category, maxPrice, inStock, page = 1, limit = 5 } = req.query;

  let result = [...data.products];

  // Search by name
  if (search) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by category
  if (category) {
    result = result.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by price
  if (maxPrice) {
    result = result.filter(product => product.price <= Number(maxPrice));
  }

  // Filter by stock
  if (inStock) {
    const stockBool = inStock === 'true';
    result = result.filter(product => product.inStock === stockBool);
  }

  // Pagination
  limit = Number(limit);
  page = Number(page);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    success: true,
    total: result.length,
    page,
    limit,
    data: paginated
  });
};


const  getproduct = (req,res)=>{
  const {id} = req.params
  const product = products.find((product)=>product.id === id)
  if(!product){
    return res.status(404).send('product not found')
  }
  res.json(product)
}
const createProduct = (req,res)=>{
  const { name, description, price, category, inStock } = req.body
  if(!name || !description || price== null || !category || inStock == null){
    return res.status(400).json({success: false, msg: 'Please provide all product details'})
  }
  const newProduct = {
    id: (products.length + 1).toString(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json({success: true, data: products});
}
const updateProducts = (req,res)=>{
  const {id}= req.params
  const { name, description, price, category, inStock}= req.body

  const product = products.find((product)=>product.id === id)
  if (!product){
    return res.status(404).json({success: false, msg:`No product with id ${id}`})
  }
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category;
  if (inStock !== undefined) product.inStock = inStock;

  res.status(200).json({success: true, data: product})
}
const deleteProduct =  (req, res) => {
  const { id } = req.params;
  const product = data.products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({ success: false, msg: `No product with id ${id}` });
  }

  data.products = data.products.filter((product) => product.id !== id); // update original array
  return res.status(200).json({ success: true, data: data.products });
};

module.exports = {
    getProducts,
    getproduct,
    createProduct,
    updateProducts,
    deleteProduct
}