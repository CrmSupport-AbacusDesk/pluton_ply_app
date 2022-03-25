import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ModalController, ViewController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';


@IonicPage()
@Component({
  selector: 'page-cancelation-policy',
  templateUrl: 'cancelation-policy.html',
})
export class CancelationPolicyPage {
  get_cancellation_policy:any;
  loading:any;

  constructor(public viewCtrl:ViewController,public modalCtrl: ModalController,public translate:TranslateService,public service:DbserviceProvider,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,) {
  
  
  }
  // ngOnInit() {
  //   const modalState = {
  //     modal : true,
  //     desc : 'fake state for our modal'
  //   };
  //   history.pushState(modalState, null);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelationPolicyPage');
    this.get_notification()

  }
  presentLoading() 
  {
      this.translate.get("Please wait...")
      .subscribe(resp=>{
          this.loading = this.loadingCtrl.create({
              content: resp,
              dismissOnPageChange: false
          });
          this.loading.present();
      })
  }

  get_notification()
  {
      this.presentLoading()
      this.service.post_rqst({},"app_karigar/get_cancellation_policy")
      .subscribe(resp=>{
          console.log("policy ===>",resp);
          this.get_cancellation_policy = resp.getData.tnc;
          this.loading.dismiss();
      })

  }

  closmodal(){
    this.viewCtrl.dismiss();
  }
 

 

}
