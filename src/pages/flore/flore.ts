import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { ScrollHideConfig  } from '../../directives/scroll-hide/scroll-hide';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@IonicPage()
@Component({
  selector: 'page-flore',
  templateUrl: 'flore.html',
})
export class FlorePage {
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

  testResponse: any;
  nativepath: any;
  fd: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private builder: FormBuilder,
              private transfer: Transfer,
              private camera: Camera,
              private fileChooser: FileChooser,
              public loading: LoadingController
  ) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad FlorePage');
  }


  uploadresume()
  {
    this.fileChooser.open()
      .then(uri =>
      {
        console.log(uri)
        const fileTransfer: TransferObject = this.transfer.create();


        // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
        let options1: FileUploadOptions = {
          fileKey: 'image_upload_file',
          fileName: 'name.pdf',
          headers: {},
          params: {"app_key":"Testappkey"},
          chunkedMode : false

        }

        fileTransfer.upload(uri, 'http://localhost/testphp/upload.php', options1)
          .then((data) => {
            // success
            alert("success"+JSON.stringify(data));
          }, (err) => {
            // error
            alert("error"+JSON.stringify(err));
          });

      })
      .catch(e => console.log(e));
  }

  selectPDF(){
    this.fileChooser.open()
      .then(uri =>
      {(<any>window).FilePath.resolveNativePath(uri, (result) => {
        let loaderPdf = this.loading.create({
          content: "Uploading PDF..."
        });
        loaderPdf.present();
        // this.fd.append('doc',result);
        this.testResponse = result;
        this.nativepath = result;
        this.readfile(loaderPdf);
      })
      })
      .catch(e =>
        this.testResponse = 'Error - '+e);
  }

  readfile(loaderPdf) {
    (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();
        // reader.readAsArrayBuffer(resFile);

        reader.onloadend = (evt: any) => {
          loaderPdf.dismiss();
          var src = evt.target.result;
          src = src.split("base64,");
          var contentAsBase64EncodedString = src[1];
          var contentType = src[0].split(':');
          this.testResponse = contentType[1].replace(';','');
          contentType = JSON.stringify(contentType[1].replace(';',''));
          var fileBlob = new Blob([evt.target.result], { type: contentType});
          this.fd.append('doc',fileBlob,'doc');
          //do what you want to do with the file
        }
        reader.readAsDataURL(resFile);
      })
    })
  }
}
