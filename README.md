# Project Structure Guide

## Wedding LINE OA Project – MNTGT4EVER

**Version:** 1.0
**Last Updated:** August 2026

---

# ภาพรวมโปรเจกต์

โปรเจกต์นี้แบ่งออกเป็น 2 GitHub Repository โดยแต่ละ Repository มีหน้าที่ชัดเจน เพื่อให้แก้ไขและดูแลรักษาได้ง่าย

---

# Repository 1 : wedding-webhookserver-vercel

**หน้าที่**

เป็นระบบหลักของ LINE Official Account

รับ Webhook จาก LINE

ประมวลผลข้อความที่ผู้ใช้กดจาก Rich Menu

ส่ง Flex Message กลับไปยัง LINE

### โครงสร้าง

```text
wedding-webhookserver-vercel
│
├── api/
│   └── index.js
│
├── assets/
│   └── flex/
│       ├── welcome.json
│       ├── detail.json
│       ├── menu.json
│       ├── seating.json
│       ├── activity.json
│       └── gift.json
│
├── package.json
└── README.md
```

### หน้าที่ของไฟล์

| ไฟล์          | หน้าที่                              |
| ------------- | ------------------------------------ |
| api/index.js  | Webhook หลักของ LINE OA              |
| welcome.json  | Welcome Card                         |
| detail.json   | รายละเอียดงาน                        |
| menu.json     | เมนูอาหาร                            |
| seating.json  | แผนผังที่นั่ง                        |
| activity.json | กิจกรรมภายในงาน                      |
| gift.json     | QR Code และข้อมูลร่วมยินดีกับบ่าวสาว |

---

# Repository 2 : MNTGT4EVER

**หน้าที่**

เก็บรูปภาพทั้งหมดที่ใช้ใน Flex Message

ไม่มี Webhook

ไม่มี JSON

### โครงสร้าง

```text
MNTGT4EVER
│
├── assets/
│   ├── detail/
│   ├── menu/
│   ├── seating/
│   ├── activity/
│   └── gift/
│
├── README.md
└── CHANGELOG.md
```

ตัวอย่าง

```text
assets/
│
├── detail/
│     location.png
│     schedule.png
│     theme.png
│     rsvp.png
│
├── menu/
│     menu.png
│
├── seating/
│     seating.png
│
├── activity/
│     activity-01.png
│     activity-02.png
│     activity-03.png
│
└── gift/
      qr-v2.png
```

---

# กฎการแก้ไขโปรเจกต์

## หากต้องการแก้ข้อความ

แก้ที่

```text
wedding-webhookserver-vercel/assets/flex/
```

เช่น

* เปลี่ยนข้อความ
* เปลี่ยนปุ่ม
* เปลี่ยนสี
* เปลี่ยน URL
* เปลี่ยน Layout

---

## หากต้องการแก้รูปภาพ

แก้ที่

```text
MNTGT4EVER/assets/
```

จากนั้น

1. Export จาก Canva
2. Upload เข้า GitHub
3. Commit
4. Push

---

# การเปลี่ยนรูปภาพ

เพื่อหลีกเลี่ยงปัญหา Cache

**ไม่ควร**

```text
qr.png
```

ควรใช้ชื่อใหม่ เช่น

```text
qr-v2.png
qr-v3.png
```

จากนั้นแก้ URL ใน `gift.json`

ตัวอย่าง

```text
https://raw.githubusercontent.com/pariwats/MNTGT4EVER/main/assets/gift/qr-v2.png
```

---

# การเพิ่มเมนูใหม่

1. สร้างรูปภาพใน Canva
2. Upload ไปที่ `MNTGT4EVER/assets/`
3. สร้างไฟล์ JSON ใน

```text
wedding-webhookserver-vercel/assets/flex/
```

4. Import JSON ใน `api/index.js`

ตัวอย่าง

```javascript
import gallery from "../assets/flex/gallery.json";
```

5. เพิ่มใน `flexMessages`

```javascript
const flexMessages = {
  ...
  "แกลเลอรี": gallery
};
```

