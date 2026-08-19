# TMailNest

> **A lightweight, real-time temporary email service built with the MERN stack.**
Live Demo: https://tmailnest.com

TMailNest allows users to instantly generate temporary email addresses and receive emails without exposing their personal email address.

---

## ✨ Features

* 📧 **Instant Temporary Email**

  * Generate a temporary email address without registration.
  * Use the address to receive emails from external services.

* 📥 **Real-Time Inbox**

  * Incoming emails appear automatically without manually refreshing the page.
  * Uses WebSocket-based communication for real-time updates.

* ⏳ **Auto-Expiring Emails**

  * Temporary email data is automatically removed after its configured lifetime.
  * Helps prevent unnecessary storage accumulation.

* 📎 **Attachment Support**

  * Supports receiving and processing email attachments.
  * Email content and attachments are parsed on the backend.

* 🔒 **Privacy-Oriented**

  * No traditional user account is required.
  * Designed for short-lived email communication.

* 📱 **Responsive UI**

  * Works across desktop and mobile screen sizes.

* 🐳 **Dockerized Deployment**

  * Services can be containerized for easier deployment and development.

* 🌐 **Production Deployment**

  * Designed to run behind Nginx on a Linux-based VPS.

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       Internet       │
                         └──────────┬───────────┘
                                    │
                                    │ SMTP
                                    ▼
                         ┌──────────────────────┐
                         │   Mail Server        │
                         │   Postfix / SMTP     │
                         └──────────┬───────────┘
                                    │
                                    │ Mailbox
                                    ▼
                         ┌──────────────────────┐
                         │   Mail Processor     │
                         │                      │
                         │ • Read incoming mail │
                         │ • Parse MIME         │
                         │ • Extract content    │
                         │ • Process attachments│
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Backend API     │
                         │      Node.js         │
                         │      Express.js      │
                         └───────┬───────┬──────┘
                                 │       │
                         WebSocket│       │HTTP
                                 │       │
                    ┌────────────▼───┐   │
                    │   Real-Time    │   │
                    │   Updates      │   │
                    └────────────┬───┘   │
                                 │       │
                                 ▼       ▼
                         ┌──────────────────────┐
                         │     React Client     │
                         └──────────────────────┘

                              │
                              ▼
                         ┌──────────────┐
                         │   Database   │
                         └──────────────┘
```

---

## 🔄 How TMailNest Works

### 1. Generate Temporary Email

The user opens TMailNest and generates a temporary email address.

```text
User
  │
  ▼
TMailNest Frontend
  │
  ▼
Backend API
  │
  ▼
Temporary Email Address
```

The generated address is associated with a temporary mailbox.

### 2. External Sender Sends Email

An external service sends an email to the generated address.

```text
External Service
       │
       │ SMTP
       ▼
    Postfix
       │
       ▼
 Temporary Mailbox
```

### 3. Email Processing

The backend mail-processing service monitors incoming mail and processes the message.

It can extract information such as:

* Sender
* Recipient
* Subject
* Text content
* HTML content
* Attachments
* Message metadata

### 4. Store Email

Processed email information is stored so that the frontend can retrieve and display it.

### 5. Real-Time Notification

When a new email arrives, the backend sends a real-time event to the connected client.

```text
Incoming Email
      │
      ▼
Mail Processor
      │
      ▼
Backend
      │
      │ WebSocket
      ▼
React Client
      │
      ▼
Inbox Updated
```

The user can therefore see new emails without refreshing the page.

### 6. Expiration

Temporary mailboxes and their associated data are removed after their expiration period.

This keeps the service lightweight and prevents temporary data from remaining indefinitely.

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript / TypeScript
* HTML
* CSS
* WebSocket client

### Backend

* Node.js
* Express.js
* WebSocket / Socket.IO
* REST APIs

### Database

* MongoDB

### Email Infrastructure

* Postfix
* SMTP
* Mailbox / Maildir processing
* MIME email parsing

### DevOps

* Docker
* Docker Compose
* Nginx
* Linux VPS

---

# 🌐 Production Deployment

A typical production deployment can be structured as:

```text
                    Internet
                       │
                       ▼
                    Nginx
                  /        \
                 /          \
                ▼            ▼
          React Client    Node.js API
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
                 MongoDB          Mail Processor
                                        │
                                        ▼
                                     Postfix
                                        │
                                        ▼
                                  Incoming Emails
```

Nginx acts as the reverse proxy and can handle:

* HTTP/HTTPS traffic
* Frontend routing
* Backend API proxying
* WebSocket proxying
* TLS termination

---

# ⚡ Real-Time Communication

One of the important parts of TMailNest is the real-time inbox.

Instead of repeatedly polling the backend:

```text
Client ──► API
Client ──► API
Client ──► API
Client ──► API
```

TMailNest maintains a real-time connection:

```text
Client ◄════════ WebSocket ═══════► Server
                                      │
                                      ▼
                                 New Email
```

When an email arrives, the server can notify the appropriate connected client immediately.

This reduces unnecessary polling and provides a better user experience.

---

# 📧 Email Processing

The email-processing pipeline is responsible for converting raw incoming email data into application-readable information.

```text
Raw Email
   │
   ▼
MIME Parser
   │
   ├── Sender
   ├── Recipient
   ├── Subject
   ├── Text
   ├── HTML
   └── Attachments
           │
           ▼
      Application Data
```

This allows the frontend to display incoming messages in a structured inbox.

---

# 🧹 Temporary Data Lifecycle

TMailNest is designed around short-lived email data.

```text
Create Email
     │
     ▼
Receive Messages
     │
     ▼
Store Temporarily
     │
     ▼
Expiration Time
     │
     ▼
Cleanup
     │
     ▼
Data Removed
```

Automatic cleanup is important because temporary email systems can receive a large number of messages over time.

TMailNest — A full-stack temporary email service built to explore real-world email infrastructure and scalable web application development.
