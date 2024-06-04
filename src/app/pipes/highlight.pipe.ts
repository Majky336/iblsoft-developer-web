import { Pipe, PipeTransform } from '@angular/core';

enum HighlightColor {
  RED = 'red',
  BLUE = 'blue',
  NONE = 'none',
}

const HIGHLIGHT_PREFIX = 'text-highlight';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: unknown, prefix: string[] = ['BKN', 'FEW', 'SCT']): unknown {
    if (typeof value !== 'string') {
      return value;
    }

    const squeezedValue = value.replace(/\s+/g, ' ').trim();
    const splitValue = squeezedValue.split(' ');

    const highlightedValue = splitValue.map((word) => {
      const prefixMatch = prefix.some((p) => word.startsWith(p));

      if (prefixMatch) {
        const color = this.getColorForValue(word);

        if (color === HighlightColor.NONE) {
          return word;
        }

        return `<span class="${HIGHLIGHT_PREFIX}-${color}">${word}</span>`;
      }

      return word;
    });

    return highlightedValue.join(' ');
  }

  private getColorForValue(value: string): HighlightColor {
    const [match] = value.match(/[0-9]+/) || [];

    if (!match) {
      return HighlightColor.NONE;
    }

    const matchNumber = parseInt(match, 10);

    if (matchNumber > 30) {
      return HighlightColor.RED;
    }

    return HighlightColor.BLUE;
  }
}
