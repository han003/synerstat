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
    console.log(`value`, value);
    if (value == null) return '';

    if (typeof value === 'string') {
      if (!value.includes('e+')) return value;

      let [number, exponent] = value.split('e+');
      let decimals = number.slice(number.indexOf('.') + 1).length;
      let big = number.replace('.', '') + '0'.repeat(parseInt(exponent) - decimals);
      return this.format(BigInt(big));
    }

    if (Number.isNaN(value)) return value;

    return this.format(BigInt(Math.floor(value as number)));
  }

  private format(number: bigint) {
    if (number < BigInt(1e6)) return this.smallFormatter.format(number);
    if (number < BigInt(1e15)) return this.mediumFormatter.format(number);

    return this.bigFormatter.format(number);
  }
}
