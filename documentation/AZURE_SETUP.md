# Azure Deployment & Configuration Guide

Denna dokumentation beskriver hur **Chas Advance Grupp 5 – Backend API** är konfigurerat, deployat och driftas i **Microsoft Azure**.  
Systemet använder **Azure App Service** för applikationsdrift och **Azure Database for PostgreSQL Flexible Server** som databas.  
Deploy sker automatiskt via **GitHub Actions med OpenID Connect (OIDC)**, vilket eliminerar behovet av att hantera hemliga publish-profiler.

---

## 1. Översikt

| Komponent | Tjänst | Syfte |
|------------|--------|-------|
| App Service | Azure App Service (Node.js 22) | Drift av backend-API |
| Database | Azure Database for PostgreSQL Flexible Server | Databas för användare, paket, sensorer och loggar |
| CI/CD | GitHub Actions (OpenID Connect) | Säker automatisk testning och deployment |
| Logging | Azure Log Stream + Winston | Samlad loggning och övervakning |

---

## 2. Azure App Service

### 2.1 Beskrivning
Appen körs som en Node.js 22-applikation på Azure App Service.  
Startkommando är `npm start`, och porten sätts automatiskt av Azure genom miljövariabeln `PORT`.

### 2.2 Viktiga inställningar

| Inställning | Värde / Kommentar |
|--------------|------------------|
| Runtime Stack | Node.js 22 LTS |
| Startkommando | `npm start` |
| Deploy-metod | GitHub Actions (OIDC) |
| Health check | `/health` endpoint |
| Loggar | Winston + Azure log stream |
| Miljövariabler | Hanteras via Azure Portal → Configuration |

### 2.3 Miljövariabler (Application Settings)
Miljövariabler sätts i **Azure Portal → App Service → Configuration → Application settings**:

| Key | Value |
|------|-------|
| `PORT` | `3000` *(kan lämnas tom – Azure hanterar port automatiskt)* |
| `JWT_SECRET` | Hemlig nyckel för JWT-signering |
| `DB_SERVER` | `team-5-pg-server.postgres.database.azure.com` |
| `DB_NAME` | `team-5-db` |
| `DB_USER` | `team5` |
| `DB_PASSWORD` | Lösenord för databasanslutning |
| `DB_PORT` | `5432` |
| `DBSSLMODE` | `require` |
| `NODE_ENV` | `production` |

---

## 3. Azure Database for PostgreSQL Flexible Server

### 3.1 Databasöversikt
Databasen hanterar alla applikationsdata, inklusive:
- användare (`users`)
- paket (`packages`)
- sensorloggar (`sensor_logs`)
- lastbilar (`trucks`)
- notifieringar (`notifications`)

### 3.2 Anslutning (db.js)
Applikationen ansluter via `pg.Pool()` med SSL-krav.

```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});
