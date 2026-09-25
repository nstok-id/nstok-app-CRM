import { pgTable, text, timestamp, boolean, integer, numeric } from 'drizzle-orm/pg-core';

// Multi-tenant Org
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Users
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Customer DB (Shared with POS)
export const customers = pgTable('customers', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  address: text('address'),
  loyaltyPoints: integer('loyalty_points').default(0).notNull(),
  totalSpent: numeric('total_spent', { precision: 14, scale: 2 }).default('0').notNull(),
  segment: text('segment', { enum: ['CHAMPION', 'LOYAL', 'POTENTIAL', 'AT_RISK', 'NEW'] }).default('NEW').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// WAHA Multi-Tenant Sessions
export const wahaSessions = pgTable('waha_sessions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).unique().notNull(),
  sessionName: text('session_name').notNull(),
  status: text('status', { enum: ['STOPPED', 'STARTING', 'SCAN_QR_CODE', 'WORKING', 'FAILED'] }).default('STOPPED').notNull(),
  qrCodeUrl: text('qr_code_url'),
  phoneConnected: text('phone_connected'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2-Way WhatsApp & Omnichannel Messages
export const crmMessages = pgTable('crm_messages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  customerId: text('customer_id').references(() => customers.id, { onDelete: 'cascade' }).notNull(),
  direction: text('direction', { enum: ['INBOUND', 'OUTBOUND'] }).notNull(),
  messageText: text('message_text').notNull(),
  mediaUrl: text('media_url'),
  status: text('status', { enum: ['PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'] }).default('SENT').notNull(),
  wahaMessageId: text('waha_message_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Sales & Customer Deals Pipeline
export const crmDeals = pgTable('crm_deals', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  customerId: text('customer_id').references(() => customers.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  value: numeric('value', { precision: 14, scale: 2 }).default('0').notNull(),
  stage: text('stage', { enum: ['LEAD', 'CONTACTED', 'QUOTATION', 'WON', 'LOST'] }).default('LEAD').notNull(),
  assignedUserId: text('assigned_user_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
