import { Component, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { TimerEditorComponent } from '../timer-editor/timer-editor.component';
import { TimerTime } from '../types/TimerTime';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  public isEditorShowing: boolean = false;
  public isTimeShowing: boolean = true;

  currentHour: string = "00";
  currentMinute: string = "00";
  currentSecond: string = "00";

  @ViewChild(TimerEditorComponent) timerEditor!: TimerEditorComponent;

  ngOnChanges(){
  }

  enableTimerEditor(){
    this.timerEditor.show();
    this.isEditorShowing = true;
  }

  onToggleEditor(isShowing: boolean){
    this.isEditorShowing = isShowing;

    if(isShowing)
      this.hideTime();
    else
      this.showTime();
  }

  onTimerSaved(timerTimer: TimerTime){
    this.currentHour = timerTimer.hours;
    this.currentMinute = timerTimer.minutes;
    this.currentSecond = timerTimer.seconds;
  }

  showTime(){
    this.isTimeShowing = true;
  }

  hideTime(){
    this.isTimeShowing = false;
  }
}
