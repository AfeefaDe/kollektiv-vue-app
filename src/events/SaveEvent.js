import { BaseEvent } from './BaseEvent'

export class SaveEvent extends BaseEvent {
  static START_SAVING = 'KSaveIndicatorEvent:start'
  static STOP_SAVING = 'KSaveIndicatorEvent:stop'
}
