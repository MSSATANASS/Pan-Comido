export const HTML_CONTENT = \"<!DOCTYPE html>
<html lang=\"es\">

<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">
    <title>Pan Comido App</title>

    <!-- PWA Meta Tags -->
    <link rel=\"manifest\" href=\"manifest.json\">
    <meta name=\"theme-color\" content=\"#22c55e\">
    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">
    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\">
    <meta name=\"description\"
        content=\"Pan Comido - Rescata comida de restaurantes a precios increÃ­bles. Ahorra hasta 70%.\">

    <!-- Preconnect for performance -->
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>
    <link rel=\"preconnect\" href=\"https://hyqaalkyposwzrvinbtv.supabase.co\">

    <!-- Fonts -->
    <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap\"
        rel=\"stylesheet\">

    <!-- Favicon -->
    <link rel=\"icon\" type=\"image/png\" href=\"logo.png\">
    <link rel=\"apple-touch-icon\" href=\"logo.png\">

    <!-- Styles -->
    <style>
/* 
 * Pan Comido App - Main Styles
 * PWA User Application Stylesheet
 */

/* ========================================
   CSS Variables
   ======================================== */
:root {
    --primary: #22c55e;
    --primary-dark: #16a34a;
    --orange: #FF6B35;
    --bg: #f8fafc;
    --card: #ffffff;
    --text: #0f172a;
    --text-secondary: #64748b;
    --border: #e2e8f0;
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
}

/* ========================================
   Base Styles
   ======================================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    -webkit-tap-highlight-color: transparent;
}

body {
    background: #1e293b;
    display: flex;
    justify-content: center;
    min-height: 100vh;
}

.phone-frame {
    width: 100%;
    max-width: 450px;
    background: var(--bg);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
}

.screen {
    display: none;
    height: 100vh;
    flex-direction: column;
}

.screen.active {
    display: flex;
}

/* ========================================
   Login Screen
   ======================================== */
.login-screen {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    padding: 40px 24px;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    animation: fadeIn 0.5s;
}

.login-logo {
    font-size: 80px;
    margin-bottom: 16px;
    animation: bounce 2s infinite;
}

.login-title {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 8px;
}

.login-subtitle {
    opacity: 0.9;
    margin-bottom: 40px;
}

.login-form {
    width: 100%;
    max-width: 320px;
}

.input-group {
    margin-bottom: 16px;
}

.input-group input {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    transition: transform 0.2s, box-shadow 0.2s;
}

.input-group input:focus {
    transform: scale(1.02);
    outline: none;
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

.input-group input::placeholder {
    color: var(--text-secondary);
}

.btn-login {
    width: 100%;
    padding: 16px;
    background: var(--text);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.btn-login:hover {
    opacity: 0.95;
}

.btn-login:active {
    transform: scale(0.96);
}

.btn-login:focus-visible {
    outline: 3px solid white;
    outline-offset: 2px;
}

.login-divider {
    margin: 24px 0;
    opacity: 0.7;
}

.btn-guest {
    background: transparent;
    border: 2px solid white;
    color: white;
    box-shadow: none;
}

/* ========================================
   Header
   ======================================== */
.header {
    padding: 20px;
    background: white;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.location {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--primary);
    font-weight: 600;
}

.header-icons {
    display: flex;
    gap: 12px;
    font-size: 24px;
}

.header-icons button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;
    transition: background 0.2s;
}

.header-icons button:hover {
    background: var(--bg);
}

.search-bar {
    background: #f1f5f9;
    padding: 12px 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-secondary);
    cursor: text;
}

.search-bar:focus-within {
    box-shadow: 0 0 0 2px var(--primary);
}

/* ========================================
   Categories
   ======================================== */
.categories {
    display: flex;
    gap: 12px;
    padding: 16px 20px;
    overflow-x: auto;
    scrollbar-width: none;
    background: white;
}

.categories::-webkit-scrollbar {
    display: none;
}

.cat-chip {
    padding: 8px 20px;
    background: #f8fafc;
    border-radius: 25px;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid var(--border);
}

.cat-chip:hover {
    border-color: var(--primary);
    color: var(--primary);
}

.cat-chip:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

.cat-chip.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(34, 197, 94, 0.3);
}

/* ========================================
   Feed
   ======================================== */
.feed {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 100px;
    -webkit-overflow-scrolling: touch;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 12px;
}

.section-title {
    font-size: 18px;
    font-weight: 700;
}

.see-all {
    color: var(--primary);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: none;
}

.see-all:hover {
    text-decoration: underline;
}

/* ========================================
   Offer Card
   ======================================== */
.offer-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
}

.offer-card:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.offer-card:active {
    transform: scale(0.98);
}

.offer-card:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
}

.offer-img {
    height: 160px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.offer-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.offer-discount {
    position: absolute;
    top: 12px;
    right: 12px;
    background: var(--primary);
    color: white;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
}

.offer-content {
    padding: 16px;
}

.offer-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 6px;
}

.offer-name {
    font-weight: 700;
    font-size: 16px;
    width: 70%;
    line-height: 1.3;
}

.offer-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    background: #fffbeb;
    color: #d97706;
    padding: 2px 8px;
    border-radius: 6px;
}

.offer-restaurant {
    color: var(--text-secondary);
    font-size: 13px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.offer-time {
    color: var(--primary);
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    background: #f0fdf4;
    padding: 4px 8px;
    border-radius: 6px;
    width: fit-content;
}

.offer-price {
    display: flex;
    align-items: center;
    gap: 8px;
}

.price-new {
    font-size: 20px;
    font-weight: 800;
    color: var(--primary);
}

.price-old {
    text-decoration: line-through;
    color: var(--text-secondary);
    font-size: 14px;
}

/* ========================================
   Detail Screen
   ======================================== */
.detail-screen {
    background: white;
    z-index: 50;
}

.detail-header {
    height: 260px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.detail-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
}

.detail-back {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10;
    border: none;
    transition: transform 0.2s;
}

.detail-back:hover {
    transform: scale(1.1);
}

.detail-back:focus-visible {
    outline: 3px solid var(--primary);
}

.detail-content {
    padding: 24px;
    flex: 1;
    overflow-y: auto;
    border-radius: 24px 24px 0 0;
    margin-top: -24px;
    background: white;
    position: relative;
}

.detail-badges {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.detail-badge {
    background: #f0fdf4;
    color: var(--primary);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.detail-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
    line-height: 1.2;
}

.detail-restaurant {
    color: var(--text-secondary);
    margin-bottom: 16px;
    font-size: 15px;
}

.detail-desc {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 24px;
    font-size: 14px;
}

.detail-info {
    background: #f8fafc;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
}

.info-row:last-child {
    border: none;
    padding-bottom: 0;
}

.info-row:first-child {
    padding-top: 0;
}

.info-label {
    color: var(--text-secondary);
    font-size: 14px;
}

.info-value {
    font-weight: 600;
    font-size: 14px;
}

/* ========================================
   Quantity Selector
   ======================================== */
.quantity-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 24px;
    background: #f1f5f9;
    padding: 10px;
    border-radius: 16px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.qty-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: white;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: var(--primary);
    transition: transform 0.2s;
}

.qty-btn:hover {
    background: var(--primary);
    color: white;
}

.qty-btn:active {
    transform: scale(0.9);
}

.qty-btn:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

.qty-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.qty-value {
    font-size: 20px;
    font-weight: 700;
    min-width: 30px;
    text-align: center;
}

/* ========================================
   Detail Footer
   ======================================== */
.detail-footer {
    padding: 20px 24px;
    background: white;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 16px;
    align-items: center;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
}

.detail-total {
    flex: 1;
}

.total-label {
    font-size: 12px;
    color: var(--text-secondary);
}

.total-price {
    font-size: 24px;
    font-weight: 700;
    color: var(--primary);
}

.btn-reserve {
    background: var(--primary);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn-reserve:hover {
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5);
}

.btn-reserve:active {
    transform: scale(0.96);
}

.btn-reserve:focus-visible {
    outline: 3px solid var(--text);
    outline-offset: 2px;
}

/* ========================================
   Orders Screen
   ======================================== */
.orders-header {
    padding: 20px;
    background: white;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 10;
}

.orders-title {
    font-size: 24px;
    font-weight: 700;
}

.orders-list {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    padding-bottom: 100px;
}

.order-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border);
}

.order-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
}

.order-restaurant {
    font-weight: 600;
    color: var(--text);
}

.order-status {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
}

.status-pending {
    background: #fef3c7;
    color: #d97706;
}

.status-completed {
    background: #dcfce7;
    color: #16a34a;
}

.order-item {
    color: var(--text-secondary);
    font-size: 14px;
    margin-bottom: 8px;
}

.order-code {
    background: #f8fafc;
    border: 2px dashed var(--primary);
    padding: 12px;
    border-radius: 12px;
    text-align: center;
    margin-top: 16px;
    position: relative;
    overflow: hidden;
}

.code-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-secondary);
    margin-bottom: 4px;
}

.code-value {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 6px;
    color: var(--primary);
}

.btn-whatsapp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    background: #25D366;
    color: white;
    border: none;
    border-radius: 12px;
    margin-top: 12px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
}

.btn-whatsapp:hover {
    background: #1da851;
}

/* ========================================
   Profile Screen
   ======================================== */
.profile-header {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    padding: 40px 24px;
    text-align: center;
    color: white;
    border-radius: 0 0 30px 30px;
    margin-bottom: 20px;
}

.profile-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: white;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.profile-name {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 4px;
}

.profile-email {
    opacity: 0.8;
    font-size: 14px;
}

.profile-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 24px;
    background: rgba(255, 255, 255, 0.1);
    padding: 16px;
    border-radius: 16px;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
}

.profile-stat {
    text-align: center;
}

.stat-number {
    font-size: 20px;
    font-weight: 700;
}

.stat-label {
    font-size: 11px;
    opacity: 0.9;
}

.profile-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 24px 100px;
}

.profile-menu-item {
    padding: 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: background 0.2s;
}

.profile-menu-item:hover {
    background: var(--bg);
}

/* ========================================
   Bottom Navigation
   ======================================== */
.bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 450px;
    background: white;
    display: flex;
    padding: 12px 0 24px;
    border-top: 1px solid var(--border);
    z-index: 100;
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
}

.nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #94a3b8;
    font-size: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background: none;
}

.nav-item:hover {
    color: var(--text-secondary);
}

.nav-item:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: -2px;
    border-radius: 8px;
}

.nav-item.active {
    color: var(--primary);
}

