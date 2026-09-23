import React from "react";
import useFetch from "./hooks/useFetch";

const API_URL = "https://api.escuelajs.co/api/v1/products";

function App() {
  const { data, loading, error, refetch } = useFetch(API_URL);

  return (
    <main className="page">
      <section className="top">
        <div>
          <p className="eyebrow">Task 5 • React Custom Hooks</p>
          <h1>Products</h1>
          <p className="intro">
            Product data fetched with a reusable <code>useFetch</code> custom hook.
          </p>
        </div>
        <button className="refresh" onClick={refetch} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </section>

      {loading && (
        <div className="status">
          <div className="spinner"></div>
          <p>Fetching products...</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <strong>Unable to load products.</strong>
          <p>{error}</p>
          <button onClick={refetch}>Try Again</button>
        </div>
      )}

      {!loading && !error && Array.isArray(data) && (
        <>
          <p className="count">Showing {data.length} products</p>
          <section className="grid">
            {data.map((product) => {
              const image =
                Array.isArray(product.images) && product.images.length
                  ? product.images[0]
                  : "https://placehold.co/600x400?text=No+Image";

              return (
                <article className="card" key={product.id}>
                  <img
                    src={image}
                    alt={product.title || "Product"}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Image+Unavailable";
                    }}
                  />
                  <div className="content">
                    <span className="category">
                      {product.category?.name || "Product"}
                    </span>
                    <h2>{product.title}</h2>
                    <p className="description">
                      {product.description || "No description available."}
                    </p>
                    <strong className="price">${product.price}</strong>
                  </div>
                </article>
              );
            })}
          </section>
        </>
      )}

      {!loading && !error && !Array.isArray(data) && (
        <div className="error-box">
          <strong>Unexpected API response.</strong>
          <p>The endpoint did not return a product array.</p>
        </div>
      )}
    </main>
  );
}

export default App;