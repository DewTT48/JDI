# JDI - Role Intelligence · Editorial Commercial Landing Page V3

เวอร์ชันออกแบบใหม่เน้น **Editorial Website** ไม่ใช่ dashboard template: โลโก้แบบ wordmark, ภาพประกอบ, full-bleed photo, ตัวพิมพ์ใหญ่, grid จังหวะสลับ, scroll effects แบบพอดี และ workflow กดดูได้

## วิธีใช้งานผ่านหน้าเว็บ GitHub เท่านั้น

1. ดาวน์โหลดและ **แตก ZIP**
2. เปิด https://github.com/DewTT48/JDI
3. เลือก **Add file → Upload files**
4. **เลือกทุกไฟล์ภายใน ZIP** (ไม่ต้องอัปโหลด ZIP และไม่ต้องอัปโหลดโฟลเดอร์)
5. เลือก Commit to `main` แล้วกด **Commit changes** (Replace ไฟล์เดิมที่ชื่อซ้ำ)
6. ถ้ายังไม่ได้เปิด GitHub Pages ให้ไปที่ **Settings → Pages → Deploy from a branch → main → /(root) → Save**
7. เปิด https://dewtt48.github.io/JDI/ แล้วทำ hard refresh

### ไฟล์หลัก (ทั้งหมดอยู่ระดับเดียวกัน)

- `index.html` — Sales page, SEO metadata, demo form
- `styles.css` — Design, layout, animation, responsive, print-safe font fallbacks
- `script.js` — Navigation, progress, workflow tabs, product tabs, dialog and demo lead handler
- `hero-team.webp` — ภาพประกอบ Hero (จัดทำเพื่อเว็บไซต์ ไม่ใช่ทีมงานหรือลูกค้าจริง)
- `story-team.webp` — ภาพประกอบ Section Business Impact
- `favicon.svg` — favicon ใหม่
- `privacy.html` — ข้อมูลความเป็นส่วนตัวของฟอร์มติดต่อ (ต้องตรวจทานก่อนเปิดขายจริง)
- `README.md` — คู่มือนี้

## ข้อควรรู้

**ความสามารถจริง:** ใช้เนื้อหาจากเอกสาร SALES_PAGE_CONTENT_BRIEF_TH.md (V1.1.19) ระบบมี Structured Position Intake, Human Review, Department Confirmation, Approved JD Database, Version Snapshot และส่งมอบเอกสารตามการตั้งค่า

**ไม่ใช่ระบบ Performance:** เว็บไซต์สื่อว่า JD ที่ชัดขึ้นเป็นข้อมูลตั้งต้นสำหรับ KPI และการบริหารผลงาน โดยไม่รับรองว่า JDI คำนวณ KPI หรือประเมิน Performance ได้เอง

**ภาพสินค้า:** ส่วน "ดูระบบจริง" ยังคงโหลด screenshot จาก `https://dewtt48.github.io/role-intelligence/product/` ไม่รวมใน ZIP ต้องถ่าย screenshot ของ V1.1.19 รุ่นล่าสุดและเปลี่ยนเมื่อพร้อม

**Lead form:** ใช้ Google Apps Script endpoint ที่อยู่ใน landing page เดิม (แยก source เป็น `jdi-editorial-v3`) ต้องทดสอบส่งฟอร์มจริงและตรวจสอบ privacy notice/นโยบายจัดเก็บข้อมูลก่อนเผยแพร่

**บริการ:** เว็บเป็น static HTML/CSS/JS ไม่ต้องติดตั้ง npm, build หรือใช้ Terminal

**Motion:** มีการแสดงผลตอน scroll, marquee และ photo drift แต่เคารพการตั้งค่า reduced motion ของผู้ใช้

**การเปลี่ยนโค้ด:** โปรเจกต์นี้แยกจาก `DewTT48/role-intelligence` เดิม
