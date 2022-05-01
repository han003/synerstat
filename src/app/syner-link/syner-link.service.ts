import { Injectable } from '@angular/core';
import {loadSynergy, player} from '../Synergism/Synergism';
import {CalcCorruptionStuff, calculateAscensionAcceleration, calculateAscensionScore, calculatePowderConversion} from '../Synergism/Calculate';

@Injectable({
  providedIn: 'root'
})
export class SynerLinkService {
  constructor() { }

  async load(saveImport?: string) {
    if (!saveImport) return;

    await loadSynergy(saveImport);
  }

  getAscensionTimeAcceleration() {
    return calculateAscensionAcceleration();
  }

  getAscensionCubes(perSecond = false) {
    const [cubes, tess, hyper, platonic, hepteract] = CalcCorruptionStuff().slice(4);
    return perSecond ? cubes / player.ascensionCounter : cubes;
  }

  getAscensionHepteracts(perSecond = false) {
    const [cubes, tess, hyper, platonic, hepteract] = CalcCorruptionStuff().slice(4);
    return perSecond ? hepteract / player.ascensionCounter : hepteract;
  }

  getTotalHepteracts() {
    return this.getAscensionHepteracts(false) + player.wowAbyssals;
  }

  getOrbsPerPowder() {
    return 1 / calculatePowderConversion().mult;
  }

  getHepteractCraftCost(levels: number, cap: number, conversion: number) {
    let cost = 0;

    for (let i = 0; i < levels; i++) {
      cost += (cap * conversion);
      cap *= 2;
    }

    return cost;
  }

  getMaxHepteractCraft(hepteracts: number, craft: 'chronos') {
    let cost = player.hepteractCrafts[craft].CAP * player.hepteractCrafts[craft].HEPTERACT_CONVERSION * 2;
    let levels = 0;

    while (hepteracts >= cost) {
      levels++;
      cost *= 2;
    }

    return levels;
  }

  chronosOrOrbs(chronosLevels?: number) {
    let maxChronosLevels = chronosLevels ?? this.getMaxHepteractCraft(this.getTotalHepteracts(), 'chronos');

    let currentPerSecond = this.getAscensionCubes(true);
    let newChronosCapCost = this.getHepteractCraftCost(maxChronosLevels, player.hepteractCrafts.chronos.CAP, player.hepteractCrafts.chronos.HEPTERACT_CONVERSION);
    let orbsForChronosCap = newChronosCapCost / 250000;
    let powderForOrbs = Math.floor(orbsForChronosCap / this.getOrbsPerPowder());

    player.overfluxPowder += powderForOrbs;
    let powderPerSecond = this.getAscensionCubes(true);
    player.overfluxPowder -= powderForOrbs;
    let orbsImprovement = powderPerSecond / currentPerSecond;

    let originalBalance = player.hepteractCrafts.chronos.BAL;
    let currentAcceleration = this.getAscensionTimeAcceleration();

    for (let i = 0; i < maxChronosLevels; i++) {
      player.hepteractCrafts.chronos.BAL *= 2;
    }

    let newAcceleration = this.getAscensionTimeAcceleration();
    player.hepteractCrafts.chronos.BAL = originalBalance;

    return {
      chronosPercent: newAcceleration / currentAcceleration,
      powderPercent: orbsImprovement,
      chronosLevels,
      orbs: orbsForChronosCap,
      powder: powderForOrbs,
    }
  }
}
