import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Database, Table, Key, Link } from 'lucide-react';

const prismaSchema = `// ============================================================================
// ExpenseTrack Pro — Complete Prisma Schema
// Database: PostgreSQL
// ============================================================================

// ─── ENUMS ──────────────────────────────────────────────────────────────────

enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}

enum BudgetStatus {
  ACTIVE
  INACTIVE
  ARCHIVED
}

enum WarrantyStatus {
  ACTIVE
  EXPIRED
  CLAIMED
}

enum ReminderFrequency {
  DAILY
  WEEKLY
  MONTHLY
  ONCE
}

enum ImageType {
  BILL
  SHOP
  RECEIPT
  WARRANTY
}

// ─── USER & AUTH ────────────────────────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String
  role          UserRole  @default(USER)
  avatar        String?
  preferences   Json?     // Theme, language, notifications
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  shops         Shop[]
  bills         Bill[]
  budgets       Budget[]
  warranties    Warranty[]
  images        Image[]
  reminders     Reminder[]
  sessions      Session[]
  permissions   Permission[]

  @@index([email])
  @@index([role])
  @@map("users")
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([token])
  @@map("sessions")
}

model Permission {
  id          String  @id @default(cuid())
  userId      String
  resource    String  // e.g., "shops", "bills", "budgets"
  action      String  // e.g., "create", "read", "update", "delete"
  granted     Boolean @default(true)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, resource, action])
  @@index([userId])
  @@map("permissions")
}

// ─── SHOPS & TAGS ───────────────────────────────────────────────────────────

model Tag {
  id        String   @id @default(cuid())
  name      String
  color     String   @default("#3b82f6")
  createdAt DateTime @default(now())

  shops Shop[]

  @@unique([name])
  @@map("tags")
}

model Shop {
  id          String    @id @default(cuid())
  name        String
  description String?
  address     String?
  latitude    Float?
  longitude   Float?
  phone       String?
  website     String?
  isArchived  Boolean   @default(false)
  userId      String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  tags        ShopTag[]
  bills       Bill[]
  images      Image[]
  billItems   BillItem[]

  @@index([userId])
  @@index([name])
  @@index([isArchived])
  @@index([userId, isArchived])
  @@map("shops")
}

model ShopTag {
  shopId String
  tagId  String

  shop Shop @relation(fields: [shopId], references: [id], onDelete: Cascade)
  tag  Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([shopId, tagId])
  @@index([tagId])
  @@map("shop_tags")
}

// ─── CATEGORIES & ITEMS ─────────────────────────────────────────────────────

model Category {
  id          String   @id @default(cuid())
  name        String
  description String?
  icon        String?
  parentId    String?
  createdAt   DateTime @default(now())

  // Self-referencing for subcategories
  parent      Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryTree")
  items       Item[]

  @@unique([name])
  @@index([parentId])
  @@map("categories")
}

model Item {
  id          String    @id @default(cuid())
  name        String
  description String?
  unit        String    @default("piece") // piece, kg, liter, etc.
  categoryId  String?
  barcode     String?   @unique
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  category  Category?  @relation(fields: [categoryId], references: [id])
  billItems BillItem[]
  warranties Warranty[]

  @@index([name])
  @@index([categoryId])
  @@index([barcode])
  @@map("items")
}

// ─── BILLING ────────────────────────────────────────────────────────────────

model Bill {
  id          String    @id @default(cuid())
  billNumber  String?
  shopId      String
  userId      String
  date        DateTime
  totalAmount Float
  discount    Float     @default(0)
  tax         Float     @default(0)
  notes       String?
  csvSource   Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  shop    Shop       @relation(fields: [shopId], references: [id], onDelete: Cascade)
  user    User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  items   BillItem[]
  images  Image[]

  @@index([shopId])
  @@index([userId])
  @@index([date])
  @@index([userId, date])
  @@index([shopId, date])
  @@map("bills")
}

model BillItem {
  id         String  @id @default(cuid())
  billId     String
  itemId     String
  shopId     String  // Denormalized for faster price comparison queries
  quantity   Float
  unitPrice  Float
  discount   Float   @default(0)
  totalPrice Float   // Computed: quantity * unitPrice - discount
  createdAt  DateTime @default(now())

  bill  Bill  @relation(fields: [billId], references: [id], onDelete: Cascade)
  item  Item  @relation(fields: [itemId], references: [id])
  shop  Shop  @relation(fields: [shopId], references: [id], onDelete: Cascade)

  @@index([billId])
  @@index([itemId])
  @@index([shopId])
  @@index([itemId, shopId])
  @@index([itemId, billId])
  @@map("bill_items")
}

// ─── BUDGETS ────────────────────────────────────────────────────────────────

model Budget {
  id          String       @id @default(cuid())
  name        String
  amount      Float
  spent       Float        @default(0)
  currency    String       @default("USD")
  status      BudgetStatus @default(INACTIVE)
  startDate   DateTime
  endDate     DateTime
  userId      String
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
  @@index([userId, status])
  @@index([startDate, endDate])
  @@map("budgets")
}

// ─── WARRANTIES & REMINDERS ─────────────────────────────────────────────────

model Warranty {
  id           String         @id @default(cuid())
  itemId       String
  userId       String
  purchaseDate DateTime
  expiryDate   DateTime
  handler      String?        // Store/manufacturer contact
  receipt      String?        // Reference to image
  status       WarrantyStatus @default(ACTIVE)
  notes        String?
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt

  item      Item       @relation(fields: [itemId], references: [id])
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  reminders Reminder[]

  @@index([userId])
  @@index([itemId])
  @@index([expiryDate])
  @@index([status])
  @@index([userId, status, expiryDate])
  @@map("warranties")
}

model Reminder {
  id          String             @id @default(cuid())
  warrantyId  String
  userId      String
  title       String
  message     String?
  frequency   ReminderFrequency
  nextTrigger DateTime
  isActive    Boolean            @default(true)
  createdAt   DateTime           @default(now())

  warranty Warranty @relation(fields: [warrantyId], references: [id], onDelete: Cascade)
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([warrantyId])
  @@index([nextTrigger])
  @@index([isActive, nextTrigger])
  @@map("reminders")
}

// ─── MEDIA / IMAGES ─────────────────────────────────────────────────────────

model Image {
  id          String    @id @default(cuid())
  url         String
  thumbnailUrl String?
  altText     String?
  type        ImageType
  billId      String?
  shopId      String?
  userId      String
  fileSize    Int?      // in bytes
  mimeType    String?
  createdAt   DateTime  @default(now())

  bill Bill? @relation(fields: [billId], references: [id], onDelete: SetNull)
  shop Shop? @relation(fields: [shopId], references: [id], onDelete: SetNull)
  user User  @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([type])
  @@index([billId])
  @@index([shopId])
  @@index([userId, type])
  @@map("images")
}`;

