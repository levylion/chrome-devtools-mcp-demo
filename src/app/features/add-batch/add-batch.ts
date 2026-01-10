import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-batch',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="page-container">
      <h2>Start New Batch</h2>
      
      <form [formGroup]="batchForm" (ngSubmit)="onSubmit()" class="batch-form">
        <div class="form-group">
          <label>Batch Name</label>
          <input type="text" formControlName="name" placeholder="e.g., Summer Ale">
        </div>

        <div class="form-group">
          <label>Beer Style</label>
          <select formControlName="style">
            <option value="">Select Style...</option>
            <option value="IPA">IPA</option>
            <option value="Stout">Stout</option>
            <option value="Lager">Lager</option>
          </select>
        </div>

        <div class="form-group">
          <label>Target Gravity</label>
          <input type="number" formControlName="targetOG" step="0.001">
        </div>

        <button type="submit" class="btn btn-primary">Create Batch</button>
      </form>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 600px;
      margin: 0 auto;
    }
    .batch-form {
      background: var(--bg-surface);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid var(--glass-border);
    }
  `]
})
export class AddBatchComponent {
  batchForm = new FormGroup({
    name: new FormControl('', Validators.required),
    style: new FormControl('', Validators.required),
    targetOG: new FormControl(1.050),
    // Missing nested 'ingredients' group that code expects
  });

  private http = inject(HttpClient);
  private router = inject(Router);

  onSubmit() {
    console.log('Submitting batch...');

    // INTENTIONAL BUG: Accessing undefined property
    // 'ingredients' control doesn't exist in the form group
    const formValue = this.batchForm.value as any;

    // This will throw: Cannot read properties of undefined (reading 'grain')
    const grainAmount = formValue.ingredients.grain.amount;

    console.log(`Processing batch with ${grainAmount}kg of grain`);

    const newBatch = {
      ...this.batchForm.value,
      startDate: new Date().toISOString(),
      status: 'Active',
      currentGravity: this.batchForm.value.targetOG,
      temp: 20,
      pressure: 0
    };

    this.http.post('http://localhost:3000/batches', newBatch).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
