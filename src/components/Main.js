import React from "react";

// import Identicon from "identicon.js";

const Main = ({
  products,
  // productCount,
  // posts,
  // postCount,
  // createPost,
  createProduct,
  // tipPost,
  purchaseProduct
}) => {
  // const [postContent, setPostContent] = React.useState("");

  const [productPrice, setProductPrice] = React.useState("");

  const [productName, setProductName] = React.useState("");

  // const handleCreatePost = e => {
  //   e.preventDefault();
  //   createPost(postContent);
  // };

  const handleCreateProduct = event => {
    event.preventDefault();
    const name = productName;
    const price = window.web3.utils.toWei(
      productPrice.toString(),
      "Ether"
    );
    createProduct(name, price);
  };

  // const handleSendTip = event => {
  //   let tipAmount = window.web3.utils.toWei("0.1", "Ether");
  //   tipPost(event.target.name, tipAmount);
  // };

  const handleBuyProduct = event => {
    purchaseProduct(event.target.name, event.target.value);
  };

  // const getPostImage = author =>
  //   `data:image/png;base64,${new Identicon(author, 30).toString()}`;

  return (
    <div className="d-flex flex-column">
      {/* <div id="content">
        <h2>Write something</h2>
        <form onSubmit={handleCreatePost}>
          <div className="form-group mr-sm-2">
            <input
              id="postContent"
              type="text"
              onChange={e => setPostContent(e.target.value)}
              value={postContent}
              className="form-control"
              placeholder="What's on your mind?"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Share
          </button>
        </form>
        {posts.map((post, i) => (
          <div className="card mb-4" key={i}>
            <div className="card-header">
              <img
                className="mr-2"
                width="30"
                height="30"
                alt="card-header"
                src={getPostImage(post.author)}
              />
              <small className="text-muted">{post.author}</small>
            </div>
            <ul id="postList" className="list-group list-group-flush">
              <li className="list-group-item">
                <p>{post.content}</p>
              </li>
              <li key={i} className="list-group-item py-2">
                <small className="float-left mt-1 text-muted">
                  TIPS: {window.web3.utils.fromWei(post.tipAmount.toString())}{" "}
                  ETH
                </small>
                <button
                  className="btn btn-link btn-sm float-right pt-0"
                  name={post.id}
                  onClick={handleSendTip}
                >
                  <span>TIP 0.1 ETH</span>
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div> */}
      <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={handleCreateProduct}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              value={productPrice}
              onChange={e => setProductPrice(e.target.value)}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {products.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                  <td>{product.owner}</td>
                  <td>
                    {!product.purchased ? (
                      <button
                        name={product.id}
                        value={product.price}
                        onClick={handleBuyProduct}
                      >
                        Buy
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
