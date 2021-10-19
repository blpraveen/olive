import Header from './components/Header'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,  Switch,} from "react-router-dom";
import Home from './pages/Home';

import Footer from './components/Footer';
import Authors from './pages/Authors';
import Imprints from './pages/Imprints';
import Author from './pages/Author';
import Categories from './pages/Categories';
import Category from './pages/Category';
import SearchResult from './pages/SearchResult';
import BookSingle from './pages/BookSingle';
import BookMark from './pages/BookMark';
import PreOrder from './pages/PreOrder';
import Cart from './pages/Cart';
import AllOrder from './pages/AllOrder';
import WebMagazine from './pages/WebMagazine';
import OrderDownload from './pages/OrderDownload';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Publish from './pages/Publish';
import Forgot from './pages/Forgot';
import Refund from './pages/Refund';
import Register from './pages/Register';
import Cancellation from './pages/Cancellation';
import Delivery from './pages/Delivery';
import Tc from './pages/Tc';
import Privacy from './pages/Privacy';
import AddAddress from './pages/AddAddress';
import Address from './pages/Adress';
import Blog from './pages/Blog';
import BookTalks from './pages/BookTalks';
import Confirm from './pages/Confirm';
import EditAddress from './pages/EditAdress';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard'
import OrderConfirm from './pages/OrderConfirm'
import OfferZone from './pages/OfferZone';
import NoSearchResult from './pages/NoSearchResult';
import Error from './pages/Error';
import JustArrived from './pages/JustArrived';
import BestSeller from './pages/BestSeller';
import Classic from './pages/Classic';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    <div className="App">
   
    <Router>
    <ScrollToTop/>
    <Header/>
    <Switch>
    <Route path='/classic'>
      <Classic />
      </Route>
    <Route path='/bestSeller'>
      <BestSeller />
      </Route>
    <Route path='/justArrived'>
      <JustArrived />
      </Route>
    <Route path='/error'>
      <Error />
      </Route>
    <Route path='/no-result'>
      <NoSearchResult/>
      </Route>
    <Route path='/offerZone'>
      <OfferZone/>
      </Route>
    <Route path='/orderConfirm/:id'>
      <OrderConfirm/>
      </Route>
    <Route path='/dashboard'>
      <Dashboard/>
      </Route>
    <Route path='/editAdress/:id/:show'>
      <EditAddress/>
      </Route>
    <Route path='/confirm'>
      <Confirm/>
      </Route>
    <Route path='/bookTalks'>
      <BookTalks/>
      </Route>
    <Route path='/blog/:id'>
      <Blog/>
      </Route>
    <Route path='/address/:show'>
      <Address/>
      </Route>
    <Route path='/addAddress'>
      <AddAddress/>
      </Route>
    <Route path='/about'>
      <About/>
      </Route>
    <Route path='/orderdownload/:id'>
      <OrderDownload/>
      </Route>
    <Route path='/allorder'>
      <AllOrder/>
      </Route>
      <Route path='/imprints'>
      <Imprints/>
      </Route>
    <Route path='/bookmark'>
      <BookMark/>
      </Route>
      <Route path='/login'>
      <Login/>
      </Route>
      <Route path='/cart'>
      <Cart/>
      </Route>
      <Route path='/preorder'>
      <PreOrder/>
      </Route>
    <Route path='/booksingle/:id' >
      <BookSingle/>
      </Route>
      <Route path='/password/reset/:token' >
      <ResetPassword/>
      </Route>
      
    <Route path='/category/:id'>
      <Category/>
      </Route>
      <Route path='/categories'>
      <Categories/>
      </Route>

      <Route path='/catalog'>
      <Catalog/>
      </Route>

      <Route path='/tc'>
      <Tc/>
      </Route> 
      <Route path='/privacy'>
      <Privacy/>
      </Route>

      <Route path='/delivery'>
      <Delivery/>
      </Route>

      <Route path='/cancellation'>
      <Cancellation/>
      </Route>
      <Route path='/refund'>
      <Refund/>
      </Route>
      <Route path='/publish'>
      <Publish/>
      </Route>

      <Route path='/register'>
      <Register/>
      </Route>
      <Route path='/search'>
      <SearchResult/>
      </Route>
    <Route path='/authors'>
      <Authors/>
      </Route>

    <Route path='/forgot'>
      <Forgot/>
      </Route>
      <Route path='/web_magazine'>
      <WebMagazine/>
      </Route>
      
      <Route path='/author/:id'>
      <Author/>
      </Route>
      <Route path='/'>
      <Home/>
      </Route>
    </Switch>
 
 <Footer/>
    </Router>
    </div>
  );
}

export default App;