6. เพิ่ม Rich Menu Action

---

# ขั้นตอน Deploy

เมื่อแก้ไข JSON

```text
แก้ JSON
↓
Commit
↓
Push
↓
Vercel Deploy
↓
ทดสอบใน LINE
```

เมื่อแก้ไขรูป

```text
Export Canva
↓
Upload GitHub
↓
Commit
↓
Push
↓
หากใช้ชื่อไฟล์ใหม่ ให้แก้ URL ใน JSON
↓
ทดสอบใน LINE
```

---

# Rich Menu Mapping

| Rich Menu           | ส่งข้อความ          | JSON          |
| ------------------- | ------------------- | ------------- |
| รายละเอียด          | รายละเอียด          | detail.json   |
| เมนู                | เมนู                | menu.json     |
| แผนผังที่นั่ง       | แผนผังที่นั่ง       | seating.json  |
| กิจกรรม             | กิจกรรม             | activity.json |
| ร่วมยินดีกับบ่าวสาว | ร่วมยินดีกับบ่าวสาว | gift.json     |
| Google Photos       | URL                 | Google Photos |

---

# สิ่งที่ไม่ควรทำ

* ไม่เก็บไฟล์ JSON ซ้ำหลาย Repository
* ไม่แก้รูปใน Repository Webhook
* ไม่ใช้ชื่อไฟล์รูปเดิมเมื่อเปลี่ยนเนื้อหารูป
* ไม่แก้ `api/index.js` หากเป็นเพียงการเปลี่ยนข้อความหรือรูปภาพ

---

# Checklist ก่อนใช้งานจริง

* ✅ Rich Menu ทุกปุ่มทำงาน
* ✅ Flex Message ทุกหน้าแสดงผลถูกต้อง
* ✅ Google Maps เปิดได้
* ✅ Google Form เปิดได้
* ✅ Google Photos เปิดได้
* ✅ QR Code ถูกต้อง
* ✅ ปุ่มคัดลอกเลขบัญชีทำงาน (หากเปิดใช้งาน)
* ✅ ปุ่มแนบสลิปทำงาน
* ✅ ทดสอบบน Android
* ✅ ทดสอบบน iPhone
* ✅ ตรวจสอบลิงก์ทั้งหมดก่อนวันงาน

---

# หมายเหตุ

Repository ทั้งสองมีหน้าที่ต่างกันอย่างชัดเจน

* **wedding-webhookserver-vercel** = ระบบและ Logic
* **MNTGT4EVER** = รูปภาพและสื่อประกอบ

ให้ยึดหลักนี้เสมอ เพื่อให้โปรเจกต์ดูแลง่ายและลดความสับสนในการแก้ไขในอนาคต

=====================================================================

# 💍 Wedding LINE OA Developer Guide v2.0

## Project Overview

Wedding LINE Official Account สำหรับงานแต่งงาน

ระบบนี้ใช้ LINE Messaging API ร่วมกับ Vercel และ GitHub เพื่อแสดง Flex Message ให้แขกภายในงาน

---

# Architecture

```text
Guest
   │
   ▼
LINE Official Account
   │
   ▼
LINE Messaging API
   │
Webhook
   │
   ▼
Vercel
(wedding-webhookserver-vercel)
   │
   ▼
api/index.js
   │
   ├── welcome.json
   ├── detail.json
   ├── menu.json
   ├── seating.json
   ├── activity.json
   └── gift.json
           │
           ▼
GitHub Raw Images
(MNTGT4EVER)
```

---

# Repository Structure

## 1. wedding-webhookserver-vercel

ระบบหลัก

```text
api/
    index.js

assets/
    flex/
        welcome.json
        detail.json
        menu.json
        seating.json
        activity.json
        gift.json
```

### Responsibilities

* Receive LINE Webhook
* Process Rich Menu Messages
* Reply Flex Messages
* Store Flex JSON

---

## 2. MNTGT4EVER

Asset Repository

```text
assets/

detail/
menu/
activity/
seating/
gift/
```

### Responsibilities

