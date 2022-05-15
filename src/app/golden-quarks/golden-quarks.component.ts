import {Component, OnInit} from '@angular/core';
import {SynerLinkService} from '../syner-link/syner-link.service';
import {player} from '../Synergism/Synergism';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-golden-quarks',
  templateUrl: './golden-quarks.component.html',
  styleUrls: ['./golden-quarks.component.scss']
})
export class GoldenQuarksComponent implements OnInit {
  goldenQuarks = 0;
  originalSingularity = 0;
  singularity = new FormControl();
  originalQuarksThisSingularity = 0;
  quarksThisSingularity = new FormControl();
  originalC15Expo = 0;
  c15Expo = new FormControl();

  constructor(private synerlink: SynerLinkService) { }

  ngOnInit(): void {
    this.synerlink.subject.subscribe(() => {
      this.goldenQuarks = this.synerlink.calculateGoldenQuarkGain();

      this.originalSingularity = player.singularityCount;
      this.singularity.setValue(this.originalSingularity);
      this.singularity.valueChanges.subscribe((value) => {
        player.singularityCount = value;
        this.goldenQuarks = this.synerlink.calculateGoldenQuarkGain();
      });

      this.originalQuarksThisSingularity = Math.floor(player.quarksThisSingularity);
      this.quarksThisSingularity.setValue(this.originalQuarksThisSingularity);
      this.quarksThisSingularity.valueChanges.subscribe((value) => {
        player.quarksThisSingularity = value;
        this.goldenQuarks = this.synerlink.calculateGoldenQuarkGain();
      });

      this.originalC15Expo = player.challenge15Exponent;
      this.c15Expo.setValue(this.originalC15Expo);
      this.c15Expo.valueChanges.subscribe((value) => {
        player.challenge15Exponent = value;
        this.goldenQuarks = this.synerlink.calculateGoldenQuarkGain();
      });
    });
  }
}
