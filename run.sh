#!/bin/bash

# Backend
echo "Starting backend..."
cd backend/demoapp
./mvnw spring-boot:run &
cd ../../

# Frontend
echo "Starting frontend..."
cd frontend/demoapp-frontend
npm install
npm run dev
