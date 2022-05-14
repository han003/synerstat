import {Component, Input, OnInit} from '@angular/core';
import {Savedata} from '../interfaces/savedata';
import {ForgeCrafts} from '../interfaces/forge-crafts';
import {SynerLinkService} from '../syner-link/syner-link.service';

type Forge = Record<ForgeCrafts, {balance: number, baseCap: number, tier: number, cap: number, conversion: number, unlocked: boolean}>;

@Component({
  selector: 'app-forge',
  templateUrl: './forge.component.html',
  styleUrls: ['./forge.component.scss']
})
export class ForgeComponent implements OnInit {
  @Input() set hostSavedata(value: Savedata) {
    this._hostSaveData = value;

    this.maxChronosLevels = this.synerLink.getMaxHepteractCraft(this.synerLink.getTotalHepteracts(), 'chronos');
    this.orbConversion = this.synerLink.getOrbsPerPowder();
    this.calcGains();
  };

  _hostSaveData?: Savedata;
  forge?: Forge;
  maxChronosLevels = this.synerLink.getMaxHepteractCraft(this.synerLink.getTotalHepteracts(), 'chronos');
  chronosLevels = this.maxChronosLevels;
  powderGains = 0;
  orbsForGains = 0;
  powderForGains = 0;
  chronosGains = 0;
  orbConversion = this.synerLink.getOrbsPerPowder();

  constructor(public synerLink: SynerLinkService) { }

  ngOnInit(): void {
    this.calcGains();
  }

  calcGains() {
    let result = this.synerLink.chronosOrOrbs(this.chronosLevels);

    this.powderGains = result.powderPercent;
    this.chronosGains = result.chronosPercent;
    this.orbsForGains = result.orbs;
    this.powderForGains = result.powder;
  }
}
