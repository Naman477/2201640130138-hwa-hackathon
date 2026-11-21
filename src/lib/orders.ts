import fs from 'fs';
import path from 'path';
import { Order } from './types';

const dataDir = path.join(process.cwd(), 'data');
const ordersFilePath = path.join(dataDir, 'orders.json');

// In-memory fallback for serverless environments where filesystem may be ephemeral or read-only
let memoryOrders: Order[] = [];

function ensureDataFile() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(ordersFilePath)) {
      fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('Could not initialize orders file on disk, using memory storage:', err);
  }
}

export function getAllOrders(): Order[] {
  try {
    ensureDataFile();
    if (fs.existsSync(ordersFilePath)) {
      const content = fs.readFileSync(ordersFilePath, 'utf-8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading orders from disk, falling back to memory:', err);
  }
  return memoryOrders;
}

export function saveOrder(order: Order): Order {
  try {
    ensureDataFile();
    const existing = getAllOrders();
    const updated = [order, ...existing.filter((o) => o.id !== order.id)];

    try {
      fs.writeFileSync(ordersFilePath, JSON.stringify(updated, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Could not write orders file, updating in-memory store:', fsErr);
    }

    memoryOrders = updated;
  } catch (err) {
    console.warn('Error saving order, keeping in memory:', err);
    memoryOrders = [order, ...memoryOrders.filter((o) => o.id !== order.id)];
  }
  return order;
}

export function getOrderById(id: string): Order | null {
  const all = getAllOrders();
  const found = all.find((o) => o.id.toLowerCase() === id.trim().toLowerCase());
  return found || null;
}
