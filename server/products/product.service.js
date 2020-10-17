const db = require('../helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Product.find();
}

async function getById(id) {
    return await Product.findById(id);
}

async function create(productParam) {
    // validate
    if (await Product.findOne({ productName: productParam.productName })) {
        throw 'Product "' + productParam.productName + '"already exist';
    }

    const product = new Product(productParam);


    // save product
    await product.save();
}

async function update(id, productParam) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';
    if (product.productName !== productParam.productName && await User.findOne({ productName: productParam.productName })) {
        throw 'Product name "' + productParam.productName + '" is already taken';
    }


    // copy productParam properties to product
    Object.assign(product, productParam);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}