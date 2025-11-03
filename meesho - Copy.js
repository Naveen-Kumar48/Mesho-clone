// Product database (mock data - in real app, this would be in a database)
let products = [
  {
    id: 1,
    name: "Women's Dress",
    price: 299,
    category: "Fashion",
    image: "dress1.jpg",
    description: "Beautiful summer dress",
    stock: 50,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 499,
    category: "Electronics",
    image: "watch1.jpg",
    description: "Latest smart watch with health features",
    stock: 30,
    rating: 4.2,
  },
];

// Get all products
function getAllProducts() {
  return products;
}

// Get product by ID
function getProductById(id) {
  return products.find((product) => product.id === id);
}

// Add new product
function addProduct(product) {
  const newProduct = {
    id: products.length + 1,
    ...product,
    rating: 0,
  };
  products.push(newProduct);
  return newProduct;
}

// Update product
function updateProduct(id, updatedData) {
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedData };
    return products[index];
  }
  return null;
}

// Delete product
function deleteProduct(id) {
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    const deletedProduct = products[index];
    products = products.filter((product) => product.id !== id);
    return deletedProduct;
  }
  return null;
}

// Search products by name or category
function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );
}

// Get products by category
function getProductsByCategory(category) {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

// Get products by price range
function getProductsByPriceRange(minPrice, maxPrice) {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
}

// Update product stock
function updateProductStock(id, quantity) {
  const product = getProductById(id);
  if (product) {
    product.stock += quantity;
    return product;
  }
  return null;
}

// Get top rated products
function getTopRatedProducts(limit = 5) {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

// Mobile Menu Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const nav = document.querySelector("nav");

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !nav.contains(event.target) &&
        !mobileMenuToggle.contains(event.target)
      ) {
        nav.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });

    // Close mobile menu when clicking on a nav item
    const navItems = nav.querySelectorAll("li");
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        nav.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      });
    });

    // Close mobile menu on escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        nav.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });

    // Prevent body scroll when mobile menu is open
    mobileMenuToggle.addEventListener("click", function () {
      if (nav.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
  }
});

// Export all functions
module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  getProductsByPriceRange,
  updateProductStock,
  getTopRatedProducts,
};
