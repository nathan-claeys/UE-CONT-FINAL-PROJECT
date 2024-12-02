import { Static, Type } from '@sinclair/typebox';

export const PurchaseSchema = Type.Object({
  userId: Type.Number(),
  itemId: Type.Number(),
  type: Type.String({ enum: ['creature', 'gadget'] })
});

export const SellSchema = Type.Object({
  userId: Type.Number(),
  itemId: Type.Number(),
  type: Type.String({ enum: ['creature', 'gadget'] })
});

export type PurchaseSchemaType = Static<typeof PurchaseSchema>;
export type SellSchemaType = Static<typeof SellSchema>;
