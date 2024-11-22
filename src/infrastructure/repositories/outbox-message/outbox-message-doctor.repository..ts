import { Injectable } from '@nestjs/common';
import { Event } from 'src/domain/common/event';
import { OutboxMessageDoctor } from 'src/domain/outbox-message-doctor/outbox-message-doctor.entity';
import { OutBoxStatus } from 'src/domain/outbox-message-patient/enums/status.enum';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class OutboxMessageDoctorRepository extends Repository<OutboxMessageDoctor> {
  constructor(dataSource: DataSource) {
    super(OutboxMessageDoctor, dataSource.createEntityManager());
  }
  createOutboxPayloadFromEvent = (
    outbox_message: Event,
  ): OutboxMessagePayloadType => {
    return {
      message_id: outbox_message.getId(),
      type: outbox_message.getType(),
      properties: outbox_message.getProperties(),
      headers: outbox_message.getHeaders(),
      body: outbox_message.getPayload(),
    };
  };

  async storeOutboxMessage(
    outbox_message: Event,
    transactionalEntityManager: EntityManager,
  ) {
    return await transactionalEntityManager.save(
      OutboxMessageDoctor,
      this.createOutboxPayloadFromEvent(outbox_message),
    );
  }

  async getUnsentMessages(limit: number) {
    const [data, total] = await this.findAndCount({
      where: { status: OutBoxStatus.PENDING },
      take: limit,
    });
    return { data, total };
  }
}
