import { Injectable } from '@nestjs/common';

export interface MetaAdsLeadEvent {
  campaignId: string;
  leadId: string;
  name: string;
  phone: string;
}

@Injectable()
export class MetaAdsService {
  private readonly events: MetaAdsLeadEvent[] = [];

  ingestLead(event: MetaAdsLeadEvent) {
    this.events.push(event);
    return { status: 'accepted', event };
  }

  listLeads() {
    return this.events;
  }
}
