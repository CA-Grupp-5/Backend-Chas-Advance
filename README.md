# Chas Advance Group 5 – Backend API

Detta projekt är ett backend-API för logistik- och transporthantering.  
Systemet hanterar paketflöden, sensorloggar (temperatur och luftfuktighet), användare, notiser, lastbilar och leveranser.  
Det är byggt med **Node.js**, **Express** och **PostgreSQL (Azure Database for PostgreSQL Flexible Server)**  
och driftas via **Azure App Service** med **CI/CD via GitHub Actions**.

---

## Teknisk översikt

| Komponent | Teknik / Tjänst |
|------------|-----------------|
| Backend | Node.js + Express |
| Databas | PostgreSQL (Azure Flexible Server) |
| Hosting | Azure App Service |
| CI/CD | GitHub Actions |
| Testning | Jest + Supertest |
| Dokumentation | Swagger (OpenAPI 3.0) |
| Loggning | Winston + Morgan |
| Autentisering | JWT + domänkontroll (allowedDomains.json) |

---

## Projektstruktur

```plaintext
src/
├── app.js                        # Express-app med middleware och routes
├── server.js                     # Startfil (port, logger)
├── config/
│   ├── db.js                     # PostgreSQL-pool
│   └── allowedDomains.json       # Lista över godkända e-postdomäner
├── controllers/
│   ├── packages/                 # Paketflöden (CRUD + status)
│   ├── sensor-logs/              # Hantering av sensorvärden
│   ├── users/                    # Login, register, autentisering
│   ├── shipments/                # Leveransdata
│   └── notifications/            # Notiser
├── routes/
│   ├── packages/                 # Alla package-relaterade endpoints
│   ├── users/                    # Login, register
│   ├── sensor-logs/              # Sensor API
│   ├── trucks/                   # Truck API
│   ├── shipments/                # Shipment API
│   └── notifications/            # Notification API
├── middleware/
│   ├── errorHandler.js           # Felhantering & not found
│   └── auth.js                   # JWT & domänkontroll
├── utilities/
│   ├── logger.js                 # Winston + morgan integration
│   └── swaggerConfig.js          # Swagger-dokumentation
tests/
├── app.login.test.js             # Login endpoint-tester
├── app.register.test.js          # Register endpoint-tester
├── app.postlogs.test.js          # Sensor-loggar tester
└── app.test.js                   # Grundläggande API-test