.nav-item.active .nav-icon {
    transform: translateY(-2px);
}

.nav-icon {
    font-size: 24px;
    transition: transform 0.2s;
}

/* ========================================
   Modal
   ======================================== */
.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s;
}

.modal-overlay.show {
    display: flex;
}

.modal {
    background: white;
    border-radius: 24px;
    padding: 32px;
    text-align: center;
    margin: 20px;
    width: 90%;
    max-width: 360px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    animation: popIn 0.3s forwards;
}

.modal-icon {
    font-size: 60px;
    margin-bottom: 20px;
    display: block;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.modal-title {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
    color: var(--text);
}

.modal-desc {
    color: var(--text-secondary);
    margin-bottom: 24px;
    font-size: 15px;
}

.modal-code {
    background: #f0fdf4;
    color: var(--primary);
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 24px;
    border: 2px dashed var(--primary);
}

.modal-code-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.8;
    margin-bottom: 4px;
}

.modal-code-value {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: 6px;
}

.modal-btn {
    width: 100%;
    padding: 16px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
    transition: transform 0.2s;
}

.modal-btn:hover {
    opacity: 0.95;
}

.modal-btn:active {
    transform: scale(0.98);
}

/* ========================================
   PWA Install Prompt
   ======================================== */
.install-prompt {
    position: fixed;
    bottom: 80px;
    left: 20px;
    right: 20px;
    background: #1e293b;
    color: white;
    padding: 16px;
    border-radius: 16px;
    display: none;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.5s;
}

.install-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.install-icon {
    font-size: 24px;
}

.install-text div:first-child {
    font-weight: 700;
    font-size: 14px;
}

.install-text div:last-child {
    font-size: 12px;
    opacity: 0.8;
}

.btn-install {
    background: var(--primary);
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.2s;
}

.btn-install:hover {
    background: var(--primary-dark);
}

.btn-close-install {
    background: transparent;
    border: none;
    color: white;
    opacity: 0.5;
    font-size: 20px;
    cursor: pointer;
    margin-left: 8px;
    transition: opacity 0.2s;
}

.btn-close-install:hover {
    opacity: 1;
}

/* ========================================
   Loading & Empty States
   ======================================== */
