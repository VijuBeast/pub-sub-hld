
# Microservices Architecture with Redis Pub/Sub

This project consists of two microservices:
1. **Receiver Service**: Accepts API requests and publishes messages to Redis.
2. **Listener Service**: Subscribes to Redis channels and processes messages.

---

## **Architecture Overview**

1. **Receiver Service**:
   - Exposes an API endpoint (\`/receiver\`) to receive messages.
   - Publishes messages to a Redis channel (\`user_channel\`).

2. **Listener Service**:
   - Subscribes to \`user_channel\`.
   - Processes incoming messages asynchronously.

---

## **Technologies Used**
- Node.js
- Redis (Pub/Sub)
- Docker
- AWS ECS Fargate - (Working)
- AWS Elastic Container Registry (ECR) - (Working)

---

## **Setup and Deployment**

### **1. Clone the Repository**
\`\`\`sh
git clone https://github.com/VijuBeast/pub-sub-hld.git
cd pub-sub-hld
\`\`\`

---

### **2. Environment Variables**
Create a \`.env\` file in both **Receiver** and **Listener** directories:

\`\`\`env
REDIS_HOST=redis
REDIS_PORT=6379
PORT=3000  # Only for Receiver Service
\`\`\`

---

### **3. Running Locally**


#### **Run Receiver Service**
\`\`\`sh
cd receiver-service
npm install
node server.js
docker-compose up --build
\`\`\`

#### **Run Listener Service**
\`\`\`sh
cd listener-service
npm install
node listener.js
docker-compose up --build
\`\`\`


## **API Documentation**

### **Receiver Service**
#### **Endpoint: \`POST /receiver\`**
- **Description**: Publishes a message to Redis.
- **Request Body**:
\`\`\`json
{
  "user": "Harry Potter",
  "class": "Comics",
  "age": 22,
  "email": "harry@potter.com"
}
\`\`\`
- **Response**:
\`\`\`json
{
    "message": "Data saved and published successfully.",
    "data": {
        "id": "a691b83d-232a-4f23-8b77-f19f8e454a27",
        "user": "Harry Potter 26",
        "class": "Comics",
        "age": 22,
        "email": "harry@potter.com",
        "inserted_at": "2025-01-30T05:23:19.529Z"
    }
}
\`\`\`


