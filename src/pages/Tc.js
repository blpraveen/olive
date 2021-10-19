import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import book from "../images/book-read.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useState,useEffect ,useCallback} from "react";
import pop1 from "../images/popular/pop1.jpg";
import pop2 from "../images/popular/pop2.jpg";
import pop3 from "../images/popular/pop3.jpg";
import pop4 from "../images/popular/pop4.jpg";
import pop6 from "../images/popular/pop6.jpg";
import pop8 from "../images/popular/pop8.jpg";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link,useParams } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import FilterSearch from "../components/FilterSearch";
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import Pagination from "react-js-pagination";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Tc = props => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);
  const [catgory_name , setCategoryName] = useState(false);
  const [active_page , setActivePage] = useState(1);
  const [total_items , settotalItems] = useState(0);
  const [category_count , setCategoryCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [categories,setCategories] =useState([]);
  function addProduct (product){
    const { cartProducts, updateCart } = props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += 1;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      product.quantity = 1;
      cartProducts.push(product);
    }
    console.log(cartProducts);
    updateCart(cartProducts);
    
    toast.info(product.name + " added to cart !");
    
  };
  function handlePageChange (pageNumber) {
    setActivePage(pageNumber);
  }


  useEffect(async () => { 
   fetch(apiBaseUrl + 'categories')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.categories.length){
            let category_list = [];
            result.data.categories.map((category) => {
                category_list.push({
                  label: category.name,
                  value: category.id,
                  image: category.featured_image_large,
                  count: category.books_count,
                })
            });
            setCategoryCount(category_list.length);
            setCategories(category_list);
            
          }
        } 
      }); 
     
 }, [active_page]);
  return (
    <div className="categories container">
    <ToastContainer />
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>

      </div>

      <div className="categories__content">
        <Row>
          {/* <<<<<<<<<<<<<<< FILTER SEARCH >>>>>>>>>>>>>>>>>>> */}

          {/* Categries right Column */}
          <Col lg="10">
            <div className="categories__right">
              
              {/* </div> */}
              {/* CART ALERTS */}

              {/* {show ? 
                 <Alert variant="success" id='alert'>
                  
                 
                   <CheckCircleIcon id='alert__success__icon'/>
                   
                 <div className='alert__success__text'>
                 <p>Product added to your cart</p>
                 <Link to='/cart' style={{textDecoration:'none'}}>
                 <h6>CHECKOUT NOW</h6>
                 </Link>
              
                 </div>
                 
                 <CloseIcon type='button' onClick={()=>setShow(false)} id='alert__close__icon' />
                 </Alert> :''
              } */}

              {/* <<<<<<<< LOGIN ALERT >>>>>>>>>> */}

              {/* {show ? 
                 <Alert variant="primary" id='login__alert'>
                  
                 
                   <InfoIcon id='alert__success__icon'/>
                   
                 
                 <p>Please Login</p>
            
                 <h6 type='button' onClick={()=>setShow(false)}>OK</h6>
                 
              
               
                 </Alert> :''} */}

              {/* <<<<<<<<< WRONG ALERT >>>>>>>>> */}
              {show ? (
                <Alert variant="danger" id="danger__alert">
                  <CheckCircleIcon id="alert__success__icon" />

                  <p>Somthing went wrong</p>

                  <h6 type="button" onClick={() => setShow(false)}>
                    Refresh
                  </h6>
                </Alert>
              ) : (
                ""
              )}

            <h1>Terms and Conditions</h1>
<p>All terms and conditions of use of this website come under the IT Act 2000 and its rules and regulations are applicable. This electronic record does not need any digital signatures since it is published in accordance with Rule 3 (1) of the IT Rules 2011 that require only publishing privacy policy.</p>

<h4>User Agreement</h4>

<p>A legal binding agreement between a user referred to as the Company or the Website will come in to effect at the time of accessing <a href="https://olivebooks.in" >www.olivebooks.in</a> by anyone. It is understood that the usage is subject to the notices, terms, and conditions set forth in this agreement (the “Agreement”).</p>

<p><b>Amendment:</b> The Company reserves the right to change this website and/or alter the terms and conditions of this User Agreement at any time and retains the right to deny access to anyone who the Company believes has violated it. The revised version/ terms shall be effective from the time that the Company posts the same on the Website.</p>

<h4>Definitions</h4>

<p>Payment on Billing shall mean a transaction where the payment for the books purchased is paid through the online payment facility provided by Olive Books or any other mode of payment acceptable to the Company.</p>

<p>Payment on Delivery shall mean a transaction where the payment for the items is collected from the buyer by the Logistics Partner at the time of delivering the books. In this case, the Buyer shall only make payment in cash and no other mode of payment will be accepted.</p>

<p>Delivery / Delivered means physical delivery of the items to the buyer by the seller through a reputed Logistics Partner to the address communicated by the buyer on the Website.</p>

<p>Dispatch/ Dispatched shall mean that the items have been dispatched by the seller through the Logistics Partner to the address communicated by the buyer on the Website.</p>

<p>Dispatch Details means the true, accurate and valid data, information, details or documents as specified by the Company from time to time, which the seller is obligated to provide to the Company as proof that the item has been Dispatched and/or Delivered, as the case may be.</p>

<p>Information means and shall include any confidential and/or personally identifiable information or other information provided to the Company to other Users of the Website at the time of registration with the Website, buying or listing process or through any email feature and shall include other information sought by the company.</p>

<p>Issuing Bank in respect of a buyer means any bank that has issued a Valid Card (credit/ debit/ cash card) to the buyer or the branch of a bank which maintains a valid Bank Account in the name of buyer; with which the buyer makes payment of the Transaction Price.</p>

<p>Logistics Partner shall mean reputable logistics and courier company(s) appointed by the Company that will provide various services of collection and delivery of items, collection of the Transaction Price from the buyer.</p>

<p>Transaction means every electronically generated valid purchase order placed by the Buyer for purchasing the items listed on the Website.</p>

<p>Transaction Price means the price to be paid for the items to be purchased by the buyer for every Transaction and the price shall include, if applicable, the shipping charges, insurance charges, and all other taxes, duties, costs, charges and expenses in respect thereof as charged by the seller.</p>

<p>Valid Card means any valid credit card/ debit card/ cash card or any other card of whatsoever nature issued by Visa or Master Card and/or by any Issuing Bank or any institution designated to issue such cards and lawfully owned by the User of the card at the time of the Transaction as well as at the time of Refund, if any.</p>

<p>Valid Bank Account shall mean a valid and operational bank account in the name of the User with respect to the buyer shall be referred to as the Buyer Bank Account and with respect to the Seller shall be referred to as the Seller Bank Account.</p>

<p>Online payment Facility means the automated electronic payment or collection and remittance facility provided by the Company to Buyers and Sellers to facilitate purchase and sale of items and making payments thereof on the Website directly through banks or financial institutions or through online payment facility providers or through any such facility authorized by the Reserve Bank of India to provide enabling support facility for collection and remittance of payment.</p>

<h4>Eligibility</h4>

<p>This Website should be accessed only by those persons who can form legally binding contracts under Indian Contract Act, 1872. A minor is not allowed to access or register as a User or sell or purchase any items on the Website.</p>

<p>If you represent a business entity, by accepting the User Agreement you agree and consent that you are duly authorized by the business entity to accept this User Agreement and you have the authority to bind that business entity to this User Agreement.</p>

<h4>Registration and Communication</h4>

<p><b>Registration:</b> You are solely responsible for maintaining secrecy and confidentiality of your username and password. The Company, its employees or associates will not be responsible for any manner of losses occurring from any breach of secrecy of your username and password.</p>

<p>You agree that your sole purpose of registering or using the Website is to buy or sell books and you shall not use this Website for any other purpose including for selling or buying products other than as mentioned above.</p>

<p>You agree to provide true, accurate and complete information while registering or for any other purpose when prompted to do so on the Website. You are prohibited from misrepresenting your identity and agree not to represent yourself as another User or login/ register using the identity of any other person. If you provide any information that is not in accordance with this User Agreement, the Company reserves the right to indefinitely suspend or terminate or block your use or access to the Website in any manner whatsoever.</p>

<p><b>Seller Registration:</b>To be eligible to sell items on the Website, the User is required to separately register with the online payment facility on the Registration page of the Website. The seller shall provide complete details of the Seller Bank Account as a part of the Registration or at a later date in lieu of or in addition to the original Seller Bank Account.</p>

<p><b>Buyer Registration:</b> Other than being a User, there is no separate registration requirement for buyers. The online payment facility is available to Buyers who hold a Valid Card or Valid Bank Account.</p>

<p><b>Electronic Communication:</b> You agree to keep yourself updated with all data, information and communication pertaining to you made available on the Website by the Company. You further agree that your use of the Website or provision of any data or information including any correspondence (by email or otherwise) to or by the Company is through electronic records and you consent to receive communication from the Company via electronic records which will be deemed adequate service of notice of the record.</p>

<h4>Terms of Use</h4>

<p>You understand and agree that the Company and the Website merely provide hosting services to its Users who access the Website for purchase and sale of books (that are permitted to be bought and sold under applicable law).You also give permission to the Website and the Company to store details and records of your usage of the Website indefinitely. However, this does not constitute any obligation on the part of the Company or the Website to do so.</p>

<p>Currently the registration on the Website is free and the Company does not levy any charges/fees for browsing or buying on the Website. The Company reserves the right to introduce new services or modify the existing services provided on the Website. Additionally, the Company at its sole discretion may introduce fees for the new services provided or amend/ introduce fees for the existing services, as the case may be.</p>

<p>All fees/ charges shall be quoted in Indian Rupees. You are responsible for paying all charges/ fees associated with the use of the Website and shall be liable to pay any and all applicable taxes, charges, cesses etc. which may be levied. In case of any non- payment, the Company reserves the right to issue a warning or temporarily/ indefinitely suspend or terminate your membership with the Website and disallow access to the Website. The Company also reserves the right to take any legal action against you in case of any non- payment of charges/fees to the Company.</p>

<p>You agree that the Company may appoint any third party service provider, including but not restricted to one or more of the Company’s affiliate to provide backend operations and support as instructed by the Company from time to time including but not limited to collection, processing and remittance of the Transaction Price using the existing authorized banking infrastructure to provide enabling support facility for collection and remittance of payment including but not limited to the Logistics Partner.</p>

<p>The Company neither originates nor transmits any communication/ information on behalf of any User nor does it modify the contents of any communication transmitted. The Company has no control over third parties and contents generated by the Users on the Website.</p>

<p>Any information provided by you to the Company or submitted on the Website or provided or displayed to other Users of the Website in the registration, buying or listing process, in the feedback area or through any e-mail communication is solely your responsibility and the Company or the Website merely is a platform where such information is distributed, published, displayed or used by Users. The Company or the Website is not liable for accuracy, appropriateness or legality of such information.</p>

<p><b>E-books:</b> You agree that you will not copy or distribute the E-books downloaded from the Website.</p>


<p>This website designed and developed by best ecommerce development company in Calicut</p>

<h4>User Obligations</h4>

<p>All contractual terms of the manner and terms and conditions of delivery, payment, insurance etc. between the buyer and the seller shall be independently agreed with the other users of the Website that you may transact with.</p>

<p>You will treat the Website as a mere passive conduit which is used as a platform by Users to create listings or provide information for the purpose of selling books so that such information can be discovered and read by other Users of the Website who may wish to purchase such items from other Users or provide feedback on items they have purchased or sellers who have sold any item to them.</p>

<p>You agree and undertake not to host, display, upload, modify, publish, transmit, update or share any information or list any information or item that: </p>

<p>a) belongs to another person and to which You do not have any right to;</p>

