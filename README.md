# JDI - Role Intelligence

Commercial Sales Page แยกใหม่สำหรับ **JDI - Role Intelligence** โดยไม่แก้ไข Repo `DewTT48/role-intelligence` เดิม

## จุดขายหลัก

- **Business value / Role clarity** — ทำให้บทบาท ความรับผิดชอบ และผลลัพธ์ที่คาดหวังชัดเจน เพื่อเป็นข้อมูลตั้งต้นในการกำหนด KPI และบริหาร Performance (ไม่ใช่ระบบประเมิน Performance โดยตรง)
- **Digital Role Data Foundation** — Approved JD Database พร้อมประวัติ Version Snapshot และ Audit
- **Human-owned Workflow** — Requester → HR → AI-assisted draft → HR review → Department confirmation → Finalize / Publish → Delivery

เนื้อหายึด `SALES_PAGE_CONTENT_BRIEF_TH.md` V1.1.19 เป็นข้อมูลจริง และไม่อ้างประสิทธิภาพ/ROI ที่ยังไม่วัดผล

## โครงสร้างโปรเจกต์

โปรเจกต์ใช้ HTML, CSS, JavaScript แบบ Static ไม่ต้องติดตั้ง Dependencies และใช้บน GitHub Pages ได้

- `index.html`: Commercial landing page ภาษาไทย
- `styles.css`: Responsive design system Navy / Blue / Gold
- `script.js`: Navigation, workflow tabs, product gallery, demo form
- `privacy.html`: ข้อมูลการรับข้อมูลจากแบบฟอร์ม (โปรดตรวจทานก่อนเปิดใช้งานจริง)
- `assets/favicon.svg`: favicon
- `.github/workflows/deploy.yml`: Publish เว็บไซต์ผ่าน GitHub Pages
- `tests/check_site.py`: ตรวจสอบเนื้อหาโครงสร้างและลิงก์พื้นฐาน

## เปิดดูในเครื่อง

```bash
python3 -m http.server 8000
```

เปิด `http://localhost:8000/` และรันการตรวจสอบ:

```bash
python3 tests/check_site.py
node --check script.js
```

## Deploy ไป GitHub Pages

1. อัปโหลดไฟล์ทั้งหมดขึ้น Repository `DewTT48/JDI` ที่ branch `main`
2. ไปที่ **Settings → Pages → Build and deployment → Source** เลือก **GitHub Actions**
3. ตรวจสอบสถานะในแท็บ **Actions** และเปิด `https://dewtt48.github.io/JDI/` เมื่อ workflow สำเร็จ

**หมายเหตุ:** หาก GitHub Pages ยังไม่เปิดใช้งานใน Repo การ Deploy อาจยังไม่สำเร็จจนกว่าจะตั้งค่า Source

## ข้อมูลที่ต้องตรวจสอบก่อน Campaign จริง

- ฟอร์มส่ง Lead ไปยัง **endpoint เดิม** ของ Role Intelligence โดยใช้ `source=jdi-commercial-v1` แยกจากเว็บเดิม (ไฟล์ `script.js`)
- ต้องทดสอบการรับ Lead แบบ end-to-end กับ Google Apps Script และยืนยันการขอ Consent จริง
- Product gallery แสดงภาพจากเว็บไซต์เดิม 3 ภาพชั่วคราว (ผ่าน public URL) ควรถ่าย Screenshot V1.1.19 จริงจากระบบก่อนเผยแพร่เชิงพาณิชย์
- ในเว็บไซต์มีภาพจำลองเพื่ออธิบาย Workflow อย่างชัดเจนว่าเป็นภาพแนวคิด ไม่ใช่ภาพจริง
- ตรวจสอบเงื่อนไขราคา/แพ็กเกจและนโยบายความเป็นส่วนตัวกับผู้ดูแลก่อนเผยแพร่

## Brand

JDI - Role Intelligence / Clear Roles. Better People Decisions.

ชื่อ Google Workspace ไม่อยู่ใน Hero หรือการวางตำแหน่งสินค้า สถาปัตยกรรมทางเทคนิคระบุอย่างตรงไปตรงมาเฉพาะบริบทการส่งเอกสาร/ข้อมูลและความเป็นส่วนตัว
