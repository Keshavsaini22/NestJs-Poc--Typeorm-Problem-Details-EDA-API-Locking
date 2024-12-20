import { Event } from 'src/domain/common/event';

export class CreatePatientEvent extends Event {
  constructor(payload) {
    super(payload);
    this.type = 'hospital.patient.create-patient';
  }
  getBody() {
    return {
      data: this.payload,
    };
  }
}