<p>b) is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, pedophilic, libelous, invasive of another’s privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatsoever; or unlawfully threatening or unlawfully harassing including but not limited to “indecent representation of women” within the meaning of the Indecent Representation of Women (Prohibition) Act, 1986;</p>

<p>c) harm minors in any way;</p>

<p>d) infringe any patent, trademark, copyright or other proprietary rights or third party’s trade secrets or rights of publicity or privacy or shall not be fraudulent or involve the sale of counterfeit or stolen items;</p>

<p>e) violates any law for the time being in force;</p>

<p>f) deceives or misleads the addressee/ users about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;</p>

<p>g) impersonate another person or use an anonymous proxy;</p>

<p>h) contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource; or contains any trojan horses, worms, time bombs, cancelbots, easter eggs or other computer programming routines that may damage, detrimentally interfere with, diminish value of, surreptitiously intercept or expropriate any system, data or personal information;</p>

<p>i) threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting to any other nation;</p>

<p>j) shall not be false, inaccurate or misleading;</p>

<p>k) shall not, directly or indirectly, offer, attempt to offer, trade or attempt to trade in any item, the dealing of which is prohibited or restricted in any manner under the provisions of any applicable law, rule, regulation or guideline for the time being in force;</p>

<p>l) may give rise to liability on part of the Website or the Company or cause any hindrance (in whole or in part) with respect to the services of ISPs or other suppliers of the Website or the Company; and</p>

