import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import {FileTransfer} from "@ionic-native/file-transfer";
/**
 * Generated class for the PdfViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdf-view',
  templateUrl: 'pdf-view.html',
})
export class PdfViewPage {

  constructor(public navCtrl: NavController, private document: DocumentViewer,
              private file: File, private transfer: FileTransfer,
              public navParams: NavParams, private  platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfViewPage');
  }

  openLocalPdf(){
    const options : DocumentViewerOptions = {
      title: 'My PDF'
    };

    this.document.viewDocument( 'assets/dev.pdf', 'application/pdf', options)

  }




  downloadAndOpenPdf(){
    let path = null;

    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }
    const transfer = this.transfer.create();
    transfer.download('https://devdactic.com/html/5-simple-hacks-LBT.pdf',
      path + 'myfile.pdf').then(entry => {
        let url = entry.toURL();
        this.document.viewDocument(url, 'application/pdf', {})
    });
  }
}
