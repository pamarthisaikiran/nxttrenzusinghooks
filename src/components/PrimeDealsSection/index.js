import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner';

import ProductCard from '../ProductCard'
import './index.css'

const apiContraintStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

/* class PrimeDealsSection extends Component {
  state = {
    primeDeals: [],
    apiCall: '',
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({apiCall: apiContraintStatus.loading})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.prime_deals.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        primeDeals: updatedData,
        apiCall: apiContraintStatus.success,
      })
    }
  }

  renderPrimeDealsList = () => {
    const {primeDeals} = this.state
    return (
      <div className="products-list-container">
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {primeDeals.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiCall} = this.state
    switch (apiCall) {
      case apiContraintStatus.success:
        return this.renderPrimeDealsList()
      case apiContraintStatus.failure:
        return this.renderPrimeDealsFailureView()
      case apiContraintStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  // return this.renderLoadingView()
} */

const PrimeDealsSection=()=>{
    const [primeDeals,setDeals]=useState([])
    const [apiCall,setApiCall]=useState("")
    
    const getPrime=async()=>{
        setApiCall(apiContraintStatus.loading)
      const jwtToken =Cookies.get("jwt_token")
      const apiUrl = 'https://apis.ccbp.in/prime-deals';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };
      try {
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          console.log(fetchedData)
          const updatedData = fetchedData.prime_deals.map(product => ({
            title: product.title,
            brand: product.brand,
            price: product.price,
            id: product.id,
            imageUrl: product.image_url,
            rating: product.rating,
          }))
          setDeals(updatedData);
          setApiCall(apiContraintStatus.success);
      }else {
        setApiCall(apiContraintStatus.failure);
      }
    }
      catch(error){
        setApiCall(apiContraintStatus.failure);
      }
    
}

   useEffect(()=>{
    getPrime()
   },[])

    const renderPrimeDealsList = () => (
        <div className="products-list-container">
          <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
          <ul className="products-list">
            {primeDeals.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      );

      const renderPrimeDealsFailureView = () => (
        <img
          src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          alt="Register Prime"
          className="register-prime-image"
        />
      );
    
      const renderLoadingView = () => (
        <div className="products-loader-container">
          <ThreeDots color="#0b69ff" height={50} width={50} />
        </div>
      );

    
        switch (apiCall) {
            case apiContraintStatus.success:
                return renderPrimeDealsList();
            case apiContraintStatus.failure:
                return renderPrimeDealsFailureView();
            case apiContraintStatus.loading:
                return renderLoadingView();
            default:
                return null
        
            
        }
    
}

export default PrimeDealsSection