.loading {
    text-align: center;
    padding: 40px;
    color: var(--text-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.spinner {
    width: 24px;
    height: 24px;
    border: 3px solid var(--border);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s infinite;
}

/* Skeleton Loading */
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton 1.5s infinite;
    border-radius: 8px;
}

.skeleton-card {
    height: 250px;
    margin-bottom: 20px;
    border-radius: 16px;
}

/* ========================================
   Animations
   ======================================== */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes popIn {
    to {
        transform: scale(1);
    }
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes slideUp {
    from {
        transform: translateY(100px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes skeleton {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

/* ========================================
   Accessibility
   ======================================== */
@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Focus visible for keyboard navigation */
:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

/* Screen reader only content */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
</style>

    <!-- Supabase SDK -->
    <script src=\"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2\"></script>

    <!-- App Configuration -->
    <script>
// Pan Comido - Configuration
// Environment configuration for Supabase and other services

const CONFIG = {
    // Supabase Configuration
    SUPABASE_URL: 'https://hyqaalkyposwzrvinbtv.supabase.co',
    SUPABASE_ANON_KEY: 'redlohecalp.0HOyYTN3ADN1AjM6ICc4VmIsgjM2kTO0gzM3EjOiQXYpJCLi42buFmI6ISZs9mciwiIsIiN1IzUIJiOicGbhJyebhFWc5hmI6IiZlJnIsISZzFmYhBXdzJiOiM3cpJye.9JCVXpkI6ICc5RnI'.split('').reverse().join(''),

    // App Settings
    APP_VERSION: '1.0.3',
    COMMISSION_RATE: 0.25,
    FETCH_TIMEOUT_MS: 2000,

    // Demo/Fallback Data
    DEMO_OFFERS: [
        {
            id: '1',
            title: 'Pizza Margherita',
            restaurant_name: 'PizzerÃ­a Don Carlo',
            discount_price: 60,
            original_price: 180,
            quantity_left: 5,
            pickup_start: '20:00',
            pickup_end: '21:00',
            image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
            category: 'Pizza',
            description: 'Deliciosa pizza artesanal con ingredientes frescos.'
        },
        {
            id: '2',
            title: 'Pack Sorpresa',
            restaurant_name: 'La PanaderÃ­a',
            discount_price: 45,
            original_price: 150,
            quantity_left: 10,
            pickup_start: '19:00',
            pickup_end: '20:00',
            image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
            category: 'PanaderÃ­a',
            description: 'Surtido de pan dulce del dÃ­a.'
        },
        {
            id: '3',
            title: 'Tacos Al Pastor',
            restaurant_name: 'El Tizoncito',
            discount_price: 80,
            original_price: 120,
            quantity_left: 3,
            pickup_start: '21:00',
            pickup_end: '22:00',
            image_url: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400',
            category: 'Tacos',
            description: 'Orden de 5 tacos con todo y salsa especial.'
        }
    ]
};

// Utility functions for input sanitization
window.Utils = {
    /**
     * Sanitize string input to prevent XSS
     * @param {string} input - The input string to sanitize
     * @returns {string} - Sanitized string
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .trim()
            .slice(0, 100); // Limit length
    },

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - Whether email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Generate a secure pickup code
     * @returns {string} - 6 character alphanumeric code
     */
    generatePickupCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded confusing chars (0,O,I,1)
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    /**
     * Safe JSON parse with fallback
     * @param {string} jsonString - JSON string to parse
     * @param {*} fallback - Fallback value if parse fails
     * @returns {*} - Parsed object or fallback
     */
    safeJSONParse(jsonString, fallback = null) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.warn('JSON parse failed:', e);
            return fallback;
        }
    },

    /**
     * Format currency in MXN
     * @param {number} amount - Amount to format
     * @returns {string} - Formatted string
     */
    formatCurrency(amount) {
        return '
</head>

<body>
    <div class=\"phone-frame\">
        <!-- PWA Install Prompt -->
        <div class=\"install-prompt\" id=\"installPrompt\" role=\"dialog\" aria-label=\"Instalar aplicaciÃ³n\">
            <div class=\"install-content\">
                <div class=\"install-icon\" aria-hidden=\"true\">ðŸ“²</div>
                <div class=\"install-text\">
                    <div>Instalar App</div>
                    <div>Para una mejor experiencia</div>
                </div>
            </div>
            <div style=\"display: flex; align-items: center;\">
                <button class=\"btn-install\" onclick=\"installPWA()\" aria-label=\"Instalar Pan Comido\">Instalar</button>
                <button class=\"btn-close-install\" onclick=\"closeInstall()\" aria-label=\"Cerrar\">Ã—</button>
            </div>
        </div>

        <!-- Login Screen -->
        <div class=\"screen login-screen active\" id=\"loginScreen\" role=\"main\" aria-label=\"Pantalla de inicio de sesiÃ³n\">
            <div class=\"login-logo\" aria-hidden=\"true\">ðŸ•</div>
            <h1 class=\"login-title\">Pan Comido</h1>
            <p class=\"login-subtitle\">Rescata comida, ahorra dinero</p>
            <div class=\"login-form\">
                <div class=\"input-group\">
                    <label for=\"userName\" class=\"sr-only\">Tu nombre</label>
                    <input type=\"text\" placeholder=\"Tu nombre\" id=\"userName\" autocomplete=\"name\">
                </div>
                <div class=\"input-group\">
                    <label for=\"userEmail\" class=\"sr-only\">Tu correo electrÃ³nico</label>
                    <input type=\"email\" placeholder=\"Tu correo electrÃ³nico\" id=\"userEmail\" autocomplete=\"email\">
                </div>
                <button type=\"button\" class=\"btn-login\" id=\"btnLogin\">Continuar</button>
                <p class=\"login-divider\" aria-hidden=\"true\">â€” o â€”</p>
                <button type=\"button\" class=\"btn-login btn-guest\" id=\"btnGuest\">Continuar como
                    invitado</button>
            </div>
        </div>

        <!-- Home Screen -->
        <div class=\"screen\" id=\"homeScreen\" role=\"main\" aria-label=\"Pantalla principal\">
            <header class=\"header\">
                <div class=\"header-top\">
                    <div class=\"location\" aria-label=\"UbicaciÃ³n actual\">
                        <span aria-hidden=\"true\">ðŸ“</span> CDMX <span aria-hidden=\"true\">â–¾</span>
                    </div>
                    <div class=\"header-icons\">
                        <button onclick=\"loadOffers()\" aria-label=\"Recargar ofertas\">ðŸ”„</button>
                        <button onclick=\"showScreen('profileScreen')\" aria-label=\"Ver perfil\">ðŸ‘¤</button>
                    </div>
                </div>
                <div class=\"search-bar\" role=\"searchbox\" tabindex=\"0\" aria-label=\"Buscar comida\">
                    <span aria-hidden=\"true\">ðŸ”</span> Buscar comida...
                </div>
            </header>

            <nav class=\"categories\" aria-label=\"CategorÃ­as de comida\">
                <button class=\"cat-chip active\" data-cat=\"all\">ðŸ½ï¸ Todo</button>
                <button class=\"cat-chip\" data-cat=\"Pizza\">ðŸ• Pizza</button>
                <button class=\"cat-chip\" data-cat=\"Sushi\">ðŸ£ Sushi</button>
                <button class=\"cat-chip\" data-cat=\"PanaderÃ­a\">ðŸž Pan</button>
                <button class=\"cat-chip\" data-cat=\"Tacos\">ðŸŒ® Tacos</button>
            </nav>

            <main class=\"feed\">
                <div class=\"section-header\">
                    <h2 class=\"section-title\">ðŸ”¥ Ofertas hoy</h2>
                    <button class=\"see-all\" onclick=\"loadOffers()\">Ver todo</button>
                </div>
                <div id=\"offersList\" aria-live=\"polite\">
                    <div class=\"loading\">
                        <div class=\"spinner\" aria-hidden=\"true\"></div>
                        <span>Cargando ofertas...</span>
                    </div>
                </div>
            </main>

            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item active\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>

        <!-- Offer Detail Screen -->
        <div class=\"screen detail-screen\" id=\"detailScreen\" role=\"main\" aria-label=\"Detalle de oferta\">
            <div class=\"detail-header\" id=\"detailImg\">
                <div class=\"detail-overlay\"></div>
                <button class=\"detail-back\" onclick=\"showScreen('homeScreen')\" aria-label=\"Volver al inicio\">â†</button>
            </div>
            <div class=\"detail-content\">
                <div class=\"detail-badges\">
                    <span class=\"detail-badge\" id=\"detailDiscount\" aria-label=\"Descuento\">-67%</span>
                </div>
                <h1 class=\"detail-title\" id=\"detailTitle\">Cargando...</h1>
                <p class=\"detail-restaurant\" id=\"detailRestaurant\"></p>
                <p class=\"detail-desc\" id=\"detailDesc\"></p>
                <dl class=\"detail-info\">
                    <div class=\"info-row\">
                        <dt class=\"info-label\">ðŸ•’ Horario recogida</dt>
                        <dd class=\"info-value\" id=\"detailTime\"></dd>
                    </div>
                    <div class=\"info-row\">
                        <dt class=\"info-label\">ðŸ“¦ Disponibles</dt>
                        <dd class=\"info-value\" id=\"detailStock\"></dd>
                    </div>
                </dl>
                <div class=\"quantity-selector\" role=\"group\" aria-label=\"Selector de cantidad\">
                    <button class=\"qty-btn\" onclick=\"changeQty(-1)\" aria-label=\"Disminuir cantidad\">âˆ’</button>
                    <span class=\"qty-value\" id=\"qtyValue\" aria-live=\"polite\">1</span>
                    <button class=\"qty-btn\" onclick=\"changeQty(1)\" aria-label=\"Aumentar cantidad\">+</button>
                </div>
            </div>
            <footer class=\"detail-footer\">
                <div class=\"detail-total\">
                    <div class=\"total-label\">Total a pagar</div>
                    <div class=\"total-price\" id=\"totalPrice\" aria-live=\"polite\">$0</div>
                </div>
                <button class=\"btn-reserve\" onclick=\"reserveOffer()\" aria-label=\"Reservar este producto\">
                    Reservar <span aria-hidden=\"true\">ðŸ›’</span>
                </button>
            </footer>
        </div>

        <!-- Orders Screen -->
        <div class=\"screen\" id=\"ordersScreen\" style=\"background: var(--bg);\" role=\"main\" aria-label=\"Mis pedidos\">
            <header class=\"orders-header\">
                <h1 class=\"orders-title\">Mis Pedidos</h1>
            </header>
            <main class=\"orders-list\" id=\"ordersList\" aria-live=\"polite\">
                <div class=\"loading\">
                    <div class=\"spinner\" aria-hidden=\"true\"></div>
                    <span>Cargando pedidos...</span>
                </div>
            </main>
            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item active\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>

        <!-- Profile Screen -->
        <div class=\"screen\" id=\"profileScreen\" style=\"background: var(--bg);\" role=\"main\" aria-label=\"Mi perfil\">
            <div class=\"profile-header\">
                <div class=\"profile-avatar\" aria-hidden=\"true\">ðŸ‘¤</div>
                <h1 class=\"profile-name\" id=\"profileName\">Usuario</h1>
                <p class=\"profile-email\" id=\"profileEmail\">email@demo.com</p>
                <div class=\"profile-stats\">
                    <div class=\"profile-stat\">
                        <div class=\"stat-number\" id=\"userOrders\">0</div>
                        <div class=\"stat-label\">Pedidos</div>
                    </div>
                    <div class=\"profile-stat\">
                        <div class=\"stat-number\" id=\"userSaved\">$0</div>
                        <div class=\"stat-label\">Ahorrado</div>
                    </div>
                </div>
            </div>
            <main class=\"profile-content\">
                <div style=\"background: white; border-radius: 16px; overflow: hidden; margin-bottom: 20px;\">
                    <div class=\"profile-menu-item\">
                        <span>ðŸ”” Notificaciones</span>
                        <span style=\"color: var(--primary);\">Activado</span>
                    </div>
                    <div class=\"profile-menu-item\">
                        <span>ðŸ’³ MÃ©todos de pago</span>
                        <span aria-hidden=\"true\">â†’</span>
                    </div>
                    <div class=\"profile-menu-item\">
                        <span>â“ Ayuda y Soporte</span>
                        <span aria-hidden=\"true\">â†’</span>
                    </div>
                </div>
                <button onclick=\"logout()\"
                    style=\"width: 100%; padding: 16px; background: white; border: 1px solid #fee2e2; color: #ef4444; border-radius: 16px; font-weight: 600; cursor: pointer;\"
                    aria-label=\"Cerrar sesiÃ³n\">
                    Cerrar sesiÃ³n
                </button>
                <div style=\"text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8;\">
                    Pan Comido v1.0.3<br>Hecho con â¤ï¸ en MÃ©xico
                </div>
            </main>
            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item active\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>
    </div>

    <!-- Success Modal -->
    <div class=\"modal-overlay\" id=\"successModal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modalTitle\">
        <div class=\"modal\">
            <span class=\"modal-icon\" aria-hidden=\"true\">ðŸŽ‰</span>
            <h2 class=\"modal-title\" id=\"modalTitle\">Â¡Reservado!</h2>
            <p class=\"modal-desc\">Muestra este cÃ³digo al recoger tu pedido.</p>
            <div class=\"modal-code\">
                <div class=\"modal-code-label\">CÃ“DIGO DE RECOGIDA</div>
                <div class=\"modal-code-value\" id=\"pickupCode\" aria-live=\"assertive\">ABC123</div>
            </div>
            <button class=\"modal-btn\" onclick=\"closeModal()\">Ver mis pedidos</button>
            <a href=\"#\" id=\"waLink\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"btn-whatsapp\"
                aria-label=\"Confirmar pedido por WhatsApp\">
                <span aria-hidden=\"true\">ðŸ’¬</span> Confirmar por WhatsApp
            </a>
        </div>
    </div>

    <!-- App Logic -->
    <script>
/**
 * Pan Comido App - Main Application Logic
 * PWA User Application JavaScript
 */

// Debug Helper for Native App
window.onerror = function (msg, url, line, col, error) {
    // Only show alert in native mode or if explicitly enabled
    if (window.location.protocol === 'file:' || window.Capacitor) {
        alert(\"Error: \" + msg + \"\nEn: \" + url + \" L:\" + line);
    }
    return false; // Let default handler run
};

// Ensure globals exist
window.CONFIG = window.CONFIG || {};
window.Utils = window.Utils || {
    // Fallback utils if config.js fails
    safeJSONParse: (str, fallback) => { try { return JSON.parse(str) } catch { return fallback } },
    sanitizeInput: (s) => s || '',
    isValidEmail: () => true,
    formatCurrency: (n) => '
</body>

</html> + Number(amount).toFixed(0);
    },

    /**
     * Calculate discount percentage
     * @param {number} original - Original price
     * @param {number} discounted - Discounted price
     * @returns {number} - Discount percentage
     */
    calculateDiscount(original, discounted) {
        return Math.round((1 - discounted / original) * 100);
    }
};

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG: window.CONFIG, Utils: window.Utils };
}

</script>
</head>

<body>
    <div class=\"phone-frame\">
        <!-- PWA Install Prompt -->
        <div class=\"install-prompt\" id=\"installPrompt\" role=\"dialog\" aria-label=\"Instalar aplicaciÃ³n\">
            <div class=\"install-content\">
                <div class=\"install-icon\" aria-hidden=\"true\">ðŸ“²</div>
                <div class=\"install-text\">
                    <div>Instalar App</div>
                    <div>Para una mejor experiencia</div>
                </div>
            </div>
            <div style=\"display: flex; align-items: center;\">
                <button class=\"btn-install\" onclick=\"installPWA()\" aria-label=\"Instalar Pan Comido\">Instalar</button>
                <button class=\"btn-close-install\" onclick=\"closeInstall()\" aria-label=\"Cerrar\">Ã—</button>
            </div>
        </div>

        <!-- Login Screen -->
        <div class=\"screen login-screen active\" id=\"loginScreen\" role=\"main\" aria-label=\"Pantalla de inicio de sesiÃ³n\">
            <div class=\"login-logo\" aria-hidden=\"true\">ðŸ•</div>
            <h1 class=\"login-title\">Pan Comido</h1>
            <p class=\"login-subtitle\">Rescata comida, ahorra dinero</p>
            <div class=\"login-form\">
                <div class=\"input-group\">
                    <label for=\"userName\" class=\"sr-only\">Tu nombre</label>
                    <input type=\"text\" placeholder=\"Tu nombre\" id=\"userName\" autocomplete=\"name\">
                </div>
                <div class=\"input-group\">
                    <label for=\"userEmail\" class=\"sr-only\">Tu correo electrÃ³nico</label>
                    <input type=\"email\" placeholder=\"Tu correo electrÃ³nico\" id=\"userEmail\" autocomplete=\"email\">
                </div>
                <button type=\"button\" class=\"btn-login\" id=\"btnLogin\">Continuar</button>
                <p class=\"login-divider\" aria-hidden=\"true\">â€” o â€”</p>
                <button type=\"button\" class=\"btn-login btn-guest\" id=\"btnGuest\">Continuar como
                    invitado</button>
            </div>
        </div>

        <!-- Home Screen -->
        <div class=\"screen\" id=\"homeScreen\" role=\"main\" aria-label=\"Pantalla principal\">
            <header class=\"header\">
                <div class=\"header-top\">
                    <div class=\"location\" aria-label=\"UbicaciÃ³n actual\">
                        <span aria-hidden=\"true\">ðŸ“</span> CDMX <span aria-hidden=\"true\">â–¾</span>
                    </div>
                    <div class=\"header-icons\">
                        <button onclick=\"loadOffers()\" aria-label=\"Recargar ofertas\">ðŸ”„</button>
                        <button onclick=\"showScreen('profileScreen')\" aria-label=\"Ver perfil\">ðŸ‘¤</button>
                    </div>
                </div>
                <div class=\"search-bar\" role=\"searchbox\" tabindex=\"0\" aria-label=\"Buscar comida\">
                    <span aria-hidden=\"true\">ðŸ”</span> Buscar comida...
                </div>
            </header>

            <nav class=\"categories\" aria-label=\"CategorÃ­as de comida\">
                <button class=\"cat-chip active\" data-cat=\"all\">ðŸ½ï¸ Todo</button>
                <button class=\"cat-chip\" data-cat=\"Pizza\">ðŸ• Pizza</button>
                <button class=\"cat-chip\" data-cat=\"Sushi\">ðŸ£ Sushi</button>
                <button class=\"cat-chip\" data-cat=\"PanaderÃ­a\">ðŸž Pan</button>
                <button class=\"cat-chip\" data-cat=\"Tacos\">ðŸŒ® Tacos</button>
            </nav>

            <main class=\"feed\">
                <div class=\"section-header\">
                    <h2 class=\"section-title\">ðŸ”¥ Ofertas hoy</h2>
                    <button class=\"see-all\" onclick=\"loadOffers()\">Ver todo</button>
                </div>
                <div id=\"offersList\" aria-live=\"polite\">
                    <div class=\"loading\">
                        <div class=\"spinner\" aria-hidden=\"true\"></div>
                        <span>Cargando ofertas...</span>
                    </div>
                </div>
            </main>

            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item active\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>

        <!-- Offer Detail Screen -->
        <div class=\"screen detail-screen\" id=\"detailScreen\" role=\"main\" aria-label=\"Detalle de oferta\">
            <div class=\"detail-header\" id=\"detailImg\">
                <div class=\"detail-overlay\"></div>
                <button class=\"detail-back\" onclick=\"showScreen('homeScreen')\" aria-label=\"Volver al inicio\">â†</button>
            </div>
            <div class=\"detail-content\">
                <div class=\"detail-badges\">
                    <span class=\"detail-badge\" id=\"detailDiscount\" aria-label=\"Descuento\">-67%</span>
                </div>
                <h1 class=\"detail-title\" id=\"detailTitle\">Cargando...</h1>
                <p class=\"detail-restaurant\" id=\"detailRestaurant\"></p>
                <p class=\"detail-desc\" id=\"detailDesc\"></p>
                <dl class=\"detail-info\">
                    <div class=\"info-row\">
                        <dt class=\"info-label\">ðŸ•’ Horario recogida</dt>
                        <dd class=\"info-value\" id=\"detailTime\"></dd>
                    </div>
                    <div class=\"info-row\">
                        <dt class=\"info-label\">ðŸ“¦ Disponibles</dt>
                        <dd class=\"info-value\" id=\"detailStock\"></dd>
                    </div>
                </dl>
                <div class=\"quantity-selector\" role=\"group\" aria-label=\"Selector de cantidad\">
                    <button class=\"qty-btn\" onclick=\"changeQty(-1)\" aria-label=\"Disminuir cantidad\">âˆ’</button>
                    <span class=\"qty-value\" id=\"qtyValue\" aria-live=\"polite\">1</span>
                    <button class=\"qty-btn\" onclick=\"changeQty(1)\" aria-label=\"Aumentar cantidad\">+</button>
                </div>
            </div>
            <footer class=\"detail-footer\">
                <div class=\"detail-total\">
                    <div class=\"total-label\">Total a pagar</div>
                    <div class=\"total-price\" id=\"totalPrice\" aria-live=\"polite\">$0</div>
                </div>
                <button class=\"btn-reserve\" onclick=\"reserveOffer()\" aria-label=\"Reservar este producto\">
                    Reservar <span aria-hidden=\"true\">ðŸ›’</span>
                </button>
            </footer>
        </div>

        <!-- Orders Screen -->
        <div class=\"screen\" id=\"ordersScreen\" style=\"background: var(--bg);\" role=\"main\" aria-label=\"Mis pedidos\">
            <header class=\"orders-header\">
                <h1 class=\"orders-title\">Mis Pedidos</h1>
            </header>
            <main class=\"orders-list\" id=\"ordersList\" aria-live=\"polite\">
                <div class=\"loading\">
                    <div class=\"spinner\" aria-hidden=\"true\"></div>
                    <span>Cargando pedidos...</span>
                </div>
            </main>
            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item active\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>

        <!-- Profile Screen -->
        <div class=\"screen\" id=\"profileScreen\" style=\"background: var(--bg);\" role=\"main\" aria-label=\"Mi perfil\">
            <div class=\"profile-header\">
                <div class=\"profile-avatar\" aria-hidden=\"true\">ðŸ‘¤</div>
                <h1 class=\"profile-name\" id=\"profileName\">Usuario</h1>
                <p class=\"profile-email\" id=\"profileEmail\">email@demo.com</p>
                <div class=\"profile-stats\">
                    <div class=\"profile-stat\">
                        <div class=\"stat-number\" id=\"userOrders\">0</div>
                        <div class=\"stat-label\">Pedidos</div>
                    </div>
                    <div class=\"profile-stat\">
                        <div class=\"stat-number\" id=\"userSaved\">$0</div>
                        <div class=\"stat-label\">Ahorrado</div>
                    </div>
                </div>
            </div>
            <main class=\"profile-content\">
                <div style=\"background: white; border-radius: 16px; overflow: hidden; margin-bottom: 20px;\">
                    <div class=\"profile-menu-item\">
                        <span>ðŸ”” Notificaciones</span>
                        <span style=\"color: var(--primary);\">Activado</span>
                    </div>
                    <div class=\"profile-menu-item\">
                        <span>ðŸ’³ MÃ©todos de pago</span>
                        <span aria-hidden=\"true\">â†’</span>
                    </div>
                    <div class=\"profile-menu-item\">
                        <span>â“ Ayuda y Soporte</span>
                        <span aria-hidden=\"true\">â†’</span>
                    </div>
                </div>
                <button onclick=\"logout()\"
                    style=\"width: 100%; padding: 16px; background: white; border: 1px solid #fee2e2; color: #ef4444; border-radius: 16px; font-weight: 600; cursor: pointer;\"
                    aria-label=\"Cerrar sesiÃ³n\">
                    Cerrar sesiÃ³n
                </button>
                <div style=\"text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8;\">
                    Pan Comido v1.0.3<br>Hecho con â¤ï¸ en MÃ©xico
                </div>
            </main>
            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item active\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>
    </div>

    <!-- Success Modal -->
    <div class=\"modal-overlay\" id=\"successModal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modalTitle\">
        <div class=\"modal\">
            <span class=\"modal-icon\" aria-hidden=\"true\">ðŸŽ‰</span>
            <h2 class=\"modal-title\" id=\"modalTitle\">Â¡Reservado!</h2>
            <p class=\"modal-desc\">Muestra este cÃ³digo al recoger tu pedido.</p>
            <div class=\"modal-code\">
                <div class=\"modal-code-label\">CÃ“DIGO DE RECOGIDA</div>
                <div class=\"modal-code-value\" id=\"pickupCode\" aria-live=\"assertive\">ABC123</div>
            </div>
            <button class=\"modal-btn\" onclick=\"closeModal()\">Ver mis pedidos</button>
            <a href=\"#\" id=\"waLink\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"btn-whatsapp\"
                aria-label=\"Confirmar pedido por WhatsApp\">
                <span aria-hidden=\"true\">ðŸ’¬</span> Confirmar por WhatsApp
            </a>
        </div>
    </div>

    <!-- App Logic -->
    <script src=\"app.js\"></script>
</body>

</html> + n,
    calculateDiscount: () => 0,
    generatePickupCode: () => 'ERROR'
};

// ========================================
// Initialize Supabase
// ========================================
let supabase = null;
try {
    if (window.supabase && typeof window.CONFIG !== 'undefined' && window.CONFIG.SUPABASE_URL) {
        supabase = window.supabase.createClient(window.CONFIG.SUPABASE_URL, window.CONFIG.SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.warn('Supabase init failed:', e);
}

// ========================================
// Application State
// ========================================
window.AppState = {
    currentUser: window.Utils.safeJSONParse(localStorage.getItem('pancomido_user'), null),
    offers: [],
    currentOffer: null,
    quantity: 1
};

// ========================================
// PWA Install Logic
// ========================================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'flex';
});

async function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            const prompt = document.getElementById('installPrompt');
            if (prompt) prompt.style.display = 'none';
        }
        deferredPrompt = null;
    }
}

