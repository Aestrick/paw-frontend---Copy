# Laporan Tugas Praktikum 7: Integrasi Frontend React

Berikut adalah hasil implementasi antarmuka (UI) React untuk API Autentikasi. Proyek ini mencakup alur registrasi, login, dan logout, serta styling menggunakan Tailwind CSS.

---

### 1. Tampilan Halaman Login (`LoginPage.js`)
Halaman ini adalah halaman awal (`/`) yang digunakan pengguna untuk masuk ke sistem. Pengguna memasukkan email dan password, yang kemudian dikirim ke endpoint `/api/auth/login` untuk mendapatkan token JWT.

![Tampilan Halaman Login](./ss7/login-page.png)

---

### 2. Tampilan Halaman Registrasi (`RegisterPage.js`)
Halaman ini (`/register`) digunakan untuk mendaftarkan pengguna baru. Form ini mengirimkan data (nama, email, password, role) ke endpoint `/api/auth/register`. Setelah berhasil, pengguna diarahkan kembali ke halaman login.

![Tampilan Halaman Registrasi](./ss7/register-page.png)

---

### 3. Tampilan Halaman Dashboard (`DashboardPage.js`)
Halaman ini (`/dashboard`) adalah halaman yang hanya bisa diakses setelah login. Halaman ini berisi tombol "Logout" yang akan menghapus token dari `localStorage` dan mengarahkan pengguna kembali ke halaman login.

![Tampilan Halaman Dashboard](./ss7/dashboard-page.png)