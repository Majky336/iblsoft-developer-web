import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { BriefingData } from '../../model/reports.model';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { ReportsResultItemComponent } from '../reports-result-item/reports-result-item.component';

@Component({
  selector: 'app-reports-result',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    DatePipe,
    HighlightPipe,
    ReportsResultItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports-result.component.html',
  styleUrl: './reports-result.component.css',
})
export class ReportsResultComponent {
  @Input() briefingData: BriefingData | null = null;
  @Input() loading: boolean | null = false;
}
