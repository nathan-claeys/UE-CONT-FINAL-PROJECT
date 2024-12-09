import { Static, Type } from '@sinclair/typebox';

export const PurchaseSchema = Type.Object({
  userId: Type.Number(),
  itemId: Type.String(), // Adjusted to match the new `id` type
});

export const SellSchema = Type.Object({
  userId: Type.Number(),
  itemId: Type.String(), // Adjusted to match the new `id` type
});

export type PurchaseSchemaType = Static<typeof PurchaseSchema>;
export type SellSchemaType = Static<typeof SellSchema>;