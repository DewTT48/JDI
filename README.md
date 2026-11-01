# JDI - Role Intelligence | Commercial Landing Page V4

เว็บไซต์ขาย **JDI - Role Intelligence** แบบแยกโปรเจกต์ ออกแบบให้ใกล้ภาพอ้างอิงที่เลือก (Hero สีอ่อน + ภาพทีมงานสีสด, navy diagonal, ม่วงอมชมพูเข้ม, Typography ใหญ่, Business Pain cards, Business Impact แบบภาพซ้าย–เนื้อหาขวา)

## อัปโหลดบน GitHub โดยไม่ใช้ Terminal

1. แตก ZIP นี้แล้วเลือกไฟล์ทั้งหมดภายใน (ไม่ใช่ไฟล์ ZIP)
2. เปิด https://github.com/DewTT48/JDI → **Add file → Upload files**
3. อัปโหลดทุกไฟล์ลง **root** ของ Repository โดยให้ `index.html` อยู่ระดับแรก
4. หากมีไฟล์ชื่อเดิม ให้ GitHub แทนที่ไฟล์และ Commit changes ลง branch `main`
5. ตรวจหน้า **Settings → Pages** ว่า Source = `Deploy from a branch`, Branch = `main`, Folder = `/ (root)`
6. หน้าเว็บไซต์ควรเผยแพร่ที่ https://dewtt48.github.io/JDI/

## ไฟล์ใน ZIP — ไม่มีโฟลเดอร์

- `index.html` : เนื้อหาหน้าเว็บไซต์ (เป็นข้อความจริง ไม่ baked-in ในภาพ)
- `styles.css` : ดีไซน์และ responsive พร้อม motion แบบ reduced-motion friendly
- `script.js` : เมนูมือถือ, Workflow แบบโต้ตอบ, แท็บสินค้า, ฟอร์มเดโม, scroll reveal
- `hero-meeting.webp` : ภาพสีทีมงานสำหรับ Hero (ไฟล์ภาพแยก, ไม่ฝังตัวอักษร)
- `team-discussion.webp` : ภาพสีทีมงานสำหรับ Business Impact จากภาพอ้างอิงที่ได้รับอนุมัติ (ครอปและปรับคมชัดแล้ว)
- `favicon.svg` : ไอคอน JDI
- `privacy.html` : ข้อมูลความเป็นส่วนตัวของผู้ติดต่อ
- `README.md` : คู่มือนี้

## สิ่งที่ควรทราบก่อนเปิดรับลูกค้า

- ภาพประกอบบุคคลเป็นภาพที่สร้างขึ้นเพื่อแสดงแนวคิด ไม่ใช่บุคลากรหรือลูกค้าจริง
- ภาพหน้าจอระบบใน Product section ยังอ้างอิงภาพจากเว็บไซต์ระบบรุ่นก่อนหน้า โดยโหลดจาก `https://dewtt48.github.io/role-intelligence/product/` และมี Fallback หากโหลดไม่ได้ ควรแทนที่ด้วยภาพหน้าจอจริงรุ่น V1.1.19 เมื่อพร้อม
- แบบฟอร์มขอเดโมใช้ Google Apps Script Lead Endpoint เดิม (มี `source=jdi-editorial-v4` เพื่อแยกช่องทาง) **ยังไม่ได้ส่ง Lead ทดลองจริง** โปรดทดสอบปลายทางและตรวจข้อความ privacy ก่อนใช้เก็บข้อมูลลูกค้า
- JDI เป็นระบบจัดทำ ตรวจยืนยัน และจัดเก็บ JD ไม่ใช่ระบบประเมิน Performance/KPI โดยตรง; Recruitment, KPI, Career Path ฯลฯ เป็นการนำข้อมูล JD ไปต่อยอด ไม่ใช่โมดูลที่รับรองว่ามีครบในระบบ
- ไม่กล่าวอ้าง ROI การประหยัดเวลา หรือมาตรฐานความปลอดภัยที่ยังไม่ได้รับการพิสูจน์

## การแก้ไขครั้งต่อไป

เนื้อหา: `index.html` · สี/การจัดวาง: `styles.css` · ปุ่มและการโต้ตอบ: `script.js` · รูปภาพ: เปลี่ยนไฟล์ `.webp` ชื่อเดิม


## V4.1 — Requested polish (2026-11-01)

- ใช้ CTA เดียวกันทุกจุด: **ขอนัดสาธิต** (Navigation, Hero, Product, Bottom CTA และ Dialog title)
- จัดชื่อช่องกรอกกับดอกจัน `*` ให้อยู่บรรทัดเดียวกัน ไม่ตกเป็น Flex row ของตนเอง
- ปรับ Value for Every Team เป็น 3 กลุ่ม **Management, Managers & Employees, HR & OD** โดยเริ่มจาก Pain ของแต่ละฝ่าย แล้วค่อยเสนอประโยชน์ที่ JDI ช่วยได้จริง
- วางตัวหนังสือวิ่งของ Keyword Strip ไว้เหนือเส้นตกแต่งสีชมพู ด้วย Layer / z-index ที่ชัดเจน
- ไม่มีการเปลี่ยนแปลง endpoint รับ Lead, Workflow ของผลิตภัณฑ์ หรือไฟล์ภาพ

### Updating existing GitHub Pages via web only

แตก ZIP แล้วอัปโหลดไฟล์ทุกไฟล์ใน Root ของ Repository JDI (ให้ `index.html`, `styles.css`, `script.js` อยู่ที่ Root เหมือนเดิม) GitHub จะให้ Commit เพื่อแทนที่ไฟล์ชื่อซ้ำได้