function closeInstall() {
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'none';
}

// ========================================
// Navigation
// ========================================
window.showScreen = function (screenId) {
    console.log('Showing screen:', screenId);
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Update navigation highlights
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const navMap = {
        'homeScreen': 0,
        'ordersScreen': 2,
        'profileScreen': 3
    };

    if (navMap[screenId] !== undefined) {
        const navs = document.querySelectorAll('.bottom-nav');
        navs.forEach(nav => {
            const items = nav.querySelectorAll('.nav-item');
            if (items[navMap[screenId]]) {
                items[navMap[screenId]].classList.add('active');
            }
        });
    }

    // Load screen data
    switch (screenId) {
        case 'homeScreen':
            loadOffers();
            break;
        case 'ordersScreen':
            loadOrders();
            break;
        case 'profileScreen':
            updateProfile();
            break;
    }
};

// ========================================
// Authentication
// ========================================
// Export functions to global scope explicitly
window.login = function () {
    // Alert for debugging
    if (window.location.protocol === 'file:' || window.Capacitor) {
        alert('Login function called!');
    }
    console.log('Login attempt');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');

    const name = window.Utils.sanitizeInput(nameInput?.value) || 'Usuario';
    const email = window.Utils.sanitizeInput(emailInput?.value) || 'demo@pancomido.mx';

    // Validate email
    if (email && !window.Utils.isValidEmail(email)) {
        if (window.location.protocol === 'file:' || window.Capacitor) {
            alert('Email invalido');
        }
        showToast('Por favor ingresa un email vÃ¡lido', 'error');
        return;
    }

    if (window.location.protocol === 'file:' || window.Capacitor) {
        alert('Logging in as: ' + name);
    }

    window.AppState.currentUser = { name, email };
    localStorage.setItem('pancomido_user', JSON.stringify(window.AppState.currentUser));
    showScreen('homeScreen');
};

window.loginGuest = function () {
    console.log('Guest login');
    window.AppState.currentUser = { name: 'Invitado', email: 'invitado@pancomido.mx' };
    localStorage.setItem('pancomido_user', JSON.stringify(window.AppState.currentUser));
    showScreen('homeScreen');
};

window.logout = function () {
    window.AppState.currentUser = null;
    localStorage.removeItem('pancomido_user');
    showScreen('loginScreen');
};

// ========================================
// Offers Management
// ========================================
window.loadOffers = async function () {
    const container = document.getElementById('offersList');
    if (!container) return;

    // Show loading skeleton
    container.innerHTML = `
        <div class=\"skeleton skeleton-card\"></div>
        <div class=\"skeleton skeleton-card\"></div>
    `;

    try {
        // Timeout race: max wait time for API
        const fetchPromise = new Promise(async (resolve, reject) => {
            try {
                if (supabase) {
                    const { data, error } = await supabase
                        .from('offers')
                        .select('*')
                        .eq('is_active', true)
                        .gt('quantity_left', 0);

                    if (error) reject(error);
                    else resolve(data);
                } else {
                    resolve(null);
                }
            } catch (e) {
                reject(e);
            }
        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), window.CONFIG.FETCH_TIMEOUT_MS || 2000)
        );

        const data = await Promise.race([fetchPromise, timeoutPromise]);

        if (data && data.length > 0) {
            window.AppState.offers = data;
        } else {
            throw new Error('No data');
        }
    } catch (e) {
        console.log('Using demo data:', e.message);
        // Fallback to demo data
        window.AppState.offers = window.CONFIG.DEMO_OFFERS || [];
    }

    renderOffers(window.AppState.offers);
};

