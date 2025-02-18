# Implementing `If-Modified-Since` in Express.js

## Overview
This guide explains how to implement `If-Modified-Since` in an Express.js application using middleware. This helps optimize responses by sending `304 Not Modified` when data hasn't changed, reducing unnecessary data transfer.

---

## 1. Create Middleware (`middleware/ifModifiedSince.js`)
This middleware checks if the requested resource has changed since the last request.

```javascript
const moment = require("moment");

const ifModifiedSinceMiddleware = (req, res, next) => {
    const ifModifiedSince = req.headers["if-modified-since"];

    if (!ifModifiedSince) {
        return next(); // No header, continue request
    }

    const lastModified = res.getHeader("Last-Modified");

    if (lastModified && moment(lastModified).isSameOrBefore(moment(ifModifiedSince))) {
        return res.status(304).end(); // Not modified
    }

    next();
};

module.exports = ifModifiedSinceMiddleware;
```

---

## 2. Modify Handler (`handlers/healthHandler.js`)
Ensure that your handler sets the `Last-Modified` header.

```javascript
exports.health = async (req, res) => {
    const lastModified = new Date("2024-02-01T12:00:00Z"); // Change this to your real update logic

    res.setHeader("Last-Modified", lastModified.toUTCString());
    res.json({ status: "OK", lastModified });
};
```

---

## 3. Use Middleware in Routes (`routes.js`)
Include the middleware before calling the handler.

```javascript
const healthHandler = require("./handlers/healthHandler");
const ifModifiedSinceMiddleware = require("./middleware/ifModifiedSince");

module.exports = function (app) {
    app.get("/health", ifModifiedSinceMiddleware, healthHandler.health);
};
```

---

## 4. How It Works
1. **Client sends a request with `If-Modified-Since` header.**
2. **Middleware checks the last modified date:**
   - If data **has not changed**, return `304 Not Modified`.
   - If data **has changed**, proceed to the handler.
3. **Handler sets the `Last-Modified` header and returns data.**

---

## 5. Benefits
✅ **Keeps handlers clean** – Middleware handles caching logic.  
✅ **Reusable** – Can be used for multiple routes.  
✅ **Efficient** – Saves bandwidth if data hasn’t changed.  

---

## Example Request & Response

### **Request (with `If-Modified-Since`)**
```http
GET /health HTTP/1.1
If-Modified-Since: Mon, 01 Feb 2024 12:00:00 GMT
```

### **Response (if not modified)**
```http
HTTP/1.1 304 Not Modified
```

### **Response (if modified)**
```json
{
  "status": "OK",
  "lastModified": "2024-02-01T12:00:00.000Z"
}
```

---

Now you have a clean, reusable solution for handling `If-Modified-Since` in Express.js! 🚀

