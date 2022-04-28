import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  savefile?: string = '';
  players: string[] = [];

  generalDisplayColumns: string[] = ['key'];
  generalDataSource: ({ text: string, key: string } & Record<string, any>)[] = [
    {text: 'Version', key: 'version'},
    {text: 'Singularity', key: 'singularityCount'},
    {text: 'Achievements', key: 'achievements'},
    {text: 'Avg. blessing', key: 'avgBlessing'},
    {text: 'Avg. spirit', key: 'avgSpirit'},
    {text: 'r8x25', key: 'r8x25'},
    {text: 'w5x10', key: 'w5x10'},
    {text: 'Infinite Ascent', key: 'infiniteAscent'},
    {text: 'Constant', key: 'ascendShards'},
    {text: 'Best C15', key: 'challenge15Exponent'},
    {text: 'Golden quarks', key: 'goldenQuarks'},
    {text: 'Overflux orbs', key: 'overfluxOrbs'},
    {text: 'Overflux powder', key: 'overfluxPowder'},
  ];

  cubesDisplayColumns: string[] = ['key'];
  cubesDataSource: ({ text: string, key: string } & Record<string, any>)[] = [
    {text: 'Cubes opened', key: 'wowCubesOpened'},
    {text: 'Cubes unopened', key: 'wowCubes'},
    {text: 'Tesseracts opened', key: 'wowTesseractsOpened'},
    {text: 'Tesseracts unopened', key: 'wowTesseracts'},
    {text: 'Hypercubes opened', key: 'wowHypercubesOpened'},
    {text: 'Hypercubes unopened', key: 'wowHypercubes'},
    {text: 'Platonics opened', key: 'wowPlatonicCubesOpened'},
    {text: 'Platonics unopened', key: 'wowPlatonicCubes'},
    {text: 'Hepteracts unused', key: 'wowAbyssals'},
  ]

  platonicUpgradesDisplayColumns: string[] = ['key'];
  platonicUpgradesDataSource: ({ text: string, key: string } & Record<string, any>)[] = [
    {text: '1x1', key: '1x1'},
    {text: '1x2', key: '1x2'},
    {text: '1x3', key: '1x3'},
    {text: '1x4', key: '1x4'},
    {text: 'alpha', key: 'alpha'},
    {text: '2x1', key: '2x1'},
    {text: '2x2', key: '2x2'},
    {text: '2x3', key: '2x3'},
    {text: '2x4', key: '2x4'},
    {text: 'beta', key: 'beta'},
    {text: '3x1', key: '3x1'},
    {text: '3x2', key: '3x2'},
    {text: '3x3', key: '3x3'},
    {text: '3x4', key: '3x4'},
    {text: 'omega', key: 'omega'},
    {text: '4x1', key: '4x1'},
    {text: '4x2', key: '4x2'},
    {text: '4x3', key: '4x3'},
    {text: '4x4', key: '4x4'},
    {text: '4x5', key: '4x5'},
  ]


  import() {
    const savedata: Record<string, any> = JSON.parse(atob(this.savefile!));
    delete this.savefile;

    // Exclude this
    ['loaded', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'].forEach(x => {
      Object.keys(savedata).forEach(key => {
        if (key.startsWith(x)) delete savedata[key];
      });
    });
    console.log(`this.savedata`, savedata);

    let player = `Player ${this.players.length + 1}`;
    this.players.push(player);

    // General
    this.generalDisplayColumns.push(player);
    this.generalDataSource.forEach(item => {
      item[player] = savedata[item.key];

      if (item.key === 'r8x25') {
        item[player] = savedata['researches'][200];
      }
      if (item.key === 'w5x10') {
        item[player] = savedata['cubeUpgrades'][50];
      }
      if (item.key === 'infiniteAscent') {
        item[player] = savedata['runelevels'][5];
      }
      if (item.key === 'achievements') {
        item[player] = savedata['achievements'].filter((a: number) => a === 1).length;
      }
      if (item.key === 'avgBlessing') {
        item[player] = this.sumObject(savedata['runeBlessingLevels']) / 5;
      }
      if (item.key === 'avgSpirit') {
        item[player] = this.sumObject(savedata['runeSpiritLevels']) / 5;
      }
    });

    // Cubes
    this.cubesDisplayColumns.push(player);
    this.cubesDataSource.forEach(item => {
      item[player] = savedata[item.key];

      if (item.key === 'wowCubesOpened') {
        item[player] = this.sumObject(savedata['cubeBlessings']);
      }
      if (item.key === 'wowTesseractsOpened') {
        item[player] = this.sumObject(savedata['tesseractBlessings']);
      }
      if (item.key === 'wowHypercubesOpened') {
        item[player] = this.sumObject(savedata['hypercubeBlessings']);
      }
      if (item.key === 'wowPlatonicCubesOpened') {
        item[player] = this.sumObject(savedata['platonicBlessings']);
      }
    });

    // C15 / Platonic upgrades
    this.platonicUpgradesDisplayColumns.push(player);
    this.platonicUpgradesDataSource.forEach((item, index) => {
      item[player] = savedata['platonicUpgrades'][index + 1];
    });
  }

  sumObject(object: Record<string, number>) {
    return Object.values<number>(object).reduce((sum: number, val: number) => {
      return sum + val;
    }, 0)
  }

  changeName(index: number) {
    let result = window.prompt('Name', this.players[index]);
    this.players[index] = result || this.players[index];
  }
}
