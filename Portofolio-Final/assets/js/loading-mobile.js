document.addEventListener('DOMContentLoaded', () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const loader = document.getElementById('loader');
    const body = document.body;

    const hideLoader = () => {
        if (!loader) return;
        loader.classList.add('zoom-out');
        body.classList.remove('loading');

        // Pastikan loader benar-benar hilang setelah animasi
        setTimeout(() => {
            loader.classList.add('hide');
            loader.style.visibility = 'hidden';
            loader.style.zIndex = '-1';
            // Hapus loader dari DOM setelah animasi selesai
            loader.remove();
        }, 400);
    };

    // Mulai proses loading
    const startLoading = () => {
        const letters = document.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            const delay = isMobile ? index * 0.08 : index * 0.1;
            letter.style.animationDelay = `${delay}s`;
        });

        // Waktu loading lebih singkat
        setTimeout(hideLoader, isMobile ? 1000 : 1500);
    };

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && loader && !loader.classList.contains('hide')) {
            hideLoader();
        }
    });

    // Mulai animasi loading
    if (loader) {
        startLoading();
    } else {
        // If loader is not found, ensure body is not loading
        body.classList.remove('loading');
    }
});