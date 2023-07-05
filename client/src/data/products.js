// Basic Plan: price_1NFkBvE90bFljz7QS7Ejo4SM
// Premium Plan: price_1NFkCAE90bFljz7QHVC7RfUS

const products = [
    {
        id: "price_1NFkBvE90bFljz7QS7Ejo4SM",
        title: "Basic Plan with Stuffy Stuff", 
        description: "· Your Standard Monthly Subscription Plan, · Access to tools only. no download available",
        price: 9.99,
        subscription: true, 
        subscriptionType: "month",
        productImageURL: "./images/basic-plan-stock-image.png",
        opposite_id: "price_1NFkCAE90bFljz7QHVC7RfUS",
        
    },
    {
        id: "price_1NFkCAE90bFljz7QHVC7RfUS",
        title: 'Premium Plan with Advanced Tools',
        description: "· Save $20 / year on your Subscription Plan, · Download stuff on Demand, · Access to everything, stuffy stuff ",
        price: 99.99,
        subscription: true,
        subscriptionType: "year",
        productImageURL: "./images/premium-plan-stock-image.png",
        opposite_id: "price_1NFkBvE90bFljz7QS7Ejo4SM",
    }

]

function getProductData(id) {
    let productData = products.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { products, getProductData }