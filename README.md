# Hello World Docker App

A minimal hello world application with frontend and backend, containerized with Docker.

## Project Structure

```
hello-world-docker/
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── public/
│       └── index.html
```

## Quick Start

### Using Docker Compose (Recommended)

```bash
docker-compose up --build
```

Then open:
- **Frontend:** http://localhost
- **Backend API:** http://localhost:5000/api/hello

### Stop Services

```bash
docker-compose down
```

## Services

- **Backend:** Node.js Express server on port 5000
- **Frontend:** Nginx server on port 80

## API Endpoints

- `GET /api/hello` - Returns hello message
- `GET /api/status` - Returns backend status
