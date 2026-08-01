/* ==========================================================================
   Birthday OS v2.0 - Super VIP Interactive Logic
   Upgrades:
     1. Heart Trail Cursor + Cherry Blossoms + 3D Tilt Card
     3. Polaroid Photo Burst + Lightbox
     4. Wax Seal Envelope + Decorative Candles
     5. Fireworks Rainbow Text + Canvas HB Banner
     + Nhạc nền tự động phát khi bấm nút mở
   Pronouns: Anh - Em
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 💡 DANH SÁCH ẢNH TRONG HỘP QUÀ (BẠN CÓ THỂ TỰ DO THÊM/SỬA/XÓA ẢNH TẠI ĐÂY)
    // ==========================================================================
    const myCustomGiftPhotos = [
        { url: 'cun1.jpg', title: '' },
        { url: 'cun2.jpg', title: '' },
        { url: 'cun3.jpg', title: '' },
        { url: 'cun4.jpg', title: '' },
        { url: 'cun5.jpg', title: '' },
        { url: 'cun6.jpg', title: '' },
        { url: 'cun7.jpg', title: '' },
        { url: 'cun8.jpg', title: '' }
    ];

    // Tilt directions alternating
    const tiltDirections = ['-3deg', '3deg', '-2deg', '4deg', '-4deg', '2deg'];

    // ==========================================================================
    // NÂNG CẤP 1A: HEART TRAIL CON TRỎ
    // ==========================================================================
    const cursor = document.getElementById('cursor-sparkle');
    const heartEmojis = ['💗', '💕', '💖', '🌸', '✨'];

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top  = `${e.clientY}px`;

        // Tạo vệt tim rơi mỗi lần di chuột (throttled)
        if (Math.random() < 0.3) {
            const trail = document.createElement('div');
            trail.className = 'heart-trail';
            trail.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            trail.style.left = `${e.clientX}px`;
            trail.style.top  = `${e.clientY}px`;
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 850);
        }
    });

    // ==========================================================================
    // NÂNG CẤP 1B: HOA ĐÀO RƠI (CHERRY BLOSSOMS)
    // ==========================================================================
    const blossomEmojis = ['🌸', '🌺', '🌷', '✿', '❀'];
    function spawnBlossom() {
        const b = document.createElement('div');
        b.className = 'cherry-blossom';
        b.innerText = blossomEmojis[Math.floor(Math.random() * blossomEmojis.length)];
        b.style.left = `${Math.random() * 98}vw`;
        const dur = 6 + Math.random() * 8;
        b.style.animationDuration = `${dur}s`;
        b.style.animationDelay = `${Math.random() * 2}s`;
        b.style.fontSize = `${12 + Math.random() * 14}px`;
        document.getElementById('floating-decorations').appendChild(b);
        setTimeout(() => b.remove(), (dur + 2) * 1000);
    }
    setInterval(spawnBlossom, 1200);

    // ==========================================================================
    // NÂNG CẤP 1C: 3D TILT GLOW CARD ON MOUSEMOVE
    // ==========================================================================
    function initTiltCard(el) {
        if (!el) return;
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top  + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width  / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            const tiltX = -dy * 8;
            const tiltY =  dx * 8;
            el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            el.style.boxShadow = `
                ${-tiltY * 2}px ${tiltX * 2}px 40px rgba(255,94,156,0.22),
                0 20px 60px rgba(255,94,156,0.12)
            `;
            // Move shine spot
            const shine = el.querySelector('::before') || el;
            el.style.setProperty('--shine-x', `${(dx + 1) * 50}%`);
            el.style.setProperty('--shine-y', `${(dy + 1) * 50}%`);
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.boxShadow = '';
        });
    }

    initTiltCard(document.getElementById('hero-tilt-card'));
    initTiltCard(document.querySelector('.outro-box'));

    // --- Floating Hearts & Balloons ---
    const decorContainer = document.getElementById('floating-decorations');
    const floatEmojis = ['❤️', '💖', '🎈', '✨', '🧸'];
    function createFloatingDecor() {
        const item = document.createElement('div');
        item.className = 'floating-item';
        item.innerText = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
        item.style.left = `${Math.random() * 95}vw`;
        item.style.animationDuration = `${8 + Math.random() * 8}s`;
        decorContainer.appendChild(item);
        setTimeout(() => item.remove(), 16000);
    }
    setInterval(createFloatingDecor, 2800);

    // --- Web Audio API Synthesizer ---
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function playTone(freq, type = 'sine', duration = 0.3) {
        try {
            if (!audioCtx) audioCtx = new AudioCtx();
            const osc  = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch(e) {}
    }

    function playPop()      { playTone(587.33, 'sine', 0.15); }
    function playWinChime() {
        [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
            setTimeout(() => playTone(f, 'triangle', 0.4), i * 120);
        });
    }
    function playPageRustle() {
        // Soft rustle: rapid short tones
        for (let i = 0; i < 5; i++) {
            setTimeout(() => playTone(300 + Math.random() * 200, 'triangle', 0.08), i * 40);
        }
    }

    // --- OS Bootup Progress Sequence ---
    const bootStatus   = document.getElementById('boot-status-text');
    const bootProgress = document.getElementById('boot-progress');
    const bootScreen   = document.getElementById('boot-screen');
    const osRoot       = document.getElementById('os-root');

    const bootSteps = [
        { text: 'Đang khởi tạo Happy Birthday...', percent: '25%'  },
        { text: 'Đang tải ký ức ngọt ngào...',       percent: '65%'  },
        { text: 'Đang chuẩn bị điều bất ngờ...',     percent: '100%' }
    ];

    let currentStep = 0;
    const bootInterval = setInterval(() => {
        if (currentStep < bootSteps.length) {
            bootStatus.innerText          = bootSteps[currentStep].text;
            bootProgress.style.width      = bootSteps[currentStep].percent;
            playPop();
            currentStep++;
        } else {
            clearInterval(bootInterval);
            setTimeout(() => {
                bootScreen.classList.add('hidden');
                osRoot.classList.remove('hidden');
            }, 600);
        }
    }, 900);

    // --- Hero Button Click & VisionOS Transition ---
    const btnShowMe      = document.getElementById('btn-show-me');
    const visionModal    = document.getElementById('vision-modal');
    const mainExperience = document.getElementById('main-experience');

    // --- Nhạc nền xuyên suốt — tổng hợp Lofi bằng Web Audio API ---
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    let musicPlaying = false;
    let musicLoopTimer = null;
    let masterGain = null;

    // Giai điệu Happy Birthday lofi nhẹ nhàng (note frequencies + durations)
    const melody = [
        // Happy Birthday verse (C major, soft lofi)
        { f: 261.6, d: 0.35 }, { f: 261.6, d: 0.12 },
        { f: 293.7, d: 0.5  }, { f: 261.6, d: 0.5  },
        { f: 349.2, d: 0.5  }, { f: 329.6, d: 1.0  },
        { f: 261.6, d: 0.35 }, { f: 261.6, d: 0.12 },
        { f: 293.7, d: 0.5  }, { f: 261.6, d: 0.5  },
        { f: 392.0, d: 0.5  }, { f: 349.2, d: 1.0  },
        { f: 261.6, d: 0.35 }, { f: 261.6, d: 0.12 },
        { f: 523.3, d: 0.5  }, { f: 440.0, d: 0.5  },
        { f: 349.2, d: 0.5  }, { f: 329.6, d: 0.5  },
        { f: 293.7, d: 0.5  }, { f: 0,     d: 0.2  },
        { f: 466.2, d: 0.35 }, { f: 466.2, d: 0.12 },
        { f: 440.0, d: 0.5  }, { f: 349.2, d: 0.5  },
        { f: 392.0, d: 0.5  }, { f: 349.2, d: 1.2  },
    ];

    function playLofiNote(freq, duration, startTime, gainNode) {
        if (freq === 0) return; // rest
        if (!audioCtx) audioCtx = new AudioCtx();

        // Oscillator chính (sine mềm)
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        // Overtone nhẹ (triangle) để có màu âm lofi
        const osc2 = audioCtx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, startTime);

        const noteGain = audioCtx.createGain();
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.55, startTime + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.9);

        const noteGain2 = audioCtx.createGain();
        noteGain2.gain.setValueAtTime(0.07, startTime);
        noteGain2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.6);

        osc.connect(noteGain);   noteGain.connect(gainNode);
        osc2.connect(noteGain2); noteGain2.connect(gainNode);

        osc.start(startTime);   osc.stop(startTime + duration);
        osc2.start(startTime);  osc2.stop(startTime + duration);
    }

    function scheduleMelody() {
        if (!musicPlaying) return;
        if (!audioCtx) audioCtx = new AudioCtx();

        // Master gain fade-in
        if (!masterGain) {
            masterGain = audioCtx.createGain();
            // Reverb-like: convolver approximation via delay
            const delay = audioCtx.createDelay(0.3);
            delay.delayTime.value = 0.18;
            const delayGain = audioCtx.createGain();
            delayGain.gain.value = 0.18;
            masterGain.connect(audioCtx.destination);
            masterGain.connect(delay);
            delay.connect(delayGain);
            delayGain.connect(audioCtx.destination);
        }

        masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.22, audioCtx.currentTime + 2);

        let t = audioCtx.currentTime + 0.1;
        let totalDuration = 0;
        melody.forEach(note => {
            playLofiNote(note.f, note.d, t, masterGain);
            t += note.d + 0.04;
            totalDuration += note.d + 0.04;
        });

        // Lặp lại sau khi melody kết thúc
        musicLoopTimer = setTimeout(() => {
            if (musicPlaying) scheduleMelody();
        }, totalDuration * 1000);
    }

    function startMusic() {
        if (musicPlaying) return;
        if (!audioCtx) audioCtx = new AudioCtx();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        musicPlaying = true;
        musicToggleBtn.innerText = '🔊';
        scheduleMelody();
    }

    function stopMusic() {
        musicPlaying = false;
        musicToggleBtn.innerText = '🔇';
        if (musicLoopTimer) clearTimeout(musicLoopTimer);
        if (masterGain) {
            masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
            setTimeout(() => { masterGain = null; }, 600);
        }
    }

    musicToggleBtn.addEventListener('click', () => {
        if (musicPlaying) stopMusic(); else startMusic();
    });

    btnShowMe.addEventListener('click', () => {
        playPop();
        visionModal.classList.remove('hidden');
        startMusic();

        setTimeout(() => {
            visionModal.classList.add('hidden');
            mainExperience.classList.remove('hidden-fade');
            mainExperience.classList.add('show');
            document.getElementById('section-gift').scrollIntoView({ behavior: 'smooth' });
            if (typeof confetti === 'function') {
                confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            }
        }, 1800);
    });

    // ==========================================================================
    // NÂNG CẤP 3: POLAROID PHOTO BURST + LIGHTBOX
    // ==========================================================================
    const giftBox          = document.getElementById('3d-gift-box');
    const giftRewardsModal = document.getElementById('gift-rewards-modal');
    const stringRail       = document.getElementById('string-rail');
    const photoHangRow     = document.getElementById('photo-hang-row');

    // Lightbox
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg     = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose   = document.getElementById('lightbox-close');

    function openLightbox(url, title) {
        lightboxImg.src           = url;
        lightboxCaption.innerText = title;
        lightboxOverlay.classList.remove('hidden');
        playTone(880, 'sine', 0.2);
    }

    lightboxClose.addEventListener('click', () => lightboxOverlay.classList.add('hidden'));
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) lightboxOverlay.classList.add('hidden');
    });

    // -----------------------------------------------------------------------
    // PHOTO STRING THEATER — Bay Lên & Treo Dây Đèn Hội
    // -----------------------------------------------------------------------
    function buildStringTheater() {
        const photos  = myCustomGiftPhotos;
        const railW   = photoHangRow.offsetWidth || 700;

        // --- 1. Dây treo đèn hội ---
        const lightColors  = ['#FFD86B','#FF5E9C','#A78BFA','#38BDF8','#FB923C','#F472B6'];
        const lightEmojis  = ['💛','🩷','💜','🩵','🧡','❤️'];
        const numLights    = 10;
        stringRail.innerHTML = '';
        for (let i = 0; i < numLights; i++) {
            const light = document.createElement('div');
            light.className = 'fairy-light';
            light.innerText = lightEmojis[i % lightEmojis.length];
            light.style.left  = `${(i / (numLights - 1)) * 90 + 5}%`;
            light.style.setProperty('--light-color', lightColors[i % lightColors.length]);
            light.style.setProperty('--blink-dur',   `${0.8 + Math.random() * 1.6}s`);
            light.style.setProperty('--blink-delay', `${Math.random() * 1.5}s`);
            stringRail.appendChild(light);
        }

        const swayPairs = [
            { from: '-4deg', to: '3deg' },
            { from: '3deg',  to: '-4deg' },
            { from: '-3deg', to: '4deg' },
            { from: '2deg',  to: '-5deg' },
            { from: '-5deg', to: '2deg' },
        ];

        // Clear cũ
        photoHangRow.innerHTML = '';
        giftRewardsModal.classList.remove('hidden');

        photos.forEach((photo, i) => {
            const restRot = (Math.random() - 0.5) * 8; // -4 → +4 deg
            const flyDelay = 0.08 + i * 0.15;          // stagger

            const el = document.createElement('div');
            el.className = 'hang-photo fly-up';

            el.style.setProperty('--fly-delay',  `${flyDelay}s`);
            el.style.setProperty('--start-rot',  `${(Math.random() - 0.5) * 20}deg`);
            el.style.setProperty('--rest-rot',   `${restRot}deg`);

            el.innerHTML = `
                <img src="${photo.url}" alt="Cún Photo" loading="lazy">
                ${photo.title ? `<div class="hang-photo-caption">${photo.title}</div>` : ''}
            `;
            el.addEventListener('click', () => openLightbox(photo.url, photo.title));
            photoHangRow.appendChild(el);

            // Sau khi pop up xong -> chuyen sang sway
            setTimeout(() => {
                el.classList.remove('fly-up');
                el.classList.add('hanging');

                setTimeout(() => {
                    el.classList.add('sway');
                    const sp = swayPairs[i % swayPairs.length];
                    el.style.setProperty('--sway-from',  sp.from);
                    el.style.setProperty('--sway-to',    sp.to);
                    el.style.setProperty('--sway-dur',   `${2.8 + Math.random() * 1.8}s`);
                    el.style.setProperty('--sway-delay', `${Math.random() * 1.5}s`);
                }, 100);
            }, (flyDelay + 0.65) * 1000);
        });
    }

    giftBox.addEventListener('click', () => {
        if (!giftBox.classList.contains('opened')) {
            giftBox.classList.add('opened');
            playWinChime();

            // Confetti vụ nổ lớn từ hộp quà
            if (typeof confetti === 'function') {
                confetti({ particleCount: 80,  spread: 60, angle: 90,  origin: { x: 0.5, y: 0.7 } });
                setTimeout(() => confetti({ particleCount: 60, spread: 80, angle: 60,  origin: { x: 0.2, y: 0.6 } }), 150);
                setTimeout(() => confetti({ particleCount: 60, spread: 80, angle: 120, origin: { x: 0.8, y: 0.6 } }), 300);
            }

            // Chờ chút rồi build theater
            setTimeout(buildStringTheater, 500);
        }
    });



    // ==========================================================================
    // NÂNG CẤP 4: CON DẤU SÁP + PHONG BÌ + NẾN TRANG TRÍ
    // ==========================================================================
    const envelopeTrigger   = document.getElementById('envelope-trigger');
    const waxSeal           = document.getElementById('wax-seal');
    const typewriterElement = document.getElementById('letter-typewriter-text');
    const candleDecorRow    = document.getElementById('candle-decor-row');

    const letterText = `Chúc mừng sinh nhật nhé! 🎉

Cảm ơn vì đã luôn mang đến những nụ cười, những khoảnh khắc vui vẻ và trở thành một phần thật đẹp trong cuộc sống.

Mong tuổi mới sẽ có thật nhiều sức khỏe, niềm vui, bình an và mọi điều tốt đẹp. Hy vọng mỗi ngày đều sẽ có thật nhiều lý do để mỉm cười.

Chúc em một tuổi mới thật hạnh phúc! ❤️`;

    let typed = false;

    // Chỉ trigger khi bấm con dấu sáp
    waxSeal.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!envelopeTrigger.classList.contains('open')) {
            // Hiệu ứng vỡ dấu sáp
            waxSeal.classList.add('broken');
            playPageRustle();
            playTone(440, 'triangle', 0.4);

            setTimeout(() => {
                envelopeTrigger.classList.add('open');
                // Hiện nến trang trí
                candleDecorRow.classList.add('visible');
                candleDecorRow.querySelectorAll('.candle-decor').forEach(c => {
                    c.style.opacity = '1';
                });

                if (!typed) {
                    typed = true;
                    let charIdx = 0;
                    typewriterElement.innerText = '';
                    const typeInterval = setInterval(() => {
                        if (charIdx < letterText.length) {
                            typewriterElement.innerText += letterText.charAt(charIdx);
                            charIdx++;
                        } else {
                            clearInterval(typeInterval);
                        }
                    }, 35);
                }
            }, 500);
        }
    });

    const letterCloseBtn = document.getElementById('letter-close-btn');

    // Nút đóng lá thư
    letterCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        envelopeTrigger.classList.remove('open');
        waxSeal.classList.remove('broken');
        candleDecorRow.classList.remove('visible');
        candleDecorRow.querySelectorAll('.candle-decor').forEach(c => {
            c.style.opacity = '0';
        });
        playPop();
    });

    // Click vào phong bì cũng mở (trừ khi đã open)
    envelopeTrigger.addEventListener('click', () => {
        if (!envelopeTrigger.classList.contains('open')) {
            waxSeal.click();
        }
    });

    // --- Make a Wish & Blow Candle ---
    const wishStar            = document.getElementById('wish-star');
    const starsWishStage      = document.getElementById('stars-wish-stage');
    const countdownWishStage  = document.getElementById('countdown-wish-stage');
    const countdownNum        = document.getElementById('countdown-num');
    const wishAcceptedScreen  = document.getElementById('wish-accepted-screen');

    wishStar.addEventListener('click', () => {
        playWinChime();
        starsWishStage.classList.add('hidden');
        countdownWishStage.classList.remove('hidden');

        let count = 5;
        countdownNum.innerText = count;
        const countTimer = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNum.innerText = count;
                playTone(440 + (5 - count) * 80, 'sine', 0.2);
            } else {
                clearInterval(countTimer);
                countdownNum.innerText = '🎉';
                playWinChime();

                // Bắn pháo hoa + confetti ngay lập tức!
                launchFireworksCanvas();
                wishAcceptedScreen.classList.remove('hidden');

                if (typeof confetti === 'function') {
                    const end = Date.now() + 4500;
                    (function frame() {
                        confetti({ particleCount: 7, angle: 60,  spread: 55, origin: { x: 0 } });
                        confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
                        if (Date.now() < end) requestAnimationFrame(frame);
                    }());
                }

                setTimeout(() => wishAcceptedScreen.classList.add('hidden'), 5000);
            }
        }, 1000);
    });

    // ==========================================================================
    // NÂNG CẤP 5: FIREWORKS CANVAS + RAINBOW HB TEXT
    // ==========================================================================
    function launchFireworksCanvas() {
        const canvas = document.getElementById('fx-canvas');
        const ctx    = canvas.getContext('2d');
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#FF5E9C', '#FFD86B', '#a78bfa', '#38bdf8', '#fb923c', '#f472b6'];

        for (let i = 0; i < 200; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 6;
            particles.push({
                x:  canvas.width  * (0.2 + Math.random() * 0.6),
                y:  canvas.height * (0.2 + Math.random() * 0.4),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                alpha: 1,
                radius: 2 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                gravity: 0.12
            });
        }

        let frame = 0;
        function animateFireworks() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.x  += p.vx;
                p.y  += p.vy;
                p.vy += p.gravity;
                p.alpha -= 0.012;
                if (p.alpha <= 0) return;
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle   = p.color;
                ctx.shadowBlur  = 8;
                ctx.shadowColor = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            frame++;
            if (frame < 200) requestAnimationFrame(animateFireworks);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        animateFireworks();
    }


    // --- Gacha Machine ---
    const spinGachaBtn  = document.getElementById('spin-gacha-btn');
    const slot1         = document.getElementById('slot-1');
    const slot2         = document.getElementById('slot-2');
    const slot3         = document.getElementById('slot-3');
    const gachaResult   = document.getElementById('gacha-result');
    const gachaPrizeText = document.getElementById('gacha-prize-text');

    const slotEmojis = ['❤️', '💖', '🎁', '⭐', '🧸'];

    spinGachaBtn.addEventListener('click', () => {
        spinGachaBtn.disabled = true;
        gachaResult.classList.add('hidden');

        let intervalCount = 0;
        const spinInterval = setInterval(() => {
            slot1.innerText = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
            slot2.innerText = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
            slot3.innerText = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
            playPop();
            intervalCount++;

            if (intervalCount > 15) {
                clearInterval(spinInterval);
                slot1.innerText = '❤️';
                slot2.innerText = '💖';
                slot3.innerText = '❤️';
                gachaPrizeText.innerText = 'EM SẼ ĐƯỢC YÊU THƯƠNG THẬT NHIỀU ❤️✨';
                gachaResult.classList.remove('hidden');
                playWinChime();
                spinGachaBtn.disabled = false;
                if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 60 });
            }
        }, 100);
    });

});