<p>m) link directly or indirectly to or include descriptions of items that are (i) prohibited under the User Agreement or any other applicable law for the time being in force including but not limited to the Drugs and Cosmetics Act, 1940, the Drugs And Magic Remedies (Objectionable Advertisements) Act, 1954, the Indian Penal Code, 1860, Information Technology Act 2000 as i) amended time to time and rules there under or (ii) are at the same time listed for sale on a web site other than the Website. You shall not promote any website or webpage or link on the Website.</p>

<p>In case of any violation of the above provisions, the Company has the right to immediately terminate the access or usage rights of the user to the Website without any notice and any such volatile information that is displayed or submitted on the Website can be removed immediately and completely. </p>

<p>You shall be responsible for keeping backup versions of the information and data provided by you. You hereby agree that you will not expect the Website to restore or keep back up of your information and data and not hold the Website or the Company accountable for any loss of data in any circumstances.</p>

<p>You shall not, either alone or in conjunction with other users, manipulate or attempt to manipulate the prices of any item being sold or purchased on the Website. You will also refrain from accessing information or databases in an unauthorized manner from the Website or servers where information or databases are kept.</p>

<p>In case of any transaction or attempted transaction pertaining to any item listed on the Website which is in violation of this User Agreement or applicable laws comes to your knowledge, you shall forthwith take all steps to inform the Company of such violation at <a href="https://olivebooks.in" >www.olivebooks.in</a></p>