function renderOffers(list) {
    const container = document.getElementById('offersList');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = '<div class=\"loading\">No hay ofertas disponibles ðŸ˜”</div>';
        return;
    }

    container.innerHTML = list.map(o => {
        const discount = Utils.calculateDiscount(o.original_price, o.discount_price);
        const sanitizedTitle = Utils.sanitizeInput(o.title);
        const sanitizedRestaurant = Utils.sanitizeInput(o.restaurant_name);

        return `
            <article class=\"offer-card\" 
                     onclick=\"showOffer('${o.id}')\" 
                     tabindex=\"0\" 
                     role=\"button\"
                     aria-label=\"${sanitizedTitle} de ${sanitizedRestaurant}, ${discount}% de descuento\"
                     onkeypress=\"if(event.key==='Enter')showOffer('${o.id}')\">
                <div class=\"offer-img\" 
                     style=\"background-image: url('${o.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}')\"
                     role=\"img\"
                     aria-label=\"${sanitizedTitle}\">
                    <span class=\"offer-badge\" aria-label=\"Quedan ${o.quantity_left} unidades\">ðŸ”¥ Quedan ${o.quantity_left}</span>
                    <span class=\"offer-discount\" aria-label=\"${discount}% de descuento\">-${discount}%</span>
                </div>
                <div class=\"offer-content\">
                    <div class=\"offer-header\">
                        <span class=\"offer-name\">${sanitizedTitle}</span>
                        <div class=\"offer-rating\" aria-label=\"CalificaciÃ³n 4.8 estrellas\">â˜… 4.8</div>
                    </div>
                    <div class=\"offer-restaurant\">ðŸª ${sanitizedRestaurant}</div>
                    <div class=\"offer-time\" aria-label=\"Horario de recogida\">ðŸ•’ ${o.pickup_start} - ${o.pickup_end}</div>
                    <div class=\"offer-price\">
                        <span class=\"price-new\" aria-label=\"Precio ${o.discount_price} pesos\">${Utils.formatCurrency(o.discount_price)}</span>
                        <span class=\"price-old\" aria-label=\"Precio original ${o.original_price} pesos\">${Utils.formatCurrency(o.original_price)}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

window.showOffer = function (id) {
    window.AppState.currentOffer = window.AppState.offers.find(o => o.id == id);
    if (!window.AppState.currentOffer) return;

    window.AppState.quantity = 1;
    const offer = window.AppState.currentOffer;
    const discount = window.Utils.calculateDiscount(offer.original_price, offer.discount_price);

    // Update detail screen
    const detailImg = document.getElementById('detailImg');
    const detailTitle = document.getElementById('detailTitle');
    const detailRestaurant = document.getElementById('detailRestaurant');
    const detailDesc = document.getElementById('detailDesc');
    const detailTime = document.getElementById('detailTime');
    const detailStock = document.getElementById('detailStock');
    const detailDiscount = document.getElementById('detailDiscount');
    const qtyValue = document.getElementById('qtyValue');

    if (detailImg) detailImg.style.backgroundImage = `url('${offer.image_url}')`;
    if (detailTitle) detailTitle.textContent = offer.title;
    if (detailRestaurant) detailRestaurant.textContent = offer.restaurant_name;
    if (detailDesc) detailDesc.textContent = offer.description || 'Delicioso producto disponible para rescate.';
    if (detailTime) detailTime.textContent = `${offer.pickup_start} - ${offer.pickup_end}`;
    if (detailStock) detailStock.textContent = `${offer.quantity_left} disponibles`;
    if (detailDiscount) detailDiscount.textContent = `-${discount}%`;
    if (qtyValue) qtyValue.textContent = '1';

    updatePrice();
    showScreen('detailScreen');
};

window.changeQty = function (delta) {
    const newQty = window.AppState.quantity + delta;
    const maxQty = window.AppState.currentOffer?.quantity_left || 10;

    if (newQty >= 1 && newQty <= maxQty) {
        window.AppState.quantity = newQty;
        const qtyValue = document.getElementById('qtyValue');
        if (qtyValue) qtyValue.textContent = window.AppState.quantity;
        updatePrice();
    }
};

function updatePrice() {
    const totalPrice = document.getElementById('totalPrice');
    if (totalPrice && window.AppState.currentOffer) {
        totalPrice.textContent = window.Utils.formatCurrency(window.AppState.currentOffer.discount_price * window.AppState.quantity);
    }
}

// ========================================
// Reservations
// ========================================
// ========================================
// Reservations
// ========================================
window.reserveOffer = async function () {
    if (!window.AppState.currentOffer) return;

    const code = window.Utils.generatePickupCode();
    const offer = window.AppState.currentOffer;

    const order = {
        offer_id: offer.id,
        offer_title: offer.title,
        restaurant_name: offer.restaurant_name,
        user_email: window.AppState.currentUser?.email,
        user_name: window.AppState.currentUser?.name,
        quantity: window.AppState.quantity,
        total_price: offer.discount_price * window.AppState.quantity,
        saved: (offer.original_price - offer.discount_price) * window.AppState.quantity,
        commission: offer.discount_price * window.AppState.quantity * (window.CONFIG.COMMISSION_RATE || 0.25),
        pickup_code: code,
        pickup_time: `${offer.pickup_start} - ${offer.pickup_end}`,
        status: 'pending'
    };

    // Save to Supabase
    try {
        if (supabase) {
            await supabase.from('orders').insert([order]);
        }
    } catch (e) {
        console.warn('Supabase order save failed:', e);
    }

    // Save locally for offline/speed
    const orders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    orders.unshift({ ...order, created_at: new Date().toISOString() });
    localStorage.setItem('pancomido_orders', JSON.stringify(orders));

    // Show success modal
    const pickupCode = document.getElementById('pickupCode');
    if (pickupCode) pickupCode.textContent = code;

    // Generate WhatsApp link
    const msg = `Hola ${offer.restaurant_name}, reservÃ© *${window.AppState.quantity}x ${offer.title}* en Pan Comido. Mi cÃ³digo es *${code}*. Voy a recogerlo.`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    const waLink = document.getElementById('waLink');
    if (waLink) waLink.href = waUrl;

    const modal = document.getElementById('successModal');
    if (modal) modal.classList.add('show');
};

window.closeModal = function () {
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.remove('show');
    showScreen('ordersScreen');
};

// ========================================
// Orders Management
// ========================================
// ========================================
// Orders Management
// ========================================
window.loadOrders = async function () {
    const container = document.getElementById('ordersList');
    if (!container) return;

    container.innerHTML = '<div class=\"loading\"><div class=\"spinner\"></div>Cargando...</div>';

    let orders = [];

    // Fetch from Supabase
    try {
        if (supabase && window.AppState.currentUser) {
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_email', window.AppState.currentUser.email)
                .order('created_at', { ascending: false });

            if (data) orders = data;
        }
    } catch (e) {
        console.warn('Supabase orders fetch failed:', e);
    }

    // Merge with local orders
    const localOrders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    const orderMap = new Map();
    [...orders, ...localOrders].forEach(o => orderMap.set(o.pickup_code, o));
    const finalOrders = Array.from(orderMap.values())
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (finalOrders.length === 0) {
        container.innerHTML = '<div class=\"loading\">No tienes pedidos activos.</div>';
        return;
    }

    container.innerHTML = finalOrders.map(o => {
        const sanitizedRestaurant = window.Utils.sanitizeInput(o.restaurant_name);
        const sanitizedTitle = window.Utils.sanitizeInput(o.offer_title);

        return `
            <article class=\"order-card\" aria-label=\"Pedido de ${sanitizedTitle}\">
                <div class=\"order-top\">
                    <span class=\"order-restaurant\">${sanitizedRestaurant}</span>
                    <span class=\"order-status ${o.status === 'pending' ? 'status-pending' : 'status-completed'}\" 
                          role=\"status\">
                        ${o.status === 'pending' ? 'Pendiente' : 'Completado'}
                    </span>
                </div>
                <div class=\"order-item\">ðŸ›ï¸ ${o.quantity}x ${sanitizedTitle}</div>
                <div class=\"order-item\">ðŸ’° Total: <b>${window.Utils.formatCurrency(o.total_price)}</b></div>
                <div class=\"order-code\" aria-label=\"CÃ³digo de entrega ${o.pickup_code}\">
                    <div class=\"code-label\">CÃ³digo de entrega</div>
                    <div class=\"code-value\">${o.pickup_code}</div>
                </div>
                ${o.status === 'pending' ? `
                    <a href=\"https://wa.me/?text=${encodeURIComponent(`Hola, voy por mi pedido ${o.pickup_code} de ${o.offer_title}.`)}\" 
                       target=\"_blank\" 
                       rel=\"noopener noreferrer\"
                       class=\"btn-whatsapp\" 
                       style=\"margin-top:16px;\"
                       aria-label=\"Contactar restaurante por WhatsApp\">
                        <span aria-hidden=\"true\">ðŸ’¬</span> Contactar Restaurante
                    </a>
                ` : ''}
            </article>
        `;
    }).join('');
};

// ========================================
// Profile
// ========================================
window.updateProfile = function () {
    if (window.AppState.currentUser) {
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');

        if (profileName) profileName.textContent = window.AppState.currentUser.name;
        if (profileEmail) profileEmail.textContent = window.AppState.currentUser.email;
    }

    const orders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    const totalSaved = orders.reduce((sum, o) => sum + (o.saved || 0), 0);

    const userOrders = document.getElementById('userOrders');
    const userSaved = document.getElementById('userSaved');

    if (userOrders) userOrders.textContent = orders.length;
    if (userSaved) userSaved.textContent = window.Utils.formatCurrency(totalSaved);
};

// ========================================
// Toast Notifications
// ========================================
// ========================================
// Toast Notifications
// ========================================
window.showToast = function (message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#ef4444' : '#22c55e'};
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 2000;
        animation: slideUp 0.3s;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('successModal');
        if (modal?.classList.contains('show')) {
            closeModal();
        }
    }
});

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW registered:', reg.scope))
                .catch(err => console.error('SW registration failed:', err));
        });
    }

    // Auto-login if user exists
    if (AppState.currentUser) {
        showScreen('homeScreen');
    }
});

// Legacy support - make functions globally available
window.login = login;
window.loginGuest = loginGuest;
window.logout = logout;
window.showScreen = showScreen;
window.showOffer = showOffer;
window.changeQty = changeQty;
window.reserveOffer = reserveOffer;
window.closeModal = closeModal;
// ========================================
// PWA Install Logic - Debugged for Native
// ========================================
window.installPWA = async function () {
    // No-op or different logic for native
    console.log('Install PWA clicked');
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            closeInstall();
        }
        deferredPrompt = null;
    }
};

window.closeInstall = function () {
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'none';
};

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    // Add active class for touch feedback support
    document.addEventListener('touchstart', function () { }, true);

    // Register Service Worker only if NOT native
    const isNative = window.location.protocol === 'file:' || window.Capacitor;
    if (!isNative && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW registered:', reg.scope))
                .catch(err => console.error('SW registration failed:', err));
        });
    }

    if (isNative) {
        document.body.classList.add('is-native');
        console.log('Running in Native Mode');
        // Hide install prompt permanently in native
        const installPrompt = document.getElementById('installPrompt');
        if (installPrompt) installPrompt.style.display = 'none';

        // Hide PWA specifics
        const style = document.createElement('style');
        style.innerHTML = '.phone-frame { height: 100vh; max-width: 100%; box-shadow: none; border: none; }';
        document.head.appendChild(style);
    }

    // Auto-login if user exists
    if (window.AppState.currentUser) {
        showScreen('homeScreen');
    }

    // Attach Event Listeners explicitly (More robust than onclick attributes)
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', function (e) {
            e.preventDefault(); // Just in case
            window.login();
        });
        btnLogin.addEventListener('touchend', function (e) {
            e.preventDefault(); // Prevent double fire
            window.login();
        });
    }

    const btnGuest = document.getElementById('btnGuest');
    if (btnGuest) {
        btnGuest.addEventListener('click', function (e) {
            e.preventDefault();
            window.loginGuest();
        });
        btnGuest.addEventListener('touchend', function (e) {
            e.preventDefault();
            window.loginGuest();
        });
    }
});

</script>
</body>

</html> + Number(amount).toFixed(0);
    },

    /**
     * Calculate discount percentage
     * @param {number} original - Original price
     * @param {number} discounted - Discounted price
     * @returns {number} - Discount percentage
     */
    calculateDiscount(original, discounted) {
        return Math.round((1 - discounted / original) * 100);
    }
};

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG: window.CONFIG, Utils: window.Utils };
}

</script>
</head>

<body>
    <div class=\"phone-frame\">
        <!-- PWA Install Prompt -->
        <div class=\"install-prompt\" id=\"installPrompt\" role=\"dialog\" aria-label=\"Instalar aplicaciÃ³n\">
            <div class=\"install-content\">
                <div class=\"install-icon\" aria-hidden=\"true\">ðŸ“²</div>
                <div class=\"install-text\">
                    <div>Instalar App</div>
                    <div>Para una mejor experiencia</div>
                </div>
            </div>
            <div style=\"display: flex; align-items: center;\">
                <button class=\"btn-install\" onclick=\"installPWA()\" aria-label=\"Instalar Pan Comido\">Instalar</button>
                <button class=\"btn-close-install\" onclick=\"closeInstall()\" aria-label=\"Cerrar\">Ã—</button>
            </div>
        </div>

        <!-- Login Screen -->
        <div class=\"screen login-screen active\" id=\"loginScreen\" role=\"main\" aria-label=\"Pantalla de inicio de sesiÃ³n\">
            <div class=\"login-logo\" aria-hidden=\"true\">ðŸ•</div>
            <h1 class=\"login-title\">Pan Comido</h1>
            <p class=\"login-subtitle\">Rescata comida, ahorra dinero</p>
            <div class=\"login-form\">
                <div class=\"input-group\">
                    <label for=\"userName\" class=\"sr-only\">Tu nombre</label>
                    <input type=\"text\" placeholder=\"Tu nombre\" id=\"userName\" autocomplete=\"name\">
                </div>
                <div class=\"input-group\">
                    <label for=\"userEmail\" class=\"sr-only\">Tu correo electrÃ³nico</label>
                    <input type=\"email\" placeholder=\"Tu correo electrÃ³nico\" id=\"userEmail\" autocomplete=\"email\">
                </div>
                <button type=\"button\" class=\"btn-login\" id=\"btnLogin\">Continuar</button>
                <p class=\"login-divider\" aria-hidden=\"true\">â€” o â€”</p>
                <button type=\"button\" class=\"btn-login btn-guest\" id=\"btnGuest\">Continuar como
                    invitado</button>
            </div>
        </div>

        <!-- Home Screen -->
        <div class=\"screen\" id=\"homeScreen\" role=\"main\" aria-label=\"Pantalla principal\">
            <header class=\"header\">
                <div class=\"header-top\">
                    <div class=\"location\" aria-label=\"UbicaciÃ³n actual\">
                        <span aria-hidden=\"true\">ðŸ“</span> CDMX <span aria-hidden=\"true\">â–¾</span>
                    </div>
                    <div class=\"header-icons\">
                        <button onclick=\"loadOffers()\" aria-label=\"Recargar ofertas\">ðŸ”„</button>
                        <button onclick=\"showScreen('profileScreen')\" aria-label=\"Ver perfil\">ðŸ‘¤</button>
                    </div>
                </div>
                <div class=\"search-bar\" role=\"searchbox\" tabindex=\"0\" aria-label=\"Buscar comida\">
                    <span aria-hidden=\"true\">ðŸ”</span> Buscar comida...
                </div>
            </header>

            <nav class=\"categories\" aria-label=\"CategorÃ­as de comida\">
                <button class=\"cat-chip active\" data-cat=\"all\">ðŸ½ï¸ Todo</button>
                <button class=\"cat-chip\" data-cat=\"Pizza\">ðŸ• Pizza</button>
                <button class=\"cat-chip\" data-cat=\"Sushi\">ðŸ£ Sushi</button>
                <button class=\"cat-chip\" data-cat=\"PanaderÃ­a\">ðŸž Pan</button>
                <button class=\"cat-chip\" data-cat=\"Tacos\">ðŸŒ® Tacos</button>
            </nav>

            <main class=\"feed\">
                <div class=\"section-header\">
                    <h2 class=\"section-title\">ðŸ”¥ Ofertas hoy</h2>
                    <button class=\"see-all\" onclick=\"loadOffers()\">Ver todo</button>
                </div>
                <div id=\"offersList\" aria-live=\"polite\">
                    <div class=\"loading\">
                        <div class=\"spinner\" aria-hidden=\"true\"></div>
                        <span>Cargando ofertas...</span>
                    </div>
                </div>
            </main>

            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item active\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>

        <!-- Offer Detail Screen -->
        <div class=\"screen detail-screen\" id=\"detailScreen\" role=\"main\" aria-label=\"Detalle de oferta\">
            <div class=\"detail-header\" id=\"detailImg\">
                <div class=\"detail-overlay\"></div>
                <button class=\"detail-back\" onclick=\"showScreen('homeScreen')\" aria-label=\"Volver al inicio\">â†</button>
            </div>
            <div class=\"detail-content\">
                <div class=\"detail-badges\">
                    <span class=\"detail-badge\" id=\"detailDiscount\" aria-label=\"Descuento\">-67%</span>
                </div>
                <h1 class=\"detail-title\" id=\"detailTitle\">Cargando...</h1>
                <p class=\"detail-restaurant\" id=\"detailRestaurant\"></p>
                <p class=\"detail-desc\" id=\"detailDesc\"></p>
                <dl class=\"detail-info\">
                    <div class=\"info-row\">
                        <dt class=\"info-label\">ðŸ•’ Horario recogida</dt>
                        <dd class=\"info-value\" id=\"detailTime\"></dd>
                    </div>
                    <div class=\"info-row\">
                        <dt class=\"info-label\">ðŸ“¦ Disponibles</dt>
                        <dd class=\"info-value\" id=\"detailStock\"></dd>
                    </div>
                </dl>
                <div class=\"quantity-selector\" role=\"group\" aria-label=\"Selector de cantidad\">
                    <button class=\"qty-btn\" onclick=\"changeQty(-1)\" aria-label=\"Disminuir cantidad\">âˆ’</button>
                    <span class=\"qty-value\" id=\"qtyValue\" aria-live=\"polite\">1</span>
                    <button class=\"qty-btn\" onclick=\"changeQty(1)\" aria-label=\"Aumentar cantidad\">+</button>
                </div>
            </div>
            <footer class=\"detail-footer\">
                <div class=\"detail-total\">
                    <div class=\"total-label\">Total a pagar</div>
                    <div class=\"total-price\" id=\"totalPrice\" aria-live=\"polite\">$0</div>
                </div>
                <button class=\"btn-reserve\" onclick=\"reserveOffer()\" aria-label=\"Reservar este producto\">
                    Reservar <span aria-hidden=\"true\">ðŸ›’</span>
                </button>
            </footer>
        </div>

        <!-- Orders Screen -->
        <div class=\"screen\" id=\"ordersScreen\" style=\"background: var(--bg);\" role=\"main\" aria-label=\"Mis pedidos\">
            <header class=\"orders-header\">
                <h1 class=\"orders-title\">Mis Pedidos</h1>
            </header>
            <main class=\"orders-list\" id=\"ordersList\" aria-live=\"polite\">
                <div class=\"loading\">
                    <div class=\"spinner\" aria-hidden=\"true\"></div>
                    <span>Cargando pedidos...</span>
                </div>
            </main>
            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item active\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>

        <!-- Profile Screen -->
        <div class=\"screen\" id=\"profileScreen\" style=\"background: var(--bg);\" role=\"main\" aria-label=\"Mi perfil\">
            <div class=\"profile-header\">
                <div class=\"profile-avatar\" aria-hidden=\"true\">ðŸ‘¤</div>
                <h1 class=\"profile-name\" id=\"profileName\">Usuario</h1>
                <p class=\"profile-email\" id=\"profileEmail\">email@demo.com</p>
                <div class=\"profile-stats\">
                    <div class=\"profile-stat\">
                        <div class=\"stat-number\" id=\"userOrders\">0</div>
                        <div class=\"stat-label\">Pedidos</div>
                    </div>
                    <div class=\"profile-stat\">
                        <div class=\"stat-number\" id=\"userSaved\">$0</div>
                        <div class=\"stat-label\">Ahorrado</div>
                    </div>
                </div>
            </div>
            <main class=\"profile-content\">
                <div style=\"background: white; border-radius: 16px; overflow: hidden; margin-bottom: 20px;\">
                    <div class=\"profile-menu-item\">
                        <span>ðŸ”” Notificaciones</span>
                        <span style=\"color: var(--primary);\">Activado</span>
                    </div>
                    <div class=\"profile-menu-item\">
                        <span>ðŸ’³ MÃ©todos de pago</span>
                        <span aria-hidden=\"true\">â†’</span>
                    </div>
                    <div class=\"profile-menu-item\">
                        <span>â“ Ayuda y Soporte</span>
                        <span aria-hidden=\"true\">â†’</span>
                    </div>
                </div>
                <button onclick=\"logout()\"
                    style=\"width: 100%; padding: 16px; background: white; border: 1px solid #fee2e2; color: #ef4444; border-radius: 16px; font-weight: 600; cursor: pointer;\"
                    aria-label=\"Cerrar sesiÃ³n\">
                    Cerrar sesiÃ³n
                </button>
                <div style=\"text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8;\">
                    Pan Comido v1.0.3<br>Hecho con â¤ï¸ en MÃ©xico
                </div>
            </main>
            <nav class=\"bottom-nav\" aria-label=\"NavegaciÃ³n principal\">
                <button class=\"nav-item\" onclick=\"showScreen('homeScreen')\" aria-label=\"Inicio\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ </span>
                    <span>Inicio</span>
                </button>
                <button class=\"nav-item\" aria-label=\"Favoritos (prÃ³ximamente)\" disabled>
                    <span class=\"nav-icon\" aria-hidden=\"true\">â¤ï¸</span>
                    <span>Favoritos</span>
                </button>
                <button class=\"nav-item\" onclick=\"showScreen('ordersScreen')\" aria-label=\"Mis pedidos\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ§¾</span>
                    <span>Pedidos</span>
                </button>
                <button class=\"nav-item active\" onclick=\"showScreen('profileScreen')\" aria-label=\"Mi perfil\"
                    aria-current=\"page\">
                    <span class=\"nav-icon\" aria-hidden=\"true\">ðŸ‘¤</span>
                    <span>Perfil</span>
                </button>
            </nav>
        </div>
    </div>

    <!-- Success Modal -->
    <div class=\"modal-overlay\" id=\"successModal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modalTitle\">
        <div class=\"modal\">
            <span class=\"modal-icon\" aria-hidden=\"true\">ðŸŽ‰</span>
            <h2 class=\"modal-title\" id=\"modalTitle\">Â¡Reservado!</h2>
            <p class=\"modal-desc\">Muestra este cÃ³digo al recoger tu pedido.</p>
            <div class=\"modal-code\">
                <div class=\"modal-code-label\">CÃ“DIGO DE RECOGIDA</div>
                <div class=\"modal-code-value\" id=\"pickupCode\" aria-live=\"assertive\">ABC123</div>
            </div>
            <button class=\"modal-btn\" onclick=\"closeModal()\">Ver mis pedidos</button>
            <a href=\"#\" id=\"waLink\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"btn-whatsapp\"
                aria-label=\"Confirmar pedido por WhatsApp\">
                <span aria-hidden=\"true\">ðŸ’¬</span> Confirmar por WhatsApp
            </a>
        </div>
    </div>

    <!-- App Logic -->
    <script>
/**
 * Pan Comido App - Main Application Logic
 * PWA User Application JavaScript
 */

// Debug Helper for Native App
window.onerror = function (msg, url, line, col, error) {
    // Only show alert in native mode or if explicitly enabled
    if (window.location.protocol === 'file:' || window.Capacitor) {
        alert(\"Error: \" + msg + \"\nEn: \" + url + \" L:\" + line);
    }
    return false; // Let default handler run
};

// Ensure globals exist
window.CONFIG = window.CONFIG || {};
window.Utils = window.Utils || {
    // Fallback utils if config.js fails
    safeJSONParse: (str, fallback) => { try { return JSON.parse(str) } catch { return fallback } },
    sanitizeInput: (s) => s || '',
    isValidEmail: () => true,
    formatCurrency: (n) => '
</body>

</html> + n,
    calculateDiscount: () => 0,
    generatePickupCode: () => 'ERROR'
};

// ========================================
// Initialize Supabase
// ========================================
let supabase = null;
try {
    if (window.supabase && typeof window.CONFIG !== 'undefined' && window.CONFIG.SUPABASE_URL) {
        supabase = window.supabase.createClient(window.CONFIG.SUPABASE_URL, window.CONFIG.SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.warn('Supabase init failed:', e);
}

// ========================================
// Application State
// ========================================
window.AppState = {
    currentUser: window.Utils.safeJSONParse(localStorage.getItem('pancomido_user'), null),
    offers: [],
    currentOffer: null,
    quantity: 1
};

// ========================================
// PWA Install Logic
// ========================================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'flex';
});

async function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            const prompt = document.getElementById('installPrompt');
            if (prompt) prompt.style.display = 'none';
        }
        deferredPrompt = null;
    }
}

function closeInstall() {
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'none';
}

// ========================================
// Navigation
// ========================================
window.showScreen = function (screenId) {
    console.log('Showing screen:', screenId);
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Update navigation highlights
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const navMap = {
        'homeScreen': 0,
        'ordersScreen': 2,
        'profileScreen': 3
    };

    if (navMap[screenId] !== undefined) {
        const navs = document.querySelectorAll('.bottom-nav');
        navs.forEach(nav => {
            const items = nav.querySelectorAll('.nav-item');
            if (items[navMap[screenId]]) {
                items[navMap[screenId]].classList.add('active');
            }
        });
    }

    // Load screen data
    switch (screenId) {
        case 'homeScreen':
            loadOffers();
            break;
        case 'ordersScreen':
            loadOrders();
            break;
        case 'profileScreen':
            updateProfile();
            break;
    }
};

// ========================================
// Authentication
// ========================================
// Export functions to global scope explicitly
window.login = function () {
    // Alert for debugging
    if (window.location.protocol === 'file:' || window.Capacitor) {
        alert('Login function called!');
    }
    console.log('Login attempt');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');

    const name = window.Utils.sanitizeInput(nameInput?.value) || 'Usuario';
    const email = window.Utils.sanitizeInput(emailInput?.value) || 'demo@pancomido.mx';

    // Validate email
    if (email && !window.Utils.isValidEmail(email)) {
        if (window.location.protocol === 'file:' || window.Capacitor) {
            alert('Email invalido');
        }
        showToast('Por favor ingresa un email vÃ¡lido', 'error');
        return;
    }

    if (window.location.protocol === 'file:' || window.Capacitor) {
        alert('Logging in as: ' + name);
    }

    window.AppState.currentUser = { name, email };
    localStorage.setItem('pancomido_user', JSON.stringify(window.AppState.currentUser));
    showScreen('homeScreen');
};

window.loginGuest = function () {
    console.log('Guest login');
    window.AppState.currentUser = { name: 'Invitado', email: 'invitado@pancomido.mx' };
    localStorage.setItem('pancomido_user', JSON.stringify(window.AppState.currentUser));
    showScreen('homeScreen');
};

window.logout = function () {
    window.AppState.currentUser = null;
    localStorage.removeItem('pancomido_user');
    showScreen('loginScreen');
};

// ========================================
// Offers Management
// ========================================
window.loadOffers = async function () {
    const container = document.getElementById('offersList');
    if (!container) return;

    // Show loading skeleton
    container.innerHTML = `
        <div class=\"skeleton skeleton-card\"></div>
        <div class=\"skeleton skeleton-card\"></div>
    `;

    try {
        // Timeout race: max wait time for API
        const fetchPromise = new Promise(async (resolve, reject) => {
            try {
                if (supabase) {
                    const { data, error } = await supabase
                        .from('offers')
                        .select('*')
                        .eq('is_active', true)
                        .gt('quantity_left', 0);

                    if (error) reject(error);
                    else resolve(data);
                } else {
                    resolve(null);
                }
            } catch (e) {
                reject(e);
            }
        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), window.CONFIG.FETCH_TIMEOUT_MS || 2000)
        );

        const data = await Promise.race([fetchPromise, timeoutPromise]);

        if (data && data.length > 0) {
            window.AppState.offers = data;
        } else {
            throw new Error('No data');
        }
    } catch (e) {
        console.log('Using demo data:', e.message);
        // Fallback to demo data
        window.AppState.offers = window.CONFIG.DEMO_OFFERS || [];
    }

    renderOffers(window.AppState.offers);
};

function renderOffers(list) {
    const container = document.getElementById('offersList');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = '<div class=\"loading\">No hay ofertas disponibles ðŸ˜”</div>';
        return;
    }

    container.innerHTML = list.map(o => {
        const discount = Utils.calculateDiscount(o.original_price, o.discount_price);
        const sanitizedTitle = Utils.sanitizeInput(o.title);
        const sanitizedRestaurant = Utils.sanitizeInput(o.restaurant_name);

        return `
            <article class=\"offer-card\" 
                     onclick=\"showOffer('${o.id}')\" 
                     tabindex=\"0\" 
                     role=\"button\"
                     aria-label=\"${sanitizedTitle} de ${sanitizedRestaurant}, ${discount}% de descuento\"
                     onkeypress=\"if(event.key==='Enter')showOffer('${o.id}')\">
                <div class=\"offer-img\" 
                     style=\"background-image: url('${o.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}')\"
                     role=\"img\"
                     aria-label=\"${sanitizedTitle}\">
                    <span class=\"offer-badge\" aria-label=\"Quedan ${o.quantity_left} unidades\">ðŸ”¥ Quedan ${o.quantity_left}</span>
                    <span class=\"offer-discount\" aria-label=\"${discount}% de descuento\">-${discount}%</span>
                </div>
                <div class=\"offer-content\">
                    <div class=\"offer-header\">
                        <span class=\"offer-name\">${sanitizedTitle}</span>
                        <div class=\"offer-rating\" aria-label=\"CalificaciÃ³n 4.8 estrellas\">â˜… 4.8</div>
                    </div>
                    <div class=\"offer-restaurant\">ðŸª ${sanitizedRestaurant}</div>
                    <div class=\"offer-time\" aria-label=\"Horario de recogida\">ðŸ•’ ${o.pickup_start} - ${o.pickup_end}</div>
                    <div class=\"offer-price\">
                        <span class=\"price-new\" aria-label=\"Precio ${o.discount_price} pesos\">${Utils.formatCurrency(o.discount_price)}</span>
                        <span class=\"price-old\" aria-label=\"Precio original ${o.original_price} pesos\">${Utils.formatCurrency(o.original_price)}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

window.showOffer = function (id) {
    window.AppState.currentOffer = window.AppState.offers.find(o => o.id == id);
    if (!window.AppState.currentOffer) return;

    window.AppState.quantity = 1;
    const offer = window.AppState.currentOffer;
    const discount = window.Utils.calculateDiscount(offer.original_price, offer.discount_price);

    // Update detail screen
    const detailImg = document.getElementById('detailImg');
    const detailTitle = document.getElementById('detailTitle');
    const detailRestaurant = document.getElementById('detailRestaurant');
    const detailDesc = document.getElementById('detailDesc');
    const detailTime = document.getElementById('detailTime');
    const detailStock = document.getElementById('detailStock');
    const detailDiscount = document.getElementById('detailDiscount');
    const qtyValue = document.getElementById('qtyValue');

    if (detailImg) detailImg.style.backgroundImage = `url('${offer.image_url}')`;
    if (detailTitle) detailTitle.textContent = offer.title;
    if (detailRestaurant) detailRestaurant.textContent = offer.restaurant_name;
    if (detailDesc) detailDesc.textContent = offer.description || 'Delicioso producto disponible para rescate.';
    if (detailTime) detailTime.textContent = `${offer.pickup_start} - ${offer.pickup_end}`;
    if (detailStock) detailStock.textContent = `${offer.quantity_left} disponibles`;
    if (detailDiscount) detailDiscount.textContent = `-${discount}%`;
    if (qtyValue) qtyValue.textContent = '1';

    updatePrice();
    showScreen('detailScreen');
};

window.changeQty = function (delta) {
    const newQty = window.AppState.quantity + delta;
    const maxQty = window.AppState.currentOffer?.quantity_left || 10;

    if (newQty >= 1 && newQty <= maxQty) {
        window.AppState.quantity = newQty;
        const qtyValue = document.getElementById('qtyValue');
        if (qtyValue) qtyValue.textContent = window.AppState.quantity;
        updatePrice();
    }
};

function updatePrice() {
    const totalPrice = document.getElementById('totalPrice');
    if (totalPrice && window.AppState.currentOffer) {
        totalPrice.textContent = window.Utils.formatCurrency(window.AppState.currentOffer.discount_price * window.AppState.quantity);
    }
}

// ========================================
// Reservations
// ========================================
// ========================================
// Reservations
// ========================================
window.reserveOffer = async function () {
    if (!window.AppState.currentOffer) return;

    const code = window.Utils.generatePickupCode();
    const offer = window.AppState.currentOffer;

    const order = {
        offer_id: offer.id,
        offer_title: offer.title,
        restaurant_name: offer.restaurant_name,
        user_email: window.AppState.currentUser?.email,
        user_name: window.AppState.currentUser?.name,
        quantity: window.AppState.quantity,
        total_price: offer.discount_price * window.AppState.quantity,
        saved: (offer.original_price - offer.discount_price) * window.AppState.quantity,
        commission: offer.discount_price * window.AppState.quantity * (window.CONFIG.COMMISSION_RATE || 0.25),
        pickup_code: code,
        pickup_time: `${offer.pickup_start} - ${offer.pickup_end}`,
        status: 'pending'
    };

    // Save to Supabase
    try {
        if (supabase) {
            await supabase.from('orders').insert([order]);
        }
    } catch (e) {
        console.warn('Supabase order save failed:', e);
    }

    // Save locally for offline/speed
    const orders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    orders.unshift({ ...order, created_at: new Date().toISOString() });
    localStorage.setItem('pancomido_orders', JSON.stringify(orders));

    // Show success modal
    const pickupCode = document.getElementById('pickupCode');
    if (pickupCode) pickupCode.textContent = code;

    // Generate WhatsApp link
    const msg = `Hola ${offer.restaurant_name}, reservÃ© *${window.AppState.quantity}x ${offer.title}* en Pan Comido. Mi cÃ³digo es *${code}*. Voy a recogerlo.`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    const waLink = document.getElementById('waLink');
    if (waLink) waLink.href = waUrl;

    const modal = document.getElementById('successModal');
    if (modal) modal.classList.add('show');
};

window.closeModal = function () {
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.remove('show');
    showScreen('ordersScreen');
};

// ========================================
// Orders Management
// ========================================
// ========================================
// Orders Management
// ========================================
window.loadOrders = async function () {
    const container = document.getElementById('ordersList');
    if (!container) return;

    container.innerHTML = '<div class=\"loading\"><div class=\"spinner\"></div>Cargando...</div>';

    let orders = [];

    // Fetch from Supabase
    try {
        if (supabase && window.AppState.currentUser) {
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_email', window.AppState.currentUser.email)
                .order('created_at', { ascending: false });

            if (data) orders = data;
        }
    } catch (e) {
        console.warn('Supabase orders fetch failed:', e);
    }

    // Merge with local orders
    const localOrders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    const orderMap = new Map();
    [...orders, ...localOrders].forEach(o => orderMap.set(o.pickup_code, o));
    const finalOrders = Array.from(orderMap.values())
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (finalOrders.length === 0) {
        container.innerHTML = '<div class=\"loading\">No tienes pedidos activos.</div>';
        return;
    }

    container.innerHTML = finalOrders.map(o => {
        const sanitizedRestaurant = window.Utils.sanitizeInput(o.restaurant_name);
        const sanitizedTitle = window.Utils.sanitizeInput(o.offer_title);

        return `
            <article class=\"order-card\" aria-label=\"Pedido de ${sanitizedTitle}\">
                <div class=\"order-top\">
                    <span class=\"order-restaurant\">${sanitizedRestaurant}</span>
                    <span class=\"order-status ${o.status === 'pending' ? 'status-pending' : 'status-completed'}\" 
                          role=\"status\">
                        ${o.status === 'pending' ? 'Pendiente' : 'Completado'}
                    </span>
                </div>
                <div class=\"order-item\">ðŸ›ï¸ ${o.quantity}x ${sanitizedTitle}</div>
                <div class=\"order-item\">ðŸ’° Total: <b>${window.Utils.formatCurrency(o.total_price)}</b></div>
                <div class=\"order-code\" aria-label=\"CÃ³digo de entrega ${o.pickup_code}\">
                    <div class=\"code-label\">CÃ³digo de entrega</div>
                    <div class=\"code-value\">${o.pickup_code}</div>
                </div>
                ${o.status === 'pending' ? `
                    <a href=\"https://wa.me/?text=${encodeURIComponent(`Hola, voy por mi pedido ${o.pickup_code} de ${o.offer_title}.`)}\" 
                       target=\"_blank\" 
                       rel=\"noopener noreferrer\"
                       class=\"btn-whatsapp\" 
                       style=\"margin-top:16px;\"
                       aria-label=\"Contactar restaurante por WhatsApp\">
                        <span aria-hidden=\"true\">ðŸ’¬</span> Contactar Restaurante
                    </a>
                ` : ''}
            </article>
        `;
    }).join('');
};

// ========================================
// Profile
// ========================================
window.updateProfile = function () {
    if (window.AppState.currentUser) {
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');

        if (profileName) profileName.textContent = window.AppState.currentUser.name;
        if (profileEmail) profileEmail.textContent = window.AppState.currentUser.email;
    }

    const orders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    const totalSaved = orders.reduce((sum, o) => sum + (o.saved || 0), 0);

    const userOrders = document.getElementById('userOrders');
    const userSaved = document.getElementById('userSaved');

    if (userOrders) userOrders.textContent = orders.length;
    if (userSaved) userSaved.textContent = window.Utils.formatCurrency(totalSaved);
};

// ========================================
// Toast Notifications
// ========================================
// ========================================
// Toast Notifications
// ========================================
window.showToast = function (message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#ef4444' : '#22c55e'};
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 2000;
        animation: slideUp 0.3s;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('successModal');
        if (modal?.classList.contains('show')) {
            closeModal();
        }
    }
});

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW registered:', reg.scope))
                .catch(err => console.error('SW registration failed:', err));
        });
    }

    // Auto-login if user exists
    if (AppState.currentUser) {
        showScreen('homeScreen');
    }
});

