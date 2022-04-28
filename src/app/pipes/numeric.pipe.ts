import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeric'
})
export class NumericPipe implements PipeTransform {
  smallFormatter = new Intl.NumberFormat(window.navigator.language);
  mediumFormatter = new Intl.NumberFormat(window.navigator.language, {
    compactDisplay: 'short',
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  bigFormatter = new Intl.NumberFormat(window.navigator.language, {
    notation: 'scientific',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  transform(value: unknown): unknown {
    if (typeof value === 'string') return value;
    if (Number.isNaN(value)) return value;

    let number = Math.floor(value as number);

    if (number < 1e6) return this.smallFormatter.format(number);
    if (number < 1e15) return this.mediumFormatter.format(number);

    return this.bigFormatter.format(number);
  }
}
