# Geo-Spatial App 🚀🛰️

## Overview

This app provides endpoints for storing, updating and retrieving the spatial based multiple point and polygon data.

## Installation

To install and run the Geo-Spatial App locally, follow these steps:

1. clone the repository:

```bash
git clone https://github.com/Sourabhpoojari/geo-spatial-app.git
cd geo-spatial-app
```

2. Install dependencies:

```bash
   yarn install
```

3. Create a PostgreSQL database and enable the PostGIS extension:

```sql
    CREATE DATABASE spatial_db;
    \c spatial_db
    CREATE EXTENSION postgis;
```

4. Run build command

```bash
yarn build
```

5. Start the server:

```bash
yarn start
```

For Api documentation, please refer to the postman-collection included in the repository!
