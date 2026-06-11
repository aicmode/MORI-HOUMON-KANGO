// =========================================================
// 森の訪問看護ステーション 共通スクリプト
// - ハンバーガーメニュー
// - ヘッダーのスクロール時シャドウ
// - スクロール時のふわっと表示
// - FAQアコーディオン
// - お問い合わせフォーム（デモ送信）
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------
  // ハンバーガーメニュー
  // ---------------------------------------------------------
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('nav');

  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.classList.remove('is-open');
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'メニューを開く');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.classList.toggle('is-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    // メニュー内のリンクを押したら閉じる
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // メニューの外側をタップしたら閉じる
    document.addEventListener('click', (event) => {
      if (
        nav.classList.contains('is-open') &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // ---------------------------------------------------------
  // ヘッダー：スクロール時にうっすら影をつける
  // ---------------------------------------------------------
  const header = document.getElementById('header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------------------------------------------------------
  // スクロール時のふわっと表示
  // ---------------------------------------------------------
  const fadeTargets = document.querySelectorAll('.fade-in');

  if (fadeTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeTargets.forEach((target) => observer.observe(target));
  }

  // ---------------------------------------------------------
  // FAQアコーディオン
  // ---------------------------------------------------------
  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.toggle('is-open');
      question.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // ---------------------------------------------------------
  // お問い合わせフォーム（デモ：実送信なし）
  // ---------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formComplete = document.getElementById('formComplete');

  if (contactForm && formComplete) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // 必須項目の簡易チェック
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      contactForm.hidden = true;
      formComplete.hidden = false;
      formComplete.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

});
