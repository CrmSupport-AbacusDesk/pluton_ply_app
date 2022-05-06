import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DbserviceProvider } from '../../../providers/dbservice/dbservice';
import { TabsPage } from '../../tabs/tabs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HomePage } from '../../home/home';
import { SuccessModalPage } from '../../success-modal/success-modal';



@IonicPage()
@Component({
  selector: 'page-coupan-code',
  templateUrl: 'coupan-code.html',
})
export class CoupanCodePage {
  
  qr_code:any='';
  data:any={};
  flag:any='';
  
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams,public service:DbserviceProvider,public alertCtrl:AlertController,private barcodeScanner: BarcodeScanner) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CoupanCodePage');
  }
  
  submit(data)
  {
    this.flag=1;
    console.log(data);
    this.qr_code=data;
    this.service.post_rqst({'karigar_id':this.service.karigar_id,'qr_code':this.qr_code},'app_karigar/karigarCoupon').subscribe((r:any)=>
    {
      console.log(r);
      
      if(r['status'] == 'BLANK'){
        this.showAlert("This Coupon Code doesn't contain any Value");
        return;
      }
      else if(r['status'] == 'INVALID'){
        this.showAlert("Invalid Coupon Code");
        return;
      }
      else if(r['status'] == 'REQUIRED'){
        this.showAlert("Please Enter Coupon Code");
        return;
      }
      else if(r['status'] == 'USED'){
        this.showAlert("Coupon Already Used");
        return;
      }
      else if(r['status'] == 'UNASSIGNED OFFER'){
        this.showAlert("Your Account Under Verification");
        return;
      }
      
      else if(r['status'] == 'VALID'){
        let productData
        productData =r['productdetail']
        
        if(productData.image != ''){
          this.presentCancelPolicyModal(r['productdetail']);
        }
        
        else{
          this.showSuccess( r['coupon_value'] + '' + "POINTS have been added into your wallet")
        }
      }
      // this.navCtrl.setRoot(TabsPage,{index:'0'});
      this.navCtrl.push(HomePage);
    });
  }
  scan()
  {
    
    this.barcodeScanner.scan().then(resp => {
      console.log(resp);
      this.qr_code=resp.text;
      console.log( this.qr_code);
      if(resp.text != '')
      {
        this.service.post_rqst({'karigar_id':this.service.karigar_id,'qr_code':this.qr_code},'app_karigar/karigarCoupon').subscribe((r:any)=>
        {
          console.log(r);
          
          if(r['status'] == 'INVALID'){
            this.showAlert("Invalid Coupon Code");
            return;
          }
          else if(r['status'] == 'USED'){
            this.showAlert("Coupon Already Used");
            return;
          }
          else if(r['status'] == 'UNASSIGNED OFFER'){
            this.showAlert("Invalid Coupon Code");
            return;
          }
          else if(r['status'] == 'REQUIRED'){
            this.showAlert("Please Enter the coupon code ");
            return;
          }
          
          else if(r['status'] == 'VALID'){
            let productData
            productData =r['productdetail']
            
            if(productData.image != ''){

              console.log(r['productdetail']);
              

              this.presentCancelPolicyModal(r['productdetail']);
            }
            
            else{
              this.showSuccess( r['coupon_value']+ '' + "POINTS have been added into your wallet")
            }
          }
          // this.showSuccess( r['coupon_value'] +" POINTS have been added into your wallet")
          // this.navCtrl.setRoot(TabsPage,{index:'0'});
          // this.navCtrl.push(TabsPage);
        });
      }
      else
      {
        console.log('not scanned anything');
      }
    });      
  }
  showAlert(text)
  {
    let alert = this.alertCtrl.create({
      title:'Alert!',
      cssClass:'action-close',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  showSuccess(text)
  {
    let alert = this.alertCtrl.create({
      title:'Success!',
      cssClass:'action-close',
      subTitle: text,
      buttons: [ {
        text: 'Scan More',
        //   role: 'cancel',
        handler: () => {
            this.scan();
        }
    },
    {
        text: 'Okay',
        handler: () => {
            
        }
    }
]
    });
    alert.present();
  }
  
  presentCancelPolicyModal(data) {
    console.log(data);
    
    let contactModal = this.modalCtrl.create(SuccessModalPage,{'data':data});
    contactModal.present();
    console.log('otp');
  }
}