<p>If you choose to provide feedback on the Website which is visible to other users, you shall exercise due care while making comments and not make any comments that are not factual in nature and shall not post defamatory or illegal or offensive/ obscene contents.</p>

<p>You undertake not to disclose or distribute any other User’s Information to a third party, or use the Information for any unauthorized purpose including for the purposes of marketing unless you have obtained the User’s express consent to do so.</p>

<p>You shall not place any advertisements on the Website in any manner. Further, you shall not use the Website to promote your own or any other persons business or interests on the Website except for providing description on a listing for a specific item, unless permitted by the Company in writing.</p>

<p>You shall not attempt to ‘double dip’ during the course of a dispute by receiving or attempting to receive funds from the Company and/or its service providers and/or the buyer or seller as the case maybe.</p>

<h4>Disclaimers</h4>

<p>The Website is only a platform where users may meet and interact with one another for their transactions. The Website or the Company is not and cannot be a party to or control in any manner any transaction between two users of the Website.</p>

<p>All commercial / contractual terms are offered by and agreed to between buyers and sellers alone as per principal to principal bipartite contractual obligations. The commercial / contractual terms include without limitation price, shipping costs, payment methods, payment terms, date, period and mode of delivery, warranties related to items listed for sale.</p>

<p>The Company is neither involved in the buying and selling of items on the Website nor liable or responsible for any non- performance or breach of any contract entered into between the Users (i.e. buyer and seller) including but not limited to non Delivery or non receipt, nonpayment, damage, breach of representations and warranties provided by the seller or any fraud as regards the items listed on the Website. The Users acknowledge that the Company will not be liable for any damages, interests or claims etc. resulting from not processing or any delay in processing a Transaction/ Transaction Price which is beyond the control of the Company.</p>

<p>The Company does not make any representation or warranty as to the attributes (such as quality, worth, marketability, merchantability, usefulness) of the items proposed to be sold or offered to be sold or purchased on the Website.</p>

<p>The Company does not make any representation or warranty as to the attributes (such as legal title, creditworthiness, identity etc.) of any of its users. You are advised use your best judgment and independently verify the bona fides of any particular User that you choose to deal with on the Website.</p>

<p>The Website is only a venue through which Users can reach a larger base to buy and sell unique Indian products. The Company is only providing a platform in form of the Website for communication and a hosting service for information and it is agreed that the contract for sale of any of the items shall be a strictly bipartite contract between the seller and the buyer. At no time shall any right, title or interest over the items vest with the Company nor shall the Company have any obligations or liabilities in respect of such contract. All items offered by sellers are only for a restricted time and only for the available supply as offered by sellers. You expressly agree that the use of the Website and the Online payment electronic payment facility is at your own risk.</p>

<p>You release and indemnify the Company and/or any of its officers and representatives from any cost, damage, liability or other consequence of any of the actions of the users of the Website and specifically waive any claims that you may have in this behalf under any applicable law. The Company cannot control the information provided by other Users, which is made available on the Website notwithstanding the Company’s reasonable efforts in that behalf.</p>

