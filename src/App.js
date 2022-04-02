import React from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from './abis/Marketplace.json'
import SocialNetwork from './abis/SocialNetwork.json'

import Navbar from './components/Navbar'
import Main from './components/Main'
import MetamaskAlert from './components/MetamaskAlert';

const App = () => {
  const [account, setAccount] = React.useState('')
  // const [productCount, setProductCount] = React.useState(0)
  const [products, setProducts] = React.useState([])
  // const [socialNetwork, setSocialNetwork] = React.useState(null)
  const [posts, setPosts] = React.useState([])
  // const [postCount, setPostCount] = React.useState(0)
  const [marketplace, setMarketplace] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [metamaskInstalled, setMetamaskInstalled] = React.useState(null)

  React.useEffect(() => {
      const metamaskIsInstalled = typeof window.web3 !== 'undefined'
      setMetamaskInstalled(metamaskIsInstalled)
  
      if (metamaskIsInstalled) loadData()
  }, [])

  const loadData = async () => {
    await loadWeb3()
    await loadBlockchainData()
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    // Load network data
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId] // verify with more networks (probably fixes "write something")

    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      setMarketplace(marketplace)

      
      const productCount = await marketplace.methods.productCount().call()
      // setProductCount(productCount)
  
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        setProducts([...products, product])
      }
      
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      // setSocialNetwork(socialNetwork)

      const postCount = await socialNetwork.methods.postCount().call()
      // setPostCount(postCount)

      // Load posts
      for (let j = 1; j <= postCount; j++) {
        const post = await socialNetwork.methods.posts(j).call()
        setPosts([...posts, post])
      }

      // Sort posts. Show highest tipped posts first
      setPosts(posts.sort((a,b) => b.tipAmount - a.tipAmount))

      setLoading(false)
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  const purchaseProduct = (id, price) => {
    setLoading(true)
    marketplace.methods.purchaseProduct(id).send({ from: account, value: price })
    .once('receipt', (receipt) => {
      setLoading(false)
    })
  }

  const createProduct = (name, price) => {
    setLoading(true)
    
    marketplace.methods
      .createProduct(name, price)
      .send({ from: account })
      .once('receipt', (receipt) => {
        console.log({ receipt })
        setLoading(false)
      })
  }

  // const createPost = (content) => {
  //   setLoading(true)

  //   socialNetwork.methods
  //     .createPost(content)
  //     .send({ from: account })
  //     .once('receipt', (receipt) => {
  //       console.log({ receipt })
  //       setLoading(false)
  //     })
  // }

  // const tipPost = (id, tipAmount) => {
  //   console.log("tipping post", id, tipAmount)
  //   setLoading(true)
  //   socialNetwork.methods
  //     .tipPost(id)
  //     .send({ from: account, value: tipAmount })
  //       .once('receipt', (receipt) => {
  //       setLoading(false)
  //     })
  // }
  
  return (
    <div>
      <Navbar account={account} />
      {
        loading && 
        <main role="main" className="col-lg-12 d-flex" 
          style={{ justifyContent: "center", marginTop: "100px" }}
        >
            { metamaskInstalled ? <Main
            products={products}
            // productCount={productCount}
            // posts={posts}
            // postCount={postCount}
            // createPost={createPost}
            createProduct={createProduct}
            // tipPost={tipPost}
            purchaseProduct={purchaseProduct}
          /> : <MetamaskAlert />}
        </main>
      }
    </div>
  );
}

export default App;