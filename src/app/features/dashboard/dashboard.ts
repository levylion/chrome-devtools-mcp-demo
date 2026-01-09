import { Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { BrewService } from '../../core/services/brew';
import { TemperatureGaugeComponent } from '../../shared/components/temperature-gauge/temperature-gauge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, DatePipe, DecimalPipe, TemperatureGaugeComponent, RouterLink, FormsModule],
  template: `
    <div class="dashboard-header">
      <h2>Active Brews Dashboard</h2>
      <div class="actions">
        <select [ngModel]="filterStatus()" (ngModelChange)="filterStatus.set($event)" class="status-filter">
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Fermenting">Fermenting</option>
          <option value="Conditioning">Conditioning</option>
        </select>
        <button class="btn btn-primary" routerLink="/add-batch">
          <span class="icon">➕</span> New Batch
        </button>
      </div>
    </div>

    <!-- INTENTIONAL BUG: CSS Layout Issue
         The grid columns are fixed to 4, causing overflow on mobile/tablet
         See dashboard.css for the faulty implementation -->
    <div class="brew-cards-container">
      @for (batch of filteredBatches(); track batch.id) {
        <div class="card brew-card">
          <div class="card-header">
            <span class="status-badge" [class]="batch.status.toLowerCase()">
              {{ batch.status }}
            </span>
            <h3>{{ batch.name }}</h3>
            <span class="style">{{ batch.style }}</span>
          </div>

          <div class="card-body">
            <div class="metric-group">
              <label>Temperature</label>
              <!-- Uses TemperatureGauge with Accessibility Bug -->
              <app-temperature-gauge [temperature]="batch.temp" />
            </div>

            <div class="metrics-grid">
              <div class="metric">
                <label>Gravity</label>
                <div class="value">{{ batch.currentGravity | number:'1.3-3' }}</div>
                <div class="sub">Target: {{ batch.targetOG }}</div>
              </div>
              <div class="metric">
                <label>Pressure</label>
                <div class="value">{{ batch.pressure }} psi</div>
              </div>
              <div class="metric">
                <label>Day</label>
                <div class="value">4</div>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <button class="btn btn-outline w-full">View Details</button>
          </div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  private brewService = inject(BrewService);
  batches = toSignal(this.brewService.getActiveBatches(), { initialValue: [] });

  filterStatus = signal('All');

  filteredBatches = computed(() => {
    const filter = this.filterStatus();
    const batches = this.batches();

    if (filter === 'All') return batches;
    return batches.filter(b => b.status === filter);
  });
}
