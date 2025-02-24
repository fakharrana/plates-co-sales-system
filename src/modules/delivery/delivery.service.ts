import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryService {
  calculateCharge(subtotal: number): number {
    if (subtotal >= 90) return 0;
    if (subtotal >= 50) return 2.95;
    return 4.95;
  }
}
