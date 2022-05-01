import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numeric'
})
export class NumericPipe implements PipeTransform {
  smallFormatter = new Intl.NumberFormat(window.navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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

  transform(value?: unknown, numberNotation = false, decimals = 0): string {
    if (value == null) return '';

    if (typeof value === 'string') {
      if (!value.includes('e+')) return value;

      let [number, exponent] = value.split('e+');
      let decimals = number.slice(number.indexOf('.') + 1).length;
      let big = number.replace('.', '') + '0'.repeat(parseInt(exponent) - decimals);
      return this.format(BigInt(big), numberNotation);
    }

    if (Number.isNaN(value)) return '';

    if (decimals) {
      return new Intl.NumberFormat(window.navigator.language, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value as number)
    }

    return this.format(BigInt(Math.floor(value as number)), numberNotation);
  }

  private format(number: bigint, numberNotation: boolean) {
    if (number < BigInt(1e9)) return this.smallFormatter.format(number);
    if (!numberNotation && number < BigInt(1e15)) return this.mediumFormatter.format(number);

    return this.bigFormatter.format(number);
  }
}