// Legacy support - make functions globally available
window.login = login;
window.loginGuest = loginGuest;
window.logout = logout;
window.showScreen = showScreen;
window.showOffer = showOffer;
window.changeQty = changeQty;
window.reserveOffer = reserveOffer;
window.closeModal = closeModal;
// ========================================
// PWA Install Logic - Debugged for Native
// ========================================
window.installPWA = async function () {
    // No-op or different logic for native
    console.log('Install PWA clicked');
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            closeInstall();
        }
        deferredPrompt = null;
    }
};

window.closeInstall = function () {
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'none';
};

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    // Add active class for touch feedback support
    document.addEventListener('touchstart', function () { }, true);

    // Register Service Worker only if NOT native
    const isNative = window.location.protocol === 'file:' || window.Capacitor;
    if (!isNative && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW registered:', reg.scope))
                .catch(err => console.error('SW registration failed:', err));
        });
    }

    if (isNative) {
        document.body.classList.add('is-native');
        console.log('Running in Native Mode');
        // Hide install prompt permanently in native
        const installPrompt = document.getElementById('installPrompt');
        if (installPrompt) installPrompt.style.display = 'none';

        // Hide PWA specifics
        const style = document.createElement('style');
        style.innerHTML = '.phone-frame { height: 100vh; max-width: 100%; box-shadow: none; border: none; }';
        document.head.appendChild(style);
    }

    // Auto-login if user exists
    if (window.AppState.currentUser) {
        showScreen('homeScreen');
    }

    // Attach Event Listeners explicitly (More robust than onclick attributes)
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', function (e) {
            e.preventDefault(); // Just in case
            window.login();
        });
        btnLogin.addEventListener('touchend', function (e) {
            e.preventDefault(); // Prevent double fire
            window.login();
        });
    }

    const btnGuest = document.getElementById('btnGuest');
    if (btnGuest) {
        btnGuest.addEventListener('click', function (e) {
            e.preventDefault();
            window.loginGuest();
        });
        btnGuest.addEventListener('touchend', function (e) {
            e.preventDefault();
            window.loginGuest();
        });
    }
});

</script>
</body>

</html>
\";
