import React from "react";

import Web3 from 'web3'
import './App.css';

import Navbar from './components/Navbar'
import Main from './components/Main'

import Marketplace from './abis/Marketplace.json'

const App = () => {
	const [account, setAccount] = React.useState('');

	const [productCount, setProductCount] = React.useState(0);

	const [products, setProducts] = React.useState([]);

	const [marketplace, setMarketplace] = React.useState(null);

	const initialLoading = async () => {
		await loadWeb3()
    await loadBlockchainData()
	}

	React.useEffect(() => {
		initialLoading()
	}, [])

	// console.log({ productCount })

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

  const loadBlockchainData = async () =>  {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    // Load network data
    const networkId = await web3.eth.net.getId()
		// const chainId = await web3.eth.getChainId();

    const networkData = Marketplace.networks[networkId]

    // console.log(networkData)

    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      const productCount = await marketplace.methods.productCount().call()
      
      setMarketplace(marketplace)
      setProductCount(productCount)

			let p = []

      // Load products
      for (var i = 1; i <= productCount; i++) {
				const product = await marketplace.methods
					.products(i)
					.call()

				p = [...p, product]
      }

			setProducts(p)
			
    } else {
			window.alert('Marketplace contract not deployed to detected network.')
    }
  }

	// console.log(products)

  const purchaseProduct = (id, price) => {
    marketplace.methods
			.purchaseProduct(id)
			.send({ from: account, value: price })
    	.once('receipt', (receipt) => {})
  }

  const createProduct = (name, price) => {
    marketplace.methods
      .createProduct(name, price)
      .send({ from: account })
      .once('receipt', (receipt) => {
      })
  }

  return (
    <div>
      <Navbar account={account} />
      <main role="main" className="col-lg-12 d-flex">
        <Main
          products={products}
          createProduct={createProduct}
          purchaseProduct={purchaseProduct}
        />
      </main>
    </div>
  );
};

export default App;
