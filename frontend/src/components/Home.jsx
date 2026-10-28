import '../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getProduct();
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching menu products:', error);
        setLoadError(error.response?.data?.message || 'Unable to load menu.');
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    `${product.productName} ${product.productCategory}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold" href="#home">☕ The Coffee Club</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#menu">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#story">
                  Our Story
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customer">
                  Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rider">
                  Rider
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            </ul>

            <form className="d-flex me-2" role="search" onSubmit={(event) => event.preventDefault()}>
              <input className="form-control me-2" type="search" placeholder="Search menu" aria-label="Search menu" value={search} onChange={(event) => setSearch(event.target.value)} />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>

          </div>
        </div>
      </nav>

      {/* HERO CAROUSEL */}
      <div id="home" className="carousel slide hero-carousel" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="pic1.jfif" alt="Breakfast" />
          </div>
          <div className="carousel-item">
            <img src="pic2.jfif" alt="Lunch" />
          </div>
          <div className="carousel-item">
            <img src="pic3.jfif" alt="Dinner" />
          </div>
        </div>
        <div className="hero-caption">
          <h1>The Coffee Club</h1>
          <p>Breakfast • Lunch • Dinner — freshly made, every single day</p>
          <a href="#menu" className="btn btn-coffee btn-lg">View Menu</a>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* MENU SECTION */}
      <section className="menu-section" id="menu">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Explore Our Menu</h2>
            <p className="text-muted">Something for every craving, all day long</p>
          </div>
          {loadError ? (
            <p className="text-danger text-center">{loadError}</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center">{products.length ? 'No matching products.' : 'No products available yet.'}</p>
          ) : (
            <div className="row g-4 justify-content-center">
              {filteredProducts.map((product) => (
                <div className="col-6 col-md-4 col-lg-3" key={product.productId}>
                  <div className="card menu-cat-card h-100">
                    <img src={`http://localhost:3000${product.productImage}`} className="card-img-top" alt={product.productName} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="mb-1">{product.productCategory}</p>
                      <p className="mb-0">Rs. {product.productPrice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="story-section" id="story">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="mainpic.png"
                className="img-fluid rounded shadow-sm"
                alt="The Coffee Club interior"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="mb-3">Our Story</h2>
              <p className="text-muted">
                The Coffee Club started with a simple idea — bring people together over good food and great coffee.
                What began as a small neighborhood cafe has grown into a place where breakfast, lunch, and dinner
                all feel like home.
              </p>
              <p className="text-muted">
                Every dish on our menu is made fresh daily, from our signature pizzas and pastas to hand-crafted
                coffee and shakes. Whether you're stopping by for a quick espresso or settling in for a full meal
                with friends, our goal is the same: good food, warm service, and a place you'll want to come back to.
              </p>
              <a href="#menu" className="btn btn-coffee btn-lg mt-2">Explore Our Menu</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-light text-center py-4" id="contact">
        <p className="mb-1">&copy; 2026 The Coffee Club. All rights reserved.</p>
        <p className="mb-0 small">Breakfast • Lunch • Dinner</p>
      </footer>
    </>
  );
}

export default Home;