function highlightPrisma(code: string): string {
  return code
    .replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>')
    .replace(/\b(model|enum)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/\b(String|Int|Float|Boolean|DateTime|Json)\b/g, '<span class="token-type">$1</span>')
    .replace(/\b(UserRole|BudgetStatus|WarrantyStatus|ReminderFrequency|ImageType)\b/g, '<span class="token-type">$1</span>')
    .replace(/@(\w+)/g, '<span class="token-decorator">@$1</span>')
    .replace(/"([^"]*)"/g, '<span class="token-string">"$1"</span>')
    .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>')
    .replace(/(\{|\}|\[|\])/g, '<span class="token-bracket">$1</span>');
}

export function DatabaseSchema() {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prismaSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const models = [
    { name: 'User', fields: 10, relations: 7, indexes: 2 },
    { name: 'Session', fields: 5, relations: 1, indexes: 2 },
    { name: 'Permission', fields: 5, relations: 1, indexes: 2 },
    { name: 'Tag', fields: 4, relations: 1, indexes: 1 },
    { name: 'Shop', fields: 10, relations: 4, indexes: 4 },
    { name: 'ShopTag', fields: 2, relations: 2, indexes: 1 },
    { name: 'Category', fields: 6, relations: 3, indexes: 1 },
    { name: 'Item', fields: 7, relations: 3, indexes: 3 },
    { name: 'Bill', fields: 11, relations: 4, indexes: 5 },
    { name: 'BillItem', fields: 8, relations: 3, indexes: 5 },
    { name: 'Budget', fields: 9, relations: 1, indexes: 4 },
    { name: 'Warranty', fields: 10, relations: 3, indexes: 5 },
    { name: 'Reminder', fields: 8, relations: 2, indexes: 4 },
    { name: 'Image', fields: 11, relations: 3, indexes: 5 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
            <Database className="w-6 h-6" />
            Database Schema (Prisma)
          </h2>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
            Complete PostgreSQL schema with 14 models, optimized indexes, and normalized relations
          </p>
        </div>
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all"
          style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Schema'}
        </motion.button>
      </div>

      {/* Model Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {models.slice(0, 7).map((model, i) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-3 rounded-xl border text-center"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Table className="w-3 h-3 text-primary-500" />
              <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{model.name}</span>
            </div>
            <div className="flex justify-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span title="Fields"><Key className="w-3 h-3 inline" />{model.fields}</span>
              <span title="Relations"><Link className="w-3 h-3 inline" />{model.relations}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {models.slice(7).map((model, i) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i + 7) * 0.03 }}
            className="p-3 rounded-xl border text-center"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Table className="w-3 h-3 text-primary-500" />
              <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{model.name}</span>
            </div>
            <div className="flex justify-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span title="Fields"><Key className="w-3 h-3 inline" />{model.fields}</span>
              <span title="Relations"><Link className="w-3 h-3 inline" />{model.relations}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Design Decisions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Normalization', desc: '4NF compliance with proper FK constraints, cascade deletes, and composite keys (ShopTag)', icon: '🔗' },
          { title: 'Strategic Indexing', desc: '43+ indexes optimized for price comparison queries, date ranges, and search operations', icon: '⚡' },
          { title: 'Denormalization', desc: 'BillItem.shopId for O(1) price lookups without JOIN — trade-off for read performance', icon: '📊' },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
          >
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Schema Code Block */}
      <div className="relative">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-slate-300">schema.prisma</span>
        </div>
        <div 
          className={`code-block ${showFull ? '' : 'max-h-[500px] overflow-hidden'}`}
          style={{ position: 'relative' }}
        >
          <pre className="whitespace-pre-wrap">
            <code dangerouslySetInnerHTML={{ __html: highlightPrisma(prismaSchema) }} />
          </pre>
          {!showFull && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent flex items-end justify-center pb-4">
              <motion.button
                onClick={() => setShowFull(true)}
                className="px-6 py-2 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--accent-gradient)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show Full Schema ↓
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* ER Diagram Summary */}
      <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
          🔑 Key Relationships & Constraints
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { from: 'User', to: 'Shop', type: '1:N', desc: 'User owns multiple shops' },
            { from: 'Shop', to: 'Bill', type: '1:N', desc: 'Shop has many bills' },
            { from: 'Bill', to: 'BillItem', type: '1:N', desc: 'Bill contains multiple items' },
            { from: 'Shop', to: 'Tag', type: 'M:N', desc: 'Via ShopTag junction table' },
            { from: 'Item', to: 'Category', type: 'N:1', desc: 'Items belong to categories' },
            { from: 'Category', to: 'Category', type: '1:N', desc: 'Self-ref for subcategories' },
            { from: 'Warranty', to: 'Reminder', type: '1:N', desc: 'Warranty triggers reminders' },
            { from: 'Image', to: 'Bill/Shop', type: 'N:1', desc: 'Polymorphic image ownership' },
          ].map((rel, i) => (
            <motion.div
              key={`${rel.from}-${rel.to}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary-500/10 text-primary-500 font-bold">
                {rel.type}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                <strong>{rel.from}</strong> → <strong>{rel.to}</strong>
              </span>
              <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>{rel.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
