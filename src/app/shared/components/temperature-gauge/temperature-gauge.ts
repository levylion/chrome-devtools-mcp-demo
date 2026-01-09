import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temperature-gauge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- INTENTIONAL BUG: Accessibility Issues
         - Missing role="meter" or "progressbar"
         - Missing aria-label or aria-valuenow
         - Interactive element (click) without keyboard support 
    -->
    <div class="gauge-container" (click)="toggleDetails()">
      <svg viewBox="0 0 100 100" class="gauge">
        <circle cx="50" cy="50" r="45" class="gauge-bg" />
        <circle cx="50" cy="50" r="45" class="gauge-fill"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashOffset"
        />
      </svg>
      <div class="value-display">
        <span class="value">{{ temperature }}°C</span>
      </div>
    </div>
    
    @if (showDetails) {
      <div class="details-popup">
        Target: 20°C
        <div class="controls">
          <!-- Missing labels for icon-only buttons -->
          <button (click)="adjust(1)">+</button>
          <button (click)="adjust(-1)">-</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .gauge-container {
      position: relative;
      width: 120px;
      height: 120px;
      cursor: pointer;
    }

    .gauge {
      transform: rotate(-90deg);
      width: 100%;
      height: 100%;
    }

    circle {
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
    }

    .gauge-bg {
      stroke: rgba(255, 255, 255, 0.1);
    }

    .gauge-fill {
      stroke: var(--primary);
      transition: stroke-dashoffset 0.5s ease;
    }

    .value-display {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
      font-size: 1.2rem;
    }

    .details-popup {
      position: absolute;
      background: var(--bg-surface);
      border: 1px solid var(--primary);
      padding: 0.5rem;
      border-radius: 4px;
      z-index: 10;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    button {
      background: var(--bg-secondary);
      border: 1px solid var(--text-secondary);
      color: var(--text-primary);
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class TemperatureGaugeComponent {
  @Input() temperature = 0;

  showDetails = false;
  circumference = 2 * Math.PI * 45;

  get dashOffset() {
    // scale 0-100 degrees
    const progress = Math.min(Math.max(this.temperature / 100, 0), 1);
    return this.circumference * (1 - progress);
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  adjust(delta: number) {
    this.temperature += delta;
  }
}
