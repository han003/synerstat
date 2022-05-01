import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Savedata} from '../interfaces/savedata';
import {ForgeCrafts} from '../interfaces/forge-crafts';

type Forge = Record<ForgeCrafts, {balance: number, baseCap: number, tier: number, cap: number, conversion: number, unlocked: boolean}>;

@Component({
  selector: 'app-forge',
  templateUrl: './forge.component.html',
  styleUrls: ['./forge.component.scss']
})
export class ForgeComponent implements OnInit {
  @Input() set hostSavedata(value: Savedata) {
    this._hostSaveData = value;
    this.constructForge(value);
  };

  _hostSaveData?: Savedata;
  currentRunHept?: number = 0;
  forge?: Forge;

  constructor() { }

  ngOnInit(): void {
  }

  constructForge(value: Savedata) {
    let crafts: ForgeCrafts[] = ['abyss', 'accelerator', 'acceleratorBoost', 'challenge', 'chronos', 'hyperrealism', 'multiplier', 'quark'];

    this.forge = crafts.reduce((obj, craft) => {
      obj[craft] = {
        balance: value.hepteractCrafts[craft].BAL,
        baseCap: value.hepteractCrafts[craft].BASE_CAP,
        tier: this.calcTier(value.hepteractCrafts[craft].BASE_CAP, value.hepteractCrafts[craft].CAP),
        cap: value.hepteractCrafts[craft].CAP,
        conversion: value.hepteractCrafts[craft].HEPTERACT_CONVERSION,
        unlocked: value.hepteractCrafts[craft].UNLOCKED,
      }

      return obj;
    }, {} as Forge);

    console.log(`this.forge`, this.forge);
  }

  private calcTier(baseCap: number, currentCap: number) {
    let tier = 1;
    let cap = baseCap;

    while (cap !== currentCap) {
      tier++;
      cap = cap * 2;
    }

    return tier;
  }
}