* PNG
* JPG
* QR Code
* Canva Export

No JSON files.

---

# Rich Menu Mapping

| Rich Menu           | Message             | JSON          |
| ------------------- | ------------------- | ------------- |
| รายละเอียด          | รายละเอียด          | detail.json   |
| เมนู                | เมนู                | menu.json     |
| แผนผังที่นั่ง       | แผนผังที่นั่ง       | seating.json  |
| กิจกรรม             | กิจกรรม             | activity.json |
| ร่วมยินดีกับบ่าวสาว | ร่วมยินดีกับบ่าวสาว | gift.json     |
| Google Photos       | URL                 | External Link |

---

# index.js Flow

```text
Receive Webhook

↓

Read Message Text

↓

Find JSON

↓

Reply Flex Message
```

Example

```javascript
const flex = flexMessages[userMessage] || welcome;

await client.replyMessage(
    event.replyToken,
    {
        type: "flex",
        altText: "Wedding Information",
        contents: flex
    }
);
```

---

# Image Management

All images are stored in

```text
MNTGT4EVER/assets/
```

Example

```text
detail/location.png

gift/qr-v2.png

activity/activity-01.png
```

Flex JSON references images using GitHub Raw URL.

Example

```text
https://raw.githubusercontent.com/pariwats/MNTGT4EVER/main/assets/gift/qr-v2.png
```

---

# Editing Workflow

## Change Text

Edit

```text
wedding-webhookserver-vercel/assets/flex/
```

Commit

Push

Vercel Deploy

Test

---

## Change Image

Export from Canva

↓

Upload to GitHub

↓

Commit

↓

Push

↓

Update Image URL if filename changed

↓

Test

---

# Adding New Flex

Step 1

Create JSON

```text
assets/flex/gallery.json
```

Step 2

Import

```javascript
import gallery from "../assets/flex/gallery.json";
```

Step 3

Register

```javascript
const flexMessages = {
    ...
    "Gallery": gallery
}
```

Step 4

Update Rich Menu

Done.

---

# Deploy Process

Git Commit

↓

Git Push

↓

Vercel Auto Deploy

↓

LINE Test

---

# Troubleshooting

## Images not updated

Possible Cause

Image Cache

Solution

Rename image

Example

```
qr.png

↓

qr-v2.png
```

Update JSON URL.

---

## Flex Message not updated

Check

* Correct JSON
* Correct Repository
* Vercel Deploy Success

---

## Image not displayed

Check

* Raw GitHub URL
* Image exists
* PNG accessible
* Correct filename

---

## Webhook not working

Check

* LINE Webhook URL
* Verify Success
* Vercel Logs
* Environment Variables

---

# Environment Variables

CHANNEL_ACCESS_TOKEN

CHANNEL_SECRET

---

# Do

✅ Keep JSON only in wedding-webhookserver-vercel

✅ Keep images only in MNTGT4EVER

✅ Commit before testing

✅ Use meaningful filenames

✅ Test every Rich Menu

---

# Don't

❌ Duplicate JSON in multiple repositories

❌ Modify images inside Webhook repository

❌ Reuse filenames when replacing image content

❌ Skip testing after deployment

---

# Recommended Workflow

Design

↓

Export Canva

↓

Upload Image

↓

Update JSON

↓

Commit

↓

Push

↓

Deploy

↓

LINE Test

---

# Version History

v1.0

Initial Project

v1.1

Rich Menu Completed

v1.2

Google Maps

Google Form

Google Photos

QR Code

Clipboard

Slip Upload

v2.0

Repository Cleanup

Developer Guide

Project Structure

Cache Handling

Maintenance Guide

---

# Project Status

* Webhook ✅
* Rich Menu ✅
* Welcome Card ✅
* Detail ✅
* Menu ✅
* Seating ✅
* Activity ✅
* Gift ✅
* Google Maps ✅
* Google Form ✅
* Google Photos ✅
* QR Code ✅
* GitHub Assets ✅
* Vercel Deployment ✅

Project Status

**Production Ready**
