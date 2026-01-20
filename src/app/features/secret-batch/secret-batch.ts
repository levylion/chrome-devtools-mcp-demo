import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-secret-batch',
  standalone: true,
  imports: [QRCodeComponent],
  templateUrl: './secret-batch.html',
  styleUrl: './secret-batch.css'
})
export class SecretBatchComponent {
  // Configuration - Update these values as needed
  readonly config = {
    qrCodeUrl: 'https://forms.gle/uT4nntySvMP4BniV6',
    qrCodeSize: 400,
    pageTitle: 'Secret Batch',
    callToAction: 'Scan to enter the giveaway'
  };
}
