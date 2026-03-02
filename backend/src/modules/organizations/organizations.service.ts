import { Injectable } from '@nestjs/common';

export interface OrganizationRecord {
  id: string;
  name: string;
  code: string;
  ownerTenantId?: string;
}

@Injectable()
export class OrganizationsService {
  private readonly records: OrganizationRecord[] = [];

  findAll(ownerTenantId?: string) {
    return this.records.filter((record) => !ownerTenantId || record.ownerTenantId === ownerTenantId);
  }

  create(input: Omit<OrganizationRecord, 'id'>) {
    const record: OrganizationRecord = {
      id: `org_${this.records.length + 1}`,
      ...input,
    };

    this.records.push(record);

    return record;
  }
}
