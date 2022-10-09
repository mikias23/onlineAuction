import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControlName, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-post-auction',
  templateUrl: './post-auction.component.html',
  styleUrls: ['./post-auction.component.scss']
})
export class PostAuctionComponent implements OnInit {
  @Output() auctionPostedNotify: EventEmitter<Object> = new EventEmitter<Object>();
  newDate = new Date()
  min = new Date();
  max = new Date();
  faTimes = faTimes;
  endDate = new Date();
  itemslength = 1;
  user !:any;
  imgSrc = '';
  imgFirst !:any;
  imgIndex = 0;
  images = new Array(File);
  totalPrice = 0;
  imagesExceptLast = new Array()
  itemTotalPrice = new Array();
  itemPriceBeforQuantity =new Array();
formData: FormData = new FormData();

  constructor(public dialog: MatDialog, private flashMessage: FlashMessagesService, private mainService: MainServiceService, private router:Router, private stateService: StateService){ }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
 
  auctionForm = new FormGroup(
    {
      type:new FormControl('normal'),
      format: new FormControl('regular', [Validators.required]),
      span: new FormControl('',[Validators.required]),
      startDate:new FormControl(new Date(), [Validators.required]),

      endDate: new FormControl(this.newDate,  [Validators.required]),
      city : new FormControl('',  [Validators.required]),

      category : new FormControl('',  [Validators.required]),
      uploadFee : new FormControl(''),
      generatedCode : new FormControl(''),
      paid : new FormControl(''),
      description:new FormControl('',  [Validators.required]),
      items : new FormArray([
              new FormGroup({
    
          name: new FormControl('',  [Validators.required]),
          pricePerItem: new FormControl('',  [Validators.required]),
          quantity: new FormControl('',[Validators.required]),
          brand: new FormControl(''),
          condition: new FormControl('new', [Validators.required]),
          image: new FormControl(File, [Validators.required])

        })
      ]),
      phone: new FormControl('', [Validators.required]),
      startingBid: new FormControl(this.totalPrice, [Validators.required]),
      auctioneerId: new FormControl('')
    }
  ) 


  get f()
  {
      return this.auctionForm.controls;
  }
  fakeArray()
  {
    return new Array(this.itemslength)
  }
  addItem()
  {
    this.itemslength += 1;
    const items = this.auctionForm.get('items') as FormArray;

    
        items.push(new FormGroup({
    
          name: new FormControl('',  [Validators.required]),
          pricePerItem: new FormControl('',  [Validators.required]),
          quantity: new FormControl('',[Validators.required]),
          brand: new FormControl('',[Validators.required]),
          condition: new FormControl('new', [Validators.required]),
          image: new FormControl(Blob, [Validators.required])
          
        }))
   this.images= new Array(this.itemslength);
   this.itemTotalPrice.push(0);
   this.itemPriceBeforQuantity.push(1)
  }  
  deleteItem(ind:any)
  {
    this.itemslength -= 1;
    this.images = new Array(this.itemslength)

    const items = this.auctionForm.get('items') as FormArray;
    items.removeAt(ind);

    this.images = this.images.filter((image, index)=> index !== ind
    )
    
    this.itemTotalPrice.splice(ind, 1);
    this.itemPriceBeforQuantity.splice(ind, 1);
    this.calcTotal();

  }
 

  onDateChange(event:any)
  {
   let startDatevalue = (event.target.value).getTime();

    let span = this.f['span'].value;
  console.log(startDatevalue, span)
    
   this.newDate = new Date(startDatevalue + (span*24*60*60*1000))


  this.auctionForm.patchValue({'endDate':this.newDate}); 
  

  }