<h4>Limited liability of the Company</h4>

<p>In no event shall the Company or its suppliers be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses arising (in any manner whatsoever, including but not limited to negligence) out of or in connection with the Website, the Online payment Facility, services provided by the Logistics Partner or any other services or this User Agreement.</p>

<p>Consequently, the Company assumes no liability whatsoever for any monetary or other damage suffered by you on account of:</p>

<p>The delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of the Website or online payment facility. Any delay, failure, interruption or errors in the operation of the Website or the Logistics Partner or Online Payment Facility.</p>

<h4>Payment</h4>

<p>Payments for the items on the Website, at the option of the relevant seller, can be made by way of (i) Payment on Billing which can be made through the Online payment Facility or by depositing cash, cheque, demand draft in the bank account of the Company; or (ii) Payment on Delivery wherein payment shall be made only by cash on delivery, or such other method of payment as may be permitted by the Company on the Website in its sole discretion.</p>

<p>For the purposes of buying and/or selling any item listed on the Website, you agree and undertake not to make payments in any manner other than as provided, without the prior consent of the Company.</p>

<p>You acknowledge and accept that you have specifically authorized the Company to collect, process, facilitate and remit payments and/ or the Transaction Price by any of the prescribed methods of payment through Payment on Billing or Payment on Delivery to and from other Users in respect of Transactions.</p>

<p><b>Shipping:</b> For International orders, buyers have to pay shipping charges along with the payment. The shipping charges vary from items to items as mentioned on the product page of the website. Prices and shipping costs may vary from country to country and prices listed in INR are applicable only for India. For an order if there are books from multiple publishers, the buyer has to pay the shipping charges seperately for each publisher.</p>

<p><b>Free Shipping:</b> If the order amount is Rs.500 and above, the customer will be given Free Shipping facility, provided the books must be of the same Publisher. In the same order if there are books from other publishers whose total price is less than Rs.500, then the customer has to pay the shipping cost respective to that.</p>

<h4>Breach</h4>

<p>Without limiting other remedies that the Company may pursue, the Company may at its sole discretion take such action as it deems fit including but not limited to cancellation of the Transaction or payments made, limit your activity, immediately remove your information or listings, or ends your listing, warn other Users of your actions, forthwith temporarily/indefinitely suspend or terminate or block your membership, and/or refuse to provide you with access to the Website or initiate any legal action it may deem fit, particularly in the event:</p>

<p>a) You breach any of the provisions of this User Agreement including any of the rules and policies, documents, terms and conditions made there which are incorporated therein by reference;</p>

<p>b) Any misuse of the Online payment Facility</p>

<p>c)The Company is unable to verify or authenticate any information provided by you;</p>

<p>d)The Company believes that your actions may cause legal liability to the Company, other Users or yourself.</p>

<h4>Grievance Redressal</h4>

<p>In case of any grievance, objection or complaint on your part with respect to the Website, other Users, Online payment Facility or the Company, including any complaints or enquiry about suspension, termination or blocking of your membership or right to use the Website, you should promptly raise such grievance or complaint with the designated Grievance Officer at  <a href="https://olivebooks.in" >www.olivebooks.in</a> and provide him/her with all necessary information and/or documents to enable the Company/ Grievance Officer to resolve the issue.</p>

<p>The name and contact details of the Grievance Officer is published on the Website as required under the provisions of the Information Technology Act, 2000 and the rules made there under.</p>

<h4>Arbitration</h4>

<p>If any dispute arises between you and the Company during your use of the Website or the Online payment Facility or Olive Services or any service incidental to the Website or thereafter, in connection with the validity, interpretation, implementation or alleged breach of any provision of the User Agreement and/or Online payment Agreement, or the rules, policies and documents incorporated therein by reference, the dispute shall be referred to a sole arbitrator who shall be an independent and neutral third party identified by the Company whose decision shall be final. The place of arbitration will be decided by the company and the arbitration proceedings shall be in the English language.</p>

<h4>Governing Law</h4>

<p>This User Agreement and all rules, policies and documents incorporated by reference shall be governed and construed in accordance with the laws of India and its jurisdiction. This document is an electronic record in terms of Information Technology Act, 2000 and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.</p>
            </div>
          </Col>
        </Row>
      </div>
      <PopularList />

      <Featur />
    </div>
  );
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  productToChange: state.cart.productToChange,
  cartTotal: state.total.data
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct, changeProductQuantity }
)(Tc);
