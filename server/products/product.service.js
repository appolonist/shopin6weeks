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
        throw 'Username "' + productParam.productName + '" is already taken';
    }

    const product = new Product(productParam);


    // save user
    await product.save();
}

async function update(id, productParam) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';
    if (product.productName !== productParam.productName && await User.findOne({ productName: productParam.productName })) {
        throw 'Product name "' + productParam.productName + '" is already taken';
    }


    // copy userParam properties to user
    Object.assign(product, productParam);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}