import Header from './components/Header'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,  Switch,} from "react-router-dom";
import Home from './pages/Home';

import Footer from './components/Footer';
import Authors from './pages/Authors';
import Author from './pages/Author';
import Categories from './pages/Categories';
import SearchResult from './pages/SearchResult';
import BookSingle from './pages/BookSingle';
import BookMark from './pages/BookMark';
import PreOrder from './pages/PreOrder';
import Cart from './pages/Cart';
import AllOrder from './pages/AllOrder';
import OrderDownload from './pages/OrderDownload';
import About from './pages/About';
import AddAddress from './pages/AddAdress';
import Address from './pages/Adress';
import Blog from './pages/Blog';
import BookTalks from './pages/BookTalks';
import Confirm from './pages/Confirm';
import EditAddress from './pages/EditAdress';
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
    <Route path='/orderConfirm'>
      <OrderConfirm/>
      </Route>
    <Route path='/dashboard'>
      <Dashboard/>
      </Route>
    <Route path='/editAdress'>
      <EditAddress/>
      </Route>
    <Route path='/confirm'>
      <Confirm/>
      </Route>
    <Route path='/bookTalks'>
      <BookTalks/>
      </Route>
    <Route path='/blog'>
      <Blog/>
      </Route>
    <Route path='/address'>
      <Address/>
      </Route>
    <Route path='/addAdress'>
      <AddAddress/>
      </Route>
    <Route path='/about'>
      <About/>
      </Route>
    <Route path='/orderdownload'>
      <OrderDownload/>
      </Route>
    <Route path='/allorder'>
      <AllOrder/>
      </Route>
    <Route path='/bookmark'>
      <BookMark/>
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
    <Route path='/category/:id'>
      <Categories/>
      </Route>
      <Route path='/search'>
      <SearchResult/>
      </Route>
    <Route path='/authors'>
      <Authors/>
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
