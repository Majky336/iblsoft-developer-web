import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { Report } from '../../model/reports.model';

@Component({
  selector: 'app-reports-result-item',
  standalone: true,
  imports: [DatePipe, HighlightPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports-result-item.component.html',
  styleUrl: './reports-result-item.component.css',
})
export class ReportsResultItemComponent {
  @Input() report!: Report;
}
