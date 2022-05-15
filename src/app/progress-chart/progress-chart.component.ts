import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss']
})
export class ProgressChartComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  filesControl = new FormControl();

  constructor() {
    this.filesControl.valueChanges.subscribe(() => {
      this.filesChange();
    });
  }

  ngOnInit(): void {
  }

  hasAlpha(save: Record<string, any>) {
    return save.platonicUpgrades[5] && !this.hasBeta(save) && !this.hasOmega(save);
  }

  hasBeta(save: Record<string, any>) {
    return save.platonicUpgrades[10] && !this.hasOmega(save);
  }

  hasOmega(save: Record<string, any>) {
    return save.platonicUpgrades[15];
  }

  async filesChange() {
    let files = this.fileInput.nativeElement.files as FileList;
    let saves: Record<string, any>[] = [];
    let lastChallenge15Exponent = -1;

    for (let file of Array.from(files)) {
      let content = await this.readFile(file);
      let save = JSON.parse(atob(content));

      if (save.challenge15Exponent !== lastChallenge15Exponent) {
        saves.push(save);
        lastChallenge15Exponent = save.challenge15Exponent;
      }
    }

    saves = saves.sort((a,b) => a.offlinetick - b.offlinetick);

    console.log(`saves`, saves);

    Chart.register(...registerables);

    new Chart(document.getElementById('expoChart') as HTMLCanvasElement, {
      type: 'line',
      options: {
        responsive: true,
        scales: {
          y: {
            display: true,
            type: 'logarithmic',
          },
          x: {
            display: true,
          }
        }
      },
      data: {
        labels: saves.map(s => new Date(s.offlinetick).toLocaleString()),
        datasets: [
          {
            label: 'Challenge 15 exponent',
            data: saves.map(s => s.challenge15Exponent),
            fill: false,
            backgroundColor: '#424242',
            borderColor: '#424242',
            pointRadius: 2,
            segment: {
              borderColor: ctx => {
                if (this.hasAlpha(saves[ctx.p0DataIndex])) return '#fdd835';
                if (this.hasBeta(saves[ctx.p0DataIndex])) return '#26a69a';
                if (this.hasOmega(saves[ctx.p0DataIndex])) return '#880e4f';

                return undefined;
              },
              backgroundColor: ctx => {
                if (this.hasAlpha(saves[ctx.p0DataIndex])) return '#fdd835';
                if (this.hasBeta(saves[ctx.p0DataIndex])) return '#26a69a';
                if (this.hasOmega(saves[ctx.p0DataIndex])) return '#880e4f';

                return undefined;
              },
            },
          }
        ]
      }
    })
  }

  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = function () {
        resolve(reader.result as string);
      }

      reader.onerror = function () {
        reject();
      }

      reader.readAsText(file);
    });
  }
}
