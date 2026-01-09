import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LogEntry {
  id: number;
  timestamp: Date;
  level: string;
  message: string;
  tags: string[];
}

@Component({
  selector: 'app-brew-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="log-page">
      <h2>Brew Process Logs ({{ logs().length }} entries)</h2>
      <p class="warning">⚠️ High traffic monitoring active</p>

      <!-- INTENTIONAL BUG: Performance Issue
           Rendering 20,000 items directly in DOM without virtual scrolling
           Each item has nested complex DOM structure
      -->
      <div class="log-container">
        @for (log of logs(); track log.id) {
          <div class="log-entry" [class]="log.level.toLowerCase()">
            <div class="time">{{ log.timestamp | date:'HH:mm:ss.SSS' }}</div>
            <div class="level-badge">{{ log.level }}</div>
            <div class="content">
              <span class="message">{{ log.message }}</span>
              <div class="tags">
                @for (tag of log.tags; track tag) {
                  <span class="tag">#{{ tag }}</span>
                }
              </div>
            </div>
            <!-- Extra invisible DOM weight -->
            <div class="debug-info" style="display: none">
              <span>Trace ID: {{ log.id }}</span>
              <span>Origin: Sensor-{{ log.id % 5 }}</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .log-page {
      padding: 1rem;
    }
    
    .warning {
      color: var(--warning);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .log-container {
      height: 600px;
      overflow-y: auto;
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      background: rgba(0,0,0,0.2);
    }

    .log-entry {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 0.75rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      font-family: monospace;
      font-size: 0.9rem;
    }

    .log-entry:hover {
      background: rgba(255,255,255,0.02);
    }

    .level-badge {
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-size: 0.75rem;
      width: 60px;
      text-align: center;
    }

    .info .level-badge { background: rgba(42, 157, 143, 0.2); color: #2a9d8f; }
    .warn .level-badge { background: rgba(244, 162, 97, 0.2); color: #f4a261; }
    .error .level-badge { background: rgba(230, 57, 70, 0.2); color: #e63946; }

    .tags {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }

    .tag {
      color: var(--text-secondary);
      font-size: 0.8rem;
    }
  `]
})
export class BrewLogComponent implements OnDestroy {
  logs = signal<LogEntry[]>([]);
  private intervalId: any;

  constructor() {
    this.generateInitialLogs();

    // INTENTIONAL BUG: Aggressive polling causing frequent re-renders
    // Combined with large DOM size, this causes "DOM Thrashing" and high CPU usage
    this.intervalId = setInterval(() => {
      this.addLog();
    }, 100);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  generateInitialLogs() {
    // Generate 10,000 initial items
    const initialData: LogEntry[] = [];
    for (let i = 0; i < 10000; i++) {
      initialData.push(this.createRandomLog(i));
    }
    this.logs.set(initialData);
  }

  addLog() {
    // Append new logs -> triggers full re-render of the list in some cases if not tracked well
    // But mainly the sheer list size is the issue for layout/paint
    const newLog = this.createRandomLog(Date.now());

    // Mutating the array to trigger updates
    this.logs.update(current => [newLog, ...current]);

    // Optimization: Cap list size? NO, we want the bug!
    // But to prevent browser crash, maybe cap at 20k
    if (this.logs().length > 20000) {
      this.logs.update(current => current.slice(0, 20000));
    }
  }

  createRandomLog(id: number): LogEntry {
    const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
    const msgs = [
      'Temperature sensor reading update',
      'Pressure variance detected',
      'Yeast activity normal',
      'Cooling pump cycle started',
      'Valve #4 state change'
    ];

    return {
      id,
      timestamp: new Date(),
      level: levels[Math.floor(Math.random() * levels.length)],
      message: msgs[Math.floor(Math.random() * msgs.length)],
      tags: ['sensor', 'brewing', 'iot', 'v2']
    };
  }
}
