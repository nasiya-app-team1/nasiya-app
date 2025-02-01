;; NASIYA APP

# Nasiya Savdo - Qarzlarni boshqarish tizimi

Bu loyiha do'konlar uchun qarzlarni boshqarish tizimi hisoblanadi. Do'konlar o'z mijozlarining qarzlarini oson boshqarishi va kuzatib borishi mumkin.

## Texnologiyalar

- NestJS (Backend framework)
- TypeScript
- PostgreSQL (Ma'lumotlar bazasi)
- TypeORM (ORM)
- JWT (Authentication)
- Swagger (API documentation)

## O'rnatish

1. Loyihani clone qiling:

```bash
git clone <repository_url>
cd nasiyasavdo_team2
```

2. Kerakli paketlarni o'rnating:

```bash
pnpm install
```

3. `.env` faylini sozlang:

```env
API_PORT=3000
NODE_ENV=dev
DEV_DB_URL=postgres://postgres:postgres@127.0.0.1:5432/nasiyasavdo_db
PROD_DB_URL=postgres://postgres:postgres@127.0.0.1:5432/nasiyasavdo_db
ACCESS_TOKEN_KEY=your_access_token_key
ACCESS_TOKEN_TIME=24h
REFRESH_TOKEN_KEY=your_refresh_token_key
REFRESH_TOKEN_TIME=7d
```

4. PostgreSQL ma'lumotlar bazasini yarating:

```bash
createdb nasiyasavdo_db
```

5. Migratsiyalarni ishga tushiring:

```bash
pnpm run migration:run
```

6. Loyihani ishga tushiring:

```bash
pnpm run start:dev
```

## API Documentation (Swagger)

API dokumentatsiyasini ko'rish uchun loyiha ishga tushgandan so'ng quyidagi URL ga kiring:

```
http://localhost:3000/api/docs
```

## API Endpointlar

### Admin

- `POST /api/v1/admin/createAdmin` - Admin yaratish
- `POST /api/v1/admin/createStore` - Store yaratish
- `POST /api/v1/admin/signin` - Admin Tizimga kirish
- `POST /api/v1/admin/refresh-token` - Yangi token Admin uchun
- `POST /api/v1/admin/logout` - Admin Tizimdan chiqishi
- `GET /api/v1/admin` - hamma adminni olish
- `GET /api/v1/admin/{id}` - Adminlarni id si bo'yicha olish
- `PATCH /api/v1/admin/{id}` - Admin profilini o'zgartirish
- `DELETE /api/v1/admin/{id}` - Admin ni o'chirish ID si bo'yicha

### Store

- `Get /api/v1/store` - Barcha (Store)larni olish
- `Get /api/v1/store/profile` - (Store)lar profilini olish
- `Get /api/v1/store/reset-password` - Store (passcode)ni yangilash
- `POST /api/v1/store/create-passcode` - Store profile ga passcode qo'shish
- `PATCH /api/v1/store/{id}` - Store profile ni yangilash
- `DELETE /api/v1/store/{id}` - Store ni o'chirish
- `POST /api/v1/profile-image` - Store profiliga rasm qo'yish

### Payment

- `POST /api/v1/payments` - To'lov yaratish
- `GET /api/v1/payments` - Barcha to'lovlarni olish
- `GET /api/v1/payments/TotalPaymentById/{id}` - maxsus bo'lim tomonidan tuzilgan umumiy qarz
- `GET /api/v1/payment/date-range` - Sanalar oralig'ida to'lovni olish
- `GET /api/v1/payment/{id}` - ID bo'yicha to'lovni olish
- `DELETE /api/v1/payment/{id}` - To'lovni o'chirish
- `GET /api/v1/payment/type/{type}` - To'lovlarni turlari bo'yicha olish
- `GET /api/v1/payments/debt/{debtId}` - ??
- `PATCH /api/v1/payment/{id}/type` - To'lov turini o'zgartirish

### Dept

- `POST /api/v1/debt` - Qarz yaratish
- `GET /api/v1/debt` - Barcha qarzlarni olish
- `GET /api/v1/debt/find-pagination` - Pagination/filter
- `GET /api/v1/debt/{id}` - Qarzlarni ID si bo'yicha olish
- `PATCH /api/v1/debt/{id}` - Qarzlarni o'zgartirish
- `DELETE /api/v1/debt/{id}` - Qarzlarni o'chirish ID si bo'yicha olish
- `POST /api/v1/debt/image/{id}` - rasm joylash
- `GET /api/v1/debt/image/{id}` - rasm joylash

### Debtor (Qarzdor)

- `POST /api/v1/debtors` - Yangi qarzdor qo'shish
- `GET /api/v1/debtors` - Barcha qarzdorlarni olish
- `GET /api/v1/debtors/:id` - Qarzdorni ID bo'yicha olish
- `PATCH /api/v1/debtors/:id` - Qarzdor ma'lumotlarini yangilash
- `POST /api/v1/debtors/upload/:id` - Qarzdor rasmini yuklash
- `POST /api/v1/debtors/phone` - Qarzdorga telefon raqam qo'shish
- `DELETE /api/v1/debtors/phone/:id` - Qarzdor telefon raqamini o'chirish

### Authentication

- `POST /api/v1/auth/login` - Tizimga kirish
- `POST /api/v1/auth/register` - Ro'yxatdan o'tish
- `POST /api/v1/auth/refresh` - Access tokenni yangilash
- `POST /api/v1/auth/logout` - Tizimdan chiqish

### Like

- `GET /api/v1/likes/toggleLike/{id}` - Like qo'yish
- `GET /api/v1/likes/StoreAllLike` - Barcha like bosgan do'konlarni olish
- `GET /api/v1/likes/{id}` - Like bosilganlarni ID si bo'yicha olish

### Messages

- `POST /api/v1/messages` - Yangi xabar yuborish
- `GET /api/v1/messages` - Barcha xabarlarni olish
- `GET /api/v1/messages/:id` - Xabarni ID bo'yicha olish
- `PATCH /api/v1/messages/{id}` - Bitta ID si bo'yicha xabarni yangilash
- `DELETE /api/v1/messages/:id` - Xabarni o'chirish

### Sample Message

- `POST /api/v1/sample-message` - Namuna xabari yaratish
- `GET /api/v1/sample-message` - Barcha Namuna xabarini olish
- `GET /api/v1/sample-message/{id}` - Bitta ID si bo'yicha namuna xabarini olish
- `PATCH /api/v1/sample-message/{id}` - Bitta ID si bo'yicha namuna xabarini yangilash
- `DELETE /api/v1/sample-message/{id}` - Bitta ID si bo'yicha namuna xabarini o'chirish

## Ma'lumotlar modeli

### Admin

```typescript
{
  id: UUID,
  username: string,
  hashed_password: string,
  phone_number: string,
  role: string
}
```

### Dept image

```typescript
{
  id: UUID,
  image: string,
  dept_id: string,
  dept: string
}
```

### Deptor image

```typescript
{
  id: UUID,
  image: string,
  deptor_id: UUID,
  deptor: string
}
```

### Like

```typescript
{
  id: UUID,
  store_id: string,
  deptor_id: string
}
```

### Payment

```typescript
{
  id: UUID,
  dept_id: string,
  sum: number,
  date: Date,
  type: enum
}
```

### Store

```typescript
{
  id: UUID,
  full_name: string,
  login: string,
  hashed_password: string,
  wallet: number,
  image: string,
  email: string,
  phone_number: string,
  passcode: string,
}
```

### Debtor (Qarzdor)

```typescript
{
  id: UUID,
  full_name: string,
  phone_number: string,
  image: string,
  address: string,
  note: string,
  store_id: string,
  is_active: boolean
}
```

### DebtorPhone (Qarzdor telefon raqamlari)

```typescript
{
  id: UUID,
  debtor_id: UUID,
  phone_number: string,
  is_active: boolean,
  created_at: timestamp,
  updated_at: timestamp
}
```

### Message (Xabarlar)

```typescript
{
  id: UUID,
  store_id: string,
  debtor_id: string,
  message: string,
  sample_message_id: string
  created_at: timestamp,
  updated_at: timestamp
}
```

### Sample-Message

```typescript
{
  id: UUID,
  store_id: string,
  sample: string,
  stores: string,
  message: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

## Postman Collection

Loyiha bilan birga `Nasiya_Savdo.postman_collection.json` fayli ham mavjud. API ni test qilish uchun:

1. Postman dasturini oching
2. Import -> File -> `Nasiya_Savdo.postman_collection.json` ni tanlang
3. Environmentni sozlang:
   - `base_url`: `http://localhost:3000/api/v1`
   - `token`: Login qilgandan keyin olingan JWT token

## Xavfsizlik

- Barcha endpointlar JWT authentication talab qiladi (login va register bundan mustasno)
- Tokenlar 24 soatdan keyin eskiradi
- Refresh token orqali yangi access token olish mumkin

## Error Handling

API barcha xatolarni quyidagi formatda qaytaradi:

```json
{
  "statusCode": number,
  "message": string,
  "error": string
}
```

## Transactional Operations

Barcha muhim operatsiyalar (create, update, delete) transactional ravishda bajariladi, ya'ni:

- Agar operatsiya muvaffaqiyatli bajarilsa, barcha o'zgarishlar saqlanadi
- Agar xatolik yuz bersa, barcha o'zgarishlar bekor qilinadi

## Test qilish

```bash
# unit testlarni ishga tushirish
pnpm run test

# e2e testlarni ishga tushirish
pnpm run test:e2e

# test qamrovini tekshirish
pnpm run test:cov
```
