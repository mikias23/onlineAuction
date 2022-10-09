import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
 
  authToken: any;
  user:any;
  userTyp:any;

  helper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  // registering user 


  loggedIn()
  {
    return !this.helper.isTokenExpired(this.authToken);
  }

  registerUser(userForm:any, image:any)
  
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    var formData: FormData = new FormData();
 
 
    for (const key in userForm)
    { 
        formData.append(key, userForm[key]);
        console.log(key , userForm[key])
    }
    formData.append("images", image);
    console.log(formData.get('images'))
    return this.http.post('http://localhost:3000/users/register', formData)
   
  
  }
  loadToken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.user =  localStorage.getItem('user');
    this.userTyp = localStorage.getItem('userType');
    this.userTyp = JSON.parse(this.userTyp)

  }
  login(loginForm:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/login', loginForm , {headers: headers}) 
  }

  userType()
  {
    
    return this.userTyp;
  }
 
  uploadAuction(uploadValues:any, images:any)
  {
    console.log(images)
    var formData: FormData = new FormData();
 console.log(images)
    
    for (const key in uploadValues)
    { 
      
      if(key === 'items')
      {
        
        var itemsContainer = uploadValues.items; 
        for(let i = 0 ; i< itemsContainer.length; i++)
        {
          let  tempo =  itemsContainer[i]
          for(const keyInner in itemsContainer[i])
          {
            if(keyInner === 'image')
            {
              formData.append('images',tempo[keyInner])

            }
            else {
              formData.append(keyInner,tempo[keyInner])

            }
   
   
          }

        }       
 
       

      }
      else {
       
        formData.append(key,uploadValues[key])


      }
    }
  

    return this.http.post('http://localhost:3000/uploads/uploadAuction', formData)

  }
  storeUserData(token:any, user:any, userType:any)
  {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', JSON.stringify(userType));
   this.authToken = token;
   this.user = user;
   this.userTyp = userType;
  }
  logOut()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.userTyp =''

  }
  fetchCities()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/cities', {headers:headers})

  }
  removeAccount(obj:any)
  {  let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/deactivateUser', obj, {headers: headers}) 

  }
  fetchAuctions()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/auctions', {headers:headers})

  }
  fetchAuctionsHistory()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/auctionsHistory', {headers:headers})

  }
  getInterval()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/getInterval', {headers:headers})

  }
  
  fetchAuctioneers()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/auctioneers', {headers:headers})

  }
  fetchBidders()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/bidders', {headers:headers})

  }
  subscribeBidder(bidder:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/subscribe', bidder , {headers: headers}) 

  }

  submitBid(bid:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/submitBid', bid , {headers: headers}) 
  }

  unsubscribeBidder(unsubscribeObj:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/unsubscribe', unsubscribeObj, {headers: headers}) 

  }
  removeBid(obj:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/removeBid', obj, {headers: headers}) 

  }
  rateAuction( value:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/rateAuction', value, {headers: headers}) 

  }
  deleteRating( value:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/deleteRating', value, {headers: headers}) 

  }
  removeAuction(auction:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/removeAuction', auction, {headers: headers}) 

  }

  removeAuctionsHist(id:any)
  {
       let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/removeAuctionHist',{id:id}, {headers: headers}) 

  }

  phoneAuthentication(phone:any, user:any)
{
  let headers = new HttpHeaders();
  headers.append('Content-type', 'application/json');
  return this.http.post("http://localhost:3000/activities/phoneAuthentication", {phone:phone, type:user}, {headers:headers});
}
changePassword(data:any)
{
  let headers = new HttpHeaders();
  headers.append('Content-type', 'application/json');
  return this.http.post("http://localhost:3000/activities/changePassword", data , {headers:headers});
}
  editUser(form:any)
  {
   

    let formObj= {
      form:form
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/editUser', formObj, {headers: headers}) 
  }
  updateInterval(form:any)
  {
    console.log('sdsdsd')
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/updateInterval', form, {headers: headers}) 
  }
  uploadCity(form:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    var formData: FormData = new FormData();
 
 
   
    formData.append("images", form.image);
    formData.append("city", form.city);

    return this.http.post('http://localhost:3000/uploads/addCity', formData)
  }

  fetchCategories()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/category', {headers:headers})
  }
  uploadCategory(form:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:3000/uploads/addCategory', form, {headers:headers})
  }
  
  deleteUser(objUser:any)
  {
    console.log(objUser)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/deleteUser', objUser , {headers: headers}) 
  }
  deleteCity(id:any)
  {
    console.log(id)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/deleteCity', {id:id} , {headers: headers}) 
  }
  deleteCategory(id:any)
  {
    let idObj = {
      id:id
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/deleteCategory',idObj, {headers: headers}) 
  }

  approveAuctioneer(approveObj:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/approveAuctioneer',approveObj, {headers: headers}) 

  }

  validatePaymentCode(value:any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/validatePaymentCode',value, {headers: headers}) 

  }

  approvePayment(auctionId:any)
  {
    let  auctionIds = {
      auctionId: auctionId
    }
    console.log('min', auctionId )
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/approvePayment',auctionIds, {headers: headers}) 
  }

  updateBidderNotify(id:any, auctionId:any)
  {
    console.log(id, auctionId)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/updateBidderNotify',{id:id, auctionId:auctionId}, {headers: headers}) 
 
  }

  removeAll(type:any)
  {
    let  typeQuery = {
      type: type
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/activities/removeAll',typeQuery, {headers: headers}) 
  }
 
}
