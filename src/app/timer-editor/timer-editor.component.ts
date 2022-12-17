import { 
  Component, Input, Output, EventEmitter, ViewChild, ElementRef 
} from '@angular/core';
import { TimerTime } from '../types/TimerTime';



@Component({
  selector: 'app-timer-editor',
  templateUrl: './timer-editor.component.html',
  styleUrls: ['./timer-editor.component.css']
})
export class TimerEditorComponent {
  @Input() isShowing:boolean = false;
  @Output() onToggle = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<TimerTime>();

  @Input() currentTime:number = 0;
  @ViewChild("inpHours", {static: false}) inpHours: ElementRef | undefined;

  public hours: string = "";
  public minutes: string = "";
  public seconds: string = "";

  isHoursValid: boolean = true;
  isMinutesValid: boolean = true;
  isSecondsValid: boolean = true;

  isFormValid: boolean = true;

  ngAfterViewInit(){
    this.onToggle.emit(this.isShowing);
  }

  toggle(){
    this.isShowing = !this.isShowing;
    this.checkFocusOnHoursInput();
    this.onToggle.emit(this.isShowing);
  }

  show(){
    this.isShowing = true;
    this.onToggle.emit(this.isShowing);
    
    this.checkFocusOnHoursInput();
  }

  hide(){
    this.isShowing = false;
    this.onToggle.emit(this.isShowing);
  }

  save(){
    this.checkForm();
    
    if(!this.isFormValid)
      return;

    this.toggle();

    this.onSave.emit({
      hours: (parseInt(this.hours) < 10) ? `0${this.hours}` : this.hours,
      minutes: (parseInt(this.minutes) < 10) ? `0${this.minutes}` : this.minutes,
      seconds: (parseInt(this.seconds) < 10) ? `0${this.seconds}` : this.seconds
    });
  }

  checkForm(){
    let hours: number = parseInt(this.hours);
    let minutes: number = parseInt(this.minutes);
    let seconds: number = parseInt(this.seconds);

    this.isHoursValid = !isNaN(hours) && (hours > -1 && hours < 24);
    this.isMinutesValid = !isNaN(minutes) && (minutes > -1 && minutes < 60);
    this.isSecondsValid = !isNaN(seconds) && (seconds > -1 && seconds < 60);

    this.isFormValid = (this.isHoursValid && this.isMinutesValid && this.isSecondsValid);
  }

  checkFocusOnHoursInput(){
    if(!this.isShowing)
      return;

    setTimeout(() => {
      this.inpHours?.nativeElement.focus();
    }, 1);
  }
}