  spanFilled(event:any)
  {
   
   let starteDate = new Date()
   starteDate = this.auctionForm.value['startDate']
   let startDatevalue = starteDate.getTime();
    let span = event.target.value;
    
   this.newDate = new Date(startDatevalue + (span*24*60*60*1000))


  this.auctionForm.patchValue({'endDate':this.newDate}); 
  }
  

generatedCode !:any
  submitForm()
  {
 

  let uploadFee, dateNow = new Date().getTime();
    if(this.auctionForm.controls['format'].value=== 'regular')
    {
      uploadFee = 3 *(this.auctionForm.controls['span'].value);

    }

    else {
      console.log(this.auctionForm.controls['endDate'].value )
      uploadFee = Math.ceil((this.auctionForm.controls['endDate'].value).getTime() - dateNow)/ (8 * 3600000)

    }


    const generatedCode = Math.random().toString(36).substring(2,7);
      
    this.generatedCode = generatedCode
    this.auctionForm.patchValue({'uploadFee':uploadFee});
    this.auctionForm.patchValue({'generatedCode':generatedCode});
    this.auctionForm.patchValue({'paid':false});


   this.auctionForm.patchValue({'auctioneerId':this.user._id});
   this.auctionForm.patchValue({'startingBid':this.totalPrice});console.log(this.auctionForm.value)

   this.mainService.uploadAuction(this.auctionForm.value, this.images).
   subscribe((result:any) => {


     localStorage.setItem('auctionId', JSON.stringify(result.auctionId));


     if(result.success)
     {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        })
         
      window.scrollTo(0, 0);
   let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:`Save and use this code  ( ${generatedCode})    to complete payment. Do you want to make payment right now? `}});

      dialogRef.afterClosed().subscribe((result:any) => {
  
        if(result === 'true')
        {
          this.router.navigate(['/payment'])
        }
        else {
          location.reload()
        }
    
     })
 
   }
   else {
     this.flashMessage.show(result.msg, {
       cssClass: 'alert-danger',
       timeout: 2000
     });
     window.scrollTo(0, 0);
     setTimeout(() => {
    location.reload()
     }, 2000);
   }
 })

  }
  setItemName(event:any, index:any)
  {
   
     const items = this.auctionForm.get('items') as FormArray;
     (items.at(index) as FormGroup).patchValue({name:event.target.value});
    
  }

  onItemCondition(event:any, index:any)
  {
    const items = this.auctionForm.get('items') as FormArray;
    (items.at(index) as FormGroup).patchValue({condition:event});
  }
  setBrand(event:any, index:any)
  {
   
     const items = this.auctionForm.get('items') as FormArray;
     (items.at(index) as FormGroup).patchValue({brand:event.target.value});
    
  }
  setQuantity(event:any, index:any)
  {

    const items = this.auctionForm.get('items') as FormArray;
     (items.at(index) as FormGroup).patchValue({quantity:event.target.value});
     this.itemTotalPrice[index]=event.target.value *
     this.itemPriceBeforQuantity[index];
     this.calcTotal()
  }
  setPrice(event:any, index:any)
  {

    const items = this.auctionForm.get('items') as FormArray;
     (items.at(index) as FormGroup).patchValue({pricePerItem:event.target.value});
     this.itemTotalPrice[index]=event.target.value ;
     this.itemPriceBeforQuantity[index] = event.target.value;
    this.calcTotal()
    
  }
  calcTotal()
  {
    this.totalPrice = 0
    this.itemTotalPrice.forEach((item:any) => {
     this.totalPrice += item 
    })
  }

  onAddImage(event:any, index:any){
 

 
    const reader:any = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);  
 
     reader.onload = () => {
       this.imgSrc = reader.result as string;
      this.imgIndex = index;
      //  const items = this.auctionForm.get('items') as FormArray;
      //  (items.at(index) as FormGroup).patchValue({image:event.target.files[0]});
      var data = event.target.files[0];
      const items = this.auctionForm.get('items') as FormArray;
      (items.at(index) as FormGroup).patchValue({image:data});
     

  
     


         
     }


    }

  }

  liveAuction = false;
  onFormatChange(event:any)
  {
       if(event === 'live')
       {
           this.liveAuction = true;
           this.auctionForm.patchValue({'span':1});

       }
       else {
        this.liveAuction = false;

       } 
       let starteDate = new Date()
       starteDate = this.auctionForm.value['startDate']
       let startDatevalue = starteDate.getTime();
        
       this.newDate = new Date(startDatevalue + (24*60*60*1000))
    
    
       this.auctionForm.patchValue({'endDate':this.newDate}); 

      this.auctionForm.patchValue({'endDate':this.newDate})


  }

  citiesArray = new Array;
  categoriesArray = new Array()
  cities(citiesArray:any)
  {
    citiesArray.forEach((city:any) => {
      this.citiesArray.push(city.city)
    })
    this.citiesArray.push('others')

  }
  categories(categoriesArray:any)
  {
 categoriesArray.forEach((category:any) => {
        this.categoriesArray.push(category.name)
    })
    this.categoriesArray.push('others')
  }


}
