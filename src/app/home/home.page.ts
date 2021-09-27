import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  getIMCClassification(imcValue: number) {
    let classification = "";
    if (imcValue < 18.5)
      classification = "Magreza";
    else if (imcValue <= 24.9)
      classification = "Normal";
    else if (imcValue <= 29.9)
      classification = "Sobrepeso";
    else if (imcValue <= 39.9)
      classification = "Obesidade";
    else
      classification = "Obesidade grave";
    return classification;
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    const classification = this.getIMCClassification(imc);
    this.showMessage(`IMC = ${imc.toFixed(2)} \nClassificação: ${classification}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
