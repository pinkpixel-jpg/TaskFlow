/* ==========================================================================
   TaskFlow Pro — Custom Confirm Dialog
   ========================================================================== */

export const confirmAction = (title, message, confirmText = 'Confirm') => {
  return new Promise((resolve) => {
    const container = document.getElementById('confirm-container');
    if (!container) {
      resolve(false);
      return;
    }

    container.innerHTML = `
      <div class="confirm-box">
        <h3 class="confirm-title">${title}</h3>
        <p class="confirm-message">${message}</p>
        <div class="confirm-buttons">
          <button class="btn-secondary" id="confirm-btn-cancel">Cancel</button>
          <button class="btn-danger" id="confirm-btn-ok">${confirmText}</button>
        </div>
      </div>
    `;

    container.classList.add('active');

    // Focus on cancel by default (safe choice)
    const cancelBtn = document.getElementById('confirm-btn-cancel');
    const okBtn = document.getElementById('confirm-btn-ok');
    
    if (cancelBtn) cancelBtn.focus();

    const handleCancel = (e) => {
      e.stopPropagation();
      cleanup();
      resolve(false);
    };

    const handleConfirm = (e) => {
      e.stopPropagation();
      cleanup();
      resolve(true);
    };

    const handleOverlayClick = (e) => {
      if (e.target === container) {
        cleanup();
        resolve(false);
      }
    };

    const cleanup = () => {
      container.classList.remove('active');
      cancelBtn.removeEventListener('click', handleCancel);
      okBtn.removeEventListener('click', handleConfirm);
      container.removeEventListener('click', handleOverlayClick);
      // clear html content
      setTimeout(() => {
        container.innerHTML = '';
      }, 300);
    };

    cancelBtn.addEventListener('click', handleCancel);
    okBtn.addEventListener('click', handleConfirm);
    container.addEventListener('click', handleOverlayClick);
  });
};
