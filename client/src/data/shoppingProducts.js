// Basic Plan: price_1NFkBvE90bFljz7QS7Ejo4SM
// Premium Plan: price_1NFkCAE90bFljz7QHVC7RfUS

const shoppingProducts = [
    {
        id: 1,
        name: "Product 1",
        price: 19.99,
        image: "https://cdn.shopify.com/s/files/1/0244/9349/0240/products/GoldenButterflyWingsBoutiqueAbstractWallArtFineArtCanvasPrintsModernPicturesForLuxuryLivingRoomBedroomStylishGlamourHomeDecor3.jpg?v=1658783761&width=1445",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        sale: false,
        title: 'Product 1',
      },
      {
        id: 2,
        name: "Product 2",
        price: 29.99,
        image: "https://cdn.shopify.com/s/files/1/0485/9605/8266/products/home-family-love-wall-art-painting-calligraphy-area-collections-home-decor-736954.jpg?v=1676551063",
        description: "Nulla fringilla mauris non arcu maximus, eu fermentum tortor tincidunt.",
        sale: false,
        title: 'Product 2',
      },
      {
        id: 3,
        name: "Product 3",
        price: 39.99,
        image: "https://cdn.shopify.com/s/files/1/2537/8806/products/Custom-Mural-3D-Creative-Geometric-Pattern-Golden-Lines-TV-Background-Wall-Papers-Home-Decor-Living-Room_1200x1200.jpg?v=1594180679",
        description: "Aenean auctor odio at diam placerat, a tempor velit rutrum.",
        sale: false,
        title: 'Product 3',
      },
      {
        id: 4,
        name: "Product 4",
        price: 19.99,
        image: "https://www.beddingandbeyond.club/cdn/shop/products/product-image-1696242742_1024x1024.jpg?v=1615077529",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 4 ",
        sale: false,
        title: 'Product 4',
      },
      {
        id: 5,
        name: "Product 5",
        price: 29.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3J-YjwQcbQbmQMxxrL_f-4h4CdcOn2vCm2A&usqp=CAU",
        description: "Nulla fringilla mauris non arcu maximus, eu fermentum tortor tincidunt. 5",
        sale: true,
        title: 'Product 5',
      },
      {
        id: 6,
        name: "Product 6",
        price: 39.99,
        image: "https://cdn.shopify.com/s/files/1/0271/2354/8271/products/White-Black-Modern-Led-Chandeliers-For-Living-Dining-Room-Dimmable-Remote-Controller-Iron-Body-Lighting-Fixture_1_800x.jpg?v=1596140372",
        description: "Aenean auctor odio at diam placerat, a tempor velit rutrum. 6",
        sale: false,
        title: 'Product 6',
      },
      {
        id: 7,
        name: "Product 7",
        price: 19.99,
        image: "https://cdn.shopify.com/s/files/1/0099/0363/6546/products/abstract-love-multi-panel-canvas-wall-art-1-517037_1200x.jpg?v=1680095166",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 4 ",
        sale: false,
        title: 'Product 7',
      },
      {
        id: 8,
        name: "Product 8",
        price: 29.99,
        image: "https://www.cheapcaribbean.com/globalassets/hotels/LTMSImg/STATIC_IMG1.JPG",
        description: "Nulla fringilla mauris non arcu maximus, eu fermentum tortor tincidunt. 5",
        sale: false,
        title: 'Product 8',
      },
      {
        id: 9,
        name: "Product 9",
        price: 39.99,
        image: "https://santorinidave.com/wp-content/uploads/2021/12/tokyo-station-hotel.jpeg",
        description: "Aenean auctor odio at diam placerat, a tempor velit rutrum. 6",
        sale: true,
        title: 'Product 9',
      },
      {
        id: 10,
        name: "Product 10",
        price: 39.99,
        image: "https://cdn.shopify.com/s/files/1/0229/8055/8912/products/luxury-large-black-color-crystal-living-room-ceiling-light-108734.jpg?v=1671969180",
        description: "Aenean auctor odio at diam placerat, a tempor velit rutrum. 6",
        sale: false,
        title: 'Product 10',
      }
    // {
    //     id: 3,
    //     title: 'Premium Plan 2',
    //     description: "A Yearly-Subscription Plan 2 with access to...",
    //     price: 199.99,
    //     subscription: true,
    //     type: "year"
    // },
    // {
    //     id: 4,
    //     title: 'Premium Plan 3',
    //     description: "A Yearly-Subscription Plan 3 with access to...",
    //     price: 299.99,
    //     subscription: true,
    //     type: "year"
    // }

]

function getProductData(id) {
    let productData = shoppingProducts.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Shopping Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { shoppingProducts, getProductData }