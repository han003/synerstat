import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Savedata} from './interfaces/savedata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hostSavedata?: Savedata;
  shareLink = '';
  saveImport?: string = '';
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
    {text: 'Constant', key: 'constant'},
    {text: 'Best C15', key: 'c15exponent'},
    {text: 'Golden quarks', key: 'qoldenQuarks'},
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
    {text: 'Hepteracts', key: 'hepteracts'},
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params);

      if (params['save']) {
        try {
          this.hostSavedata = JSON.parse(atob(params['save']!));
          this.addPlayer(this.hostSavedata as Record<string, any>);
          this.setLink();
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  formatImport(saveImport: Record<string, any>): Record<string, any> {
    console.log(`saveImport`, saveImport);

    let savedata: Savedata = {
      achievementPoints: saveImport['achievementPoints'],
      ascensionSeconds: saveImport['ascensionCounter'],
      achievements: saveImport['achievements'].filter((x: number) => x).length,
      constant: saveImport['ascendShards'],
      c15exponent: saveImport['challenge15Exponent'],
      challengeCompletions: {
        11: saveImport['challengecompletions'][11],
        12: saveImport['challengecompletions'][11],
        13: saveImport['challengecompletions'][11],
        14: saveImport['challengecompletions'][11],
        15: saveImport['challengecompletions'][11],
      },
      cubeBlessings: saveImport['cubeBlessings'],
      cubeUpgrades: {
        '5x10': saveImport['cubeUpgrades'][50],
      },
      qoldenQuarks: saveImport['goldenQuarks'],
      hepteractCrafts: saveImport['hepteractCrafts'],
      hypercubeBlessings: saveImport['hypercubeBlessings'],
      overfluxOrbs: saveImport['overfluxOrbs'],
      overfluxPowder: saveImport['overfluxPowder'],
      platonicBlessings: saveImport['platonicBlessings'],
      platonicUpgrades: saveImport['platonicUpgrades'],
      quarksThisSingularity: saveImport['quarksThisSingularity'],
      researches: {
        '8x25': saveImport['researches'][200],
      },
      runeBlessingLevels: saveImport['runeBlessingLevels'],
      runeSpiritLevels: saveImport['runeSpiritLevels'],
      infiniteAscent: saveImport['runelevels'][5],
      shopUpgrades: saveImport['shopUpgrades'],
      singularityCount: saveImport['singularityCount'],
      singularityUpgrades: Object.entries(saveImport['singularityUpgrades']).reduce((obj: any, entry: any) => {
        obj[entry[0]] = {level: entry[1]['level'], gqInvested: entry[1]['goldenQuarksInvested']}
        return obj;
      }, {}),
      version: saveImport['version'],
      availableCubes: {
        cubes: saveImport['wowCubes'],
        tess: saveImport['wowTesseracts'],
        hypers: saveImport['wowHypercubes'],
        plats: saveImport['wowPlatonicCubes'],
      },
      openedCubes: {
        cubes: this.sumObject(saveImport['cubeBlessings']),
        tess: this.sumObject(saveImport['tesseractBlessings']),
        hypers: this.sumObject(saveImport['hypercubeBlessings']),
        plats: this.sumObject(saveImport['platonicBlessings']),
      },
      hepteracts: saveImport['wowAbyssals'],
    };

    console.log(`formattedImport`, savedata);
    console.log(`formattedImport`, btoa(JSON.stringify(savedata)).length);

    return savedata;
  }

  linkCopied() {
    this.snackbar.open('Link copied to clipboard');
  }

  setLink() {
    this.shareLink ||= `${location.host}${location.pathname}?save=${btoa(JSON.stringify(this.hostSavedata))}`;
  }

  addPlayer(savedata: Record<string, any>) {
    let player = `Player ${this.players.length + 1}`;
    this.players.push(player);

    console.log(`savedata`, savedata);

    // General
    this.generalDisplayColumns.push(player);
    this.generalDataSource.forEach(item => {
      item[player] = savedata[item.key];

      if (item.key === 'r8x25') {
        item[player] = savedata['researches']['8x25'];
      }
      if (item.key === 'w5x10') {
        item[player] = savedata['cubeUpgrades']['5x10'];
      }
      if (item.key === 'infiniteAscent') {
        item[player] = savedata['infiniteAscent'];
      }
      if (item.key === 'achievements') {
        item[player] = savedata['achievements'];
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

      if (item.key === 'wowCubes') {
        item[player] = savedata['availableCubes']['cubes'];
      }
      if (item.key === 'wowTesseracts') {
        item[player] = savedata['availableCubes']['tess'];
      }
      if (item.key === 'wowHypercubes') {
        item[player] = savedata['availableCubes']['hypers'];
      }
      if (item.key === 'wowPlatonicCubes') {
        item[player] = savedata['availableCubes']['plats'];
      }
      if (item.key === 'wowCubesOpened') {
        item[player] = savedata['openedCubes']['cubes'];
      }
      if (item.key === 'wowTesseractsOpened') {
        item[player] = savedata['openedCubes']['tess'];
      }
      if (item.key === 'wowHypercubesOpened') {
        item[player] = savedata['openedCubes']['hypers'];
      }
      if (item.key === 'wowPlatonicCubesOpened') {
        item[player] = savedata['openedCubes']['plats'];
      }
    });

    // C15 / Platonic upgrades
    this.platonicUpgradesDisplayColumns.push(player);
    this.platonicUpgradesDataSource.forEach((item, index) => {
      item[player] = savedata['platonicUpgrades'][index + 1];
    });
  }

  import() {
    const savedata = this.formatImport(JSON.parse(atob(this.saveImport!)));
    this.hostSavedata ||= savedata as Savedata;
    delete this.saveImport;

    this.setLink();
    this.addPlayer(savedata);
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
