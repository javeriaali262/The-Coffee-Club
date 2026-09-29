function ViewProduct() {
  const products = [
    { name: "Margherita Pizza", category: "Pizza", price: 900, stock: 25 },
    { name: "Cappuccino", category: "Coffee", price: 300, stock: 50 },
    { name: "Chocolate Shake", category: "Shakes", price: 380, stock: 30 },
  ];

  return (
    <div className="admin-card">
      <h3 className="mb-4">View Product</h3>
      <p className="text-muted mb-3">Available products:</p>
      <ul className="list-group">
        {products.map((p) => (
          <li key={p.name} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{p.name}</strong>
                <div className="text-muted small">{p.category}</div>
              </div>
              <div className="text-end">
                <div>Rs. {p.price}</div>
                <div className="text-muted small">{p.stock} in stock</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewProduct;