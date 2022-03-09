import React, { Component } from "react";

import Identicon from 'identicon.js'

class Main extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="content">
          <h2 style={{ marginBottom: "20px" }}>Write something</h2>
          <form onSubmit={(event) => {
            event.preventDefault()
            const content = this.postContent.value
            this.props.createPost(content)
          }}>
            <div className="form-group mr-sm-2">
              <input
                id="postContent"
                type="text"
                ref={(input) => { this.postContent = input }}
                className="form-control"
                placeholder="What's on your mind?"
                required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Share</button>
          </form>
          { this.props.posts.map((post, key) => {
            return(
              <div className="card mb-4" key={key} >
                <div className="card-header">
                  <img
                    className="mr-2"
                    width='30'
                    height='30'
                    alt='card-header'
                    src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                  />
                  <small className="text-muted">{post.author}</small>
                </div>
                <ul id="postList" className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p>{post.content}</p>
                  </li>
                  <li key={key} className="list-group-item py-2">
                    <small className="float-left mt-1 text-muted">
                      TIPS: {window.web3.utils.fromWei(post.tipAmount.toString())} ETH
                    </small>
                    <button
                      className="btn btn-link btn-sm float-right pt-0"
                      name={post.id}
                      onClick={(event) => {
                        let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                        this.props.tipPost(event.target.name, tipAmount)
                      }}
                    >
                      <span>
                        TIP 0.1 ETH
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
        <div style={{ minWidth: "50px", minHeight: "50px" }} />
        <div id="content">
        <h1>Add Product</h1>
        <form
          onSubmit={event => {
            event.preventDefault();
            const name = this.productName.value;
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            this.props.createProduct(name, price);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={input => {
                this.productName = input;
              }}
              value="name"
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={input => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
        <p> </p>
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
            {this.props.products.map((product, key) => {
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
                        onClick={event => {
                          this.props.purchaseProduct(
                            event.target.name,
                            event.target.value
                          );
                        }}
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
  }
}

export default Main;
