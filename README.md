# Finance Dashboard Backend

Tech stack - Node.js + Express + MongoDB backend for finance data processing and access control.

## Folder Structure
```
/controllers      # Route handlers
/models           # Mongoose schemas
/routes           # Express routers
/services         # Business logic
/middleware       # Auth, role, error handling
/utils            # Utilities (pagination)
app.js            # Main entry
.env              # Environment config
```

## 1.Features
- User management (CRUD, roles, active status)
- Financial records CRUD, filtering, pagination, soft delete
- Dashboard summary (income, expense, net, category breakdown, recent)
- Role-based access control (viewer, analyst, admin)
- Input validation and error handling
- Mock authentication via `x-user-id` header

## 2.Example API Responses

### Create User (Admin only)
```
POST /users
{
  "name": "likhith",
  "email": "likkie@gmail.com",
  "role": "sde"
}
Response: 201 Created
{
  "_id": "...",
  "name": "kumar",
  "email": "Kumar@gmail.com",
  "role": "Backend",
  "isActive": true
}
```

### List Users (Admin only)
```
GET /users
Response: 200 OK
[
  { "_id": "...", "name": "likki", "role": "sde", ... }
]
```

### Create Record (Admin only)
```
POST /records
{
  "amount": 1000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-05",
  "notes": "April salary"
}
Response: 201 Created
{
  "_id": "...",
  "amount": 1000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-05T00:00:00.000Z",
  "notes": "April salary",
  "createdBy": "..."
}
```

### List Records (All roles)
```
GET /records?type=income&category=Salary&page=1&limit=10
Response: 200 OK
{
  "records": [ ... ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### Dashboard Summary (Analyst/Admin)
```
GET /dashboard/summary
Response: 200 OK
{
  "totalIncome": 1000,
  "totalExpense": 500,
  "netBalance": 500,
  "categoryTotals": { "salary": 1000, "food": 500 },
  "recent": [ ... ]
}
```

## 3.Setup
1. `npm install`
2. Set up MongoDB (default: `mongodb://localhost:27017/finance`)
3. `npm start`
4. Use `x-user-id` header for mock auth

