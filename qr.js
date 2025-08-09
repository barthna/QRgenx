document.addEventListener('DOMContentLoaded', function() {
            // Hide loader after 1.5 seconds
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loader').style.display = 'none';
                }, 500);
            }, 1500);

            // Theme toggle functionality
            const themeToggle = document.querySelector('.theme-toggle');
            const themeIcon = document.getElementById('theme-icon');
            const body = document.body;
            
            // Check for saved theme preference or use preferred color scheme
            const savedTheme = localStorage.getItem('theme') || 
                            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            body.setAttribute('data-theme', savedTheme);
            themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            
            themeToggle.addEventListener('click', () => {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                body.setAttribute('data-theme', newTheme);
                themeIcon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
                localStorage.setItem('theme', newTheme);
            });

            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // File upload handling
            const fileUpload = document.getElementById('file-upload');
            const fileName = document.getElementById('file-name');
            const clearFileBtn = document.getElementById('clear-file');
            const imagePreview = document.getElementById('image-preview');
            const qrContent = document.getElementById('qr-content');
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('progress-bar');
            const logoOptions = document.getElementById('logo-options');
            const logoSizeSlider = document.getElementById('logo-size');
            const logoSizeValue = document.getElementById('logo-size-value');
            const shapeOptions = document.querySelectorAll('.shape-option');
            let selectedShape = 'circle';
            
            // Update logo size percentage display
            logoSizeSlider.addEventListener('input', function() {
                logoSizeValue.textContent = this.value + '%';
            });
            
            // Shape selection
            shapeOptions.forEach(option => {
                option.addEventListener('click', function() {
                    shapeOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    selectedShape = this.dataset.shape;
                });
            });
            
            // Emoji picker functionality
            const emojiToggle = document.getElementById('emoji-toggle');
            const emojiPicker = document.getElementById('emoji-picker');
            
            // Common emojis
            const emojis = [
                '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
                '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
                '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸',
                '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️',
                '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡',
                '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓',
                '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄',
                '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵',
                '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠',
                '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽',
                '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀',
                '😿', '😾', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤',
                '🤍', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝',
                '💟', '💌', '💤', '💢', '💣', '💥', '💦', '💨', '💫', '💬',
                '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟',
                '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎',
                '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏',
                '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻',
                '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄', '👶', '🧒',
                '👦', '👧', '🧑', '👨', '👩', '🧔', '👱', '🧓', '👴', '👵',
                '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🧏', '🙇', '🤦', '🤷',
                '👮', '🕵️', '💂', '👷', '🤴', '👸', '👳', '👲', '🧕', '🤵',
                '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🦸', '🦹', '🧙', '🧚',
                '🧛', '🧜', '🧝', '🧞', '🧟', '💆', '💇', '🚶', '🏃', '💃',
                '🕺', '🕴️', '👯', '🧖', '🧗', '🤺', '🏇', '⛷️', '🏂', '🏌️',
                '🏄', '🚣', '🏊', '⛹️', '🏋️', '🚴', '🚵', '🤸', '🤼', '🤽',
                '🤾', '🤹', '🧘', '🛀', '🛌', '👭', '👫', '👬', '💏', '💑',
                '👪', '🗣️', '👤', '👥', '🫂', '👣', '🦠', '🧬', '🧫', '🧪',
                '🌍', '🌎', '🌏', '🌐', '🗺️', '🗾', '🧭', '🏔️', '⛰️', '🌋',
                '🗻', '🏕️', '🏖️', '🏜️', '🏝️', '🏞️', '🏟️', '🏛️', '🏗️', '🧱',
                '🏘️', '🏚️', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨',
                '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒', '🗼', '🗽',
                '⛪', '🕌', '🛕', '🕍', '⛩️', '🕋', '⛲', '⛺', '🌁', '🌃',
                '🏙️', '🌄', '🌅', '🌆', '🌇', '🌉', '♨️', '🎠', '🎡', '🎢',
                '💈', '🎪', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉',
                '🚊', '🚝', '🚞', '🚋', '🚌', '🚍', '🚎', '🚐', '🚑', '🚒',
                '🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚙', '🚚', '🚛', '🚜',
                '🏎️', '🏍️', '🛵', '🦽', '🦼', '🛺', '🚲', '🛴', '🚏', '🛣️',
                '🛤️', '🛢️', '⛽', '🚨', '🚥', '🚦', '🛑', '🚧', '⚓', '⛵',
                '🛶', '🚤', '🛳️', '⛴️', '🛥️', '🚢', '✈️', '🛩️', '🛫', '🛬',
                '🪂', '💺', '🚁', '🚟', '🚠', '🚡', '🛰️', '🚀', '🛸', '🛎️',
                '🧳', '⌛', '⏳', '⌚', '⏰', '⏱️', '⏲️', '🕰️', '🌡️', '⛱️',
                '🧨', '🎈', '🎉', '🎊', '🎎', '🎏', '🎐', '🎀', '🎁', '🎫',
                '🏆', '🏅', '🥇', '🥈', '🥉', '⚽', '⚾', '🥎', '🏀', '🏐',
                '🏈', '🏉', '🎾', '🥏', '🎳', '🏏', '🏑', '🏒', '🥍', '🏓',
                '🏸', '🥊', '🥋', '🥅', '⛳', '🎣', '🤿', '🎽', '🎿', '🛷',
                '🥌', '🎯', '🪀', '🪁', '🎱', '🔮', '🪄', '🧿', '🎮', '🕹️',
                '🎰', '🎲', '🧩', '🧸', '🪅', '🪆', '♠️', '♥️', '♦️', '♣️',
                '♟️', '🃏', '🀄', '🎴', '🎭', '🖼️', '🎨', '🧵', '🧶', '🪡',
                '🪢', '👓', '🕶️', '🥽', '🥼', '🦺', '👔', '👕', '👖', '🧣',
                '🧤', '🧥', '🧦', '👗', '👘', '🥻', '🩱', '🩲', '🩳', '👙',
                '👚', '👛', '👜', '👝', '🛍️', '🎒', '🩴', '👞', '👟', '🥾',
                '🥿', '👠', '👡', '🩰', '👢', '👑', '👒', '🎩', '🎓', '🧢',
                '🪖', '⛑️', '💄', '💍', '💼', '🪙', '💰', '💴', '💵', '💶',
                '💷', '💸', '💳', '🧾', '💹', '✉️', '📧', '📨', '📩', '📤',
                '📥', '📦', '📫', '📪', '📬', '📭', '📮', '🗳️', '✏️', '✒️',
                '🖋️', '🖊️', '🖌️', '🖍️', '📝', '📁', '📂', '🗂️', '📅', '📆',
                '🗒️', '🗓️', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎',
                '🖇️', '📏', '📐', '✂️', '🗃️', '🗄️', '🗑️', '🔒', '🔓', '🔏',
                '🔐', '🔑', '🗝️', '🔨', '🪓', '⛏️', '⚒️', '🛠️', '🗡️', '⚔️',
                '🔫', '🪃', '🏹', '🛡️', '🪚', '🔧', '🪛', '🔩', '⚙️', '🗜️',
                '⚖️', '🦯', '🔗', '⛓️', '🪝', '🧰', '🧲', '🪜', '⚗️', '🧪',
                '🧫', '🧬', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺',
                '🚪', '🛏️', '🛋️', '🪑', '🚽', '🪠', '🚿', '🛁', '🪤', '🪒',
                '🧴', '🧷', '🧹', '🧺', '🧻', '🪣', '🧼', '🫁', '🫀', '🧽',
                '🧯', '🛒', '🚬', '⚰️', '🪦', '⚱️', '🗿', '🪧', '🏧', '🚮',
                '🚰', '♿', '🚹', '🚺', '🚻', '🚼', '🚾', '🛂', '🛃', '🛄',
                '🛅', '⚠️', '🚸', '⛔', '🚫', '🚳', '🚭', '🚯', '🚱', '🚷',
                '📵', '🔞', '☢️', '☣️', '⬆️', '↗️', '➡️', '↘️', '⬇️', '↙️',
                '⬅️', '↖️', '↕️', '↔️', '↩️', '↪️', '⤴️', '⤵️', '🔃', '🔄',
                '🔙', '🔚', '🔛', '🔜', '🔝', '🛐', '⚛️', '🕉️', '✡️', '☸️',
                '☯️', '✝️', '☦️', '☪️', '☮️', '🕎', '🔯', '♈', '♉', '♊',
                '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎',
                '🔀', '🔁', '🔂', '▶️', '⏩', '⏭️', '⏯️', '◀️', '⏪', '⏮️',
                '🔼', '⏫', '🔽', '⏬', '⏸️', '⏹️', '⏺️', '⏏️', '🎦', '🔅',
                '🔆', '📶', '📳', '📴', '♀️', '♂️', '⚧️', '✖️', '➕', '➖',
                '➗', '♾️', '‼️', '⁉️', '❓', '❔', '❕', '❗', '〰️', '💱',
                '💲', '⚕️', '♻️', '⚜️', '🔱', '📛', '🔰', '⭕', '✅', '☑️',
                '✔️', '❌', '❎', '➰', '➿', '〽️', '✳️', '✴️', '❇️', '©️',
                '®️', '™️', '#️⃣', '*️⃣', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣',
                '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔠', '🔡', '🔢', '🔣',
                '🔤', '🅰️', '🅱️', '🆎', '🆑', '🆒', '🆓', 'ℹ️', '🆔', 'Ⓜ️',
                '🆕', '🆖', '🅾️', '🆗', '🅿️', '🆘', '🆙', '🆚', '🈁', '🈂️',
                '🈷️', '🈶', '🈯', '🉐', '🈹', '🈚', '🈲', '🉑', '🈸', '🈴',
                '🈳', '㊗️', '㊙️', '🈺', '🈵', '🔴', '🟠', '🟡', '🟢', '🔵',
                '🟣', '🟤', '⚫', '⚪', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪',
                '🟫', '⬛', '⬜', '◼️', '◻️', '◾', '◽', '▪️', '▫️', '🔶',
                '🔷', '🔸', '🔹', '🔺', '🔻', '💠', '🔘', '🔳', '🔲', '🏁',
                '🚩', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️'
            ];
            
            // Populate emoji picker
            emojis.forEach(emoji => {
                const emojiOption = document.createElement('div');
                emojiOption.className = 'emoji-option';
                emojiOption.textContent = emoji;
                emojiOption.addEventListener('click', function() {
                    qrContent.value += emoji;
                    emojiPicker.classList.remove('active');
                });
                emojiPicker.appendChild(emojiOption);
            });
            
            // Toggle emoji picker
            emojiToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                emojiPicker.classList.toggle('active');
            });
            
            // Close emoji picker when clicking elsewhere
            document.addEventListener('click', function() {
                emojiPicker.classList.remove('active');
            });
            
            fileUpload.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    fileName.textContent = file.name;
                    clearFileBtn.style.display = 'flex';
                    logoOptions.style.display = 'block';
                    
                    // Check file size (limit to 15MB)
                    if (file.size > 15 * 1024 * 1024) {
                        alert('For optimal performance, please use images smaller than 15MB');
                        this.value = '';
                        fileName.textContent = 'No file selected';
                        clearFileBtn.style.display = 'none';
                        logoOptions.style.display = 'none';
                        return;
                    }
                    
                    // Show image preview
                    progressContainer.style.display = 'block';
                    progressBar.style.width = '0%';
                    
                    const reader = new FileReader();
                    
                    reader.onprogress = function(e) {
                        if (e.lengthComputable) {
                            const percentLoaded = Math.round((e.loaded / e.total) * 100);
                            progressBar.style.width = percentLoaded + '%';
                        }
                    };
                    
                    reader.onload = function(e) {
                        progressBar.style.width = '100%';
                        setTimeout(() => {
                            progressContainer.style.display = 'none';
                        }, 500);
                        
                        imagePreview.src = e.target.result;
                        imagePreview.style.display = 'block';
                    }
                    
                    reader.onerror = function() {
                        alert('Error reading file. Please try another image.');
                        progressContainer.style.display = 'none';
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            clearFileBtn.addEventListener('click', function() {
                fileUpload.value = '';
                fileName.textContent = 'No file selected';
                imagePreview.style.display = 'none';
                logoOptions.style.display = 'none';
                clearFileBtn.style.display = 'none';
                progressContainer.style.display = 'none';
            });

            // Clear all button
            document.getElementById('clear-all').addEventListener('click', function() {
                fileUpload.value = '';
                fileName.textContent = 'No file selected';
                imagePreview.style.display = 'none';
                qrContent.value = '';
                clearFileBtn.style.display = 'none';
                logoOptions.style.display = 'none';
                document.getElementById('qr-placeholder').style.display = 'flex';
                document.getElementById('qr-result').style.display = 'none';
                document.getElementById('download-btn').disabled = true;
                document.getElementById('share-btn').disabled = true;
                progressContainer.style.display = 'none';
            });

            // QR Code Generation with logo support
            const generateBtn = document.getElementById('generate-btn');
            const downloadBtn = document.getElementById('download-btn');
            const shareBtn = document.getElementById('share-btn');
            const qrColor = document.getElementById('qr-color');
            const bgColor = document.getElementById('bg-color');
            const qrSize = document.getElementById('qr-size');
            const qrPlaceholder = document.getElementById('qr-placeholder');
            const qrResult = document.getElementById('qr-result');
            
            generateBtn.addEventListener('click', generateQRCode);
            
            function generateQRCode() {
                const content = qrContent.value.trim();
                
                if (!content) {
                    alert('Please enter some content or upload an image');
                    return;
                }
                
                // Check content length (approximate)
                if (content.length > 100000) {
                    if (!confirm('This is a very large content. Generating may take longer. Continue?')) {
                        return;
                    }
                }
                
                // Show loading state
                generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
                generateBtn.disabled = true;
                
                // Generate QR code after a small delay to show loading state
                setTimeout(() => {
                    const size = parseInt(qrSize.value);
                    const options = {
                        color: {
                            dark: qrColor.value,
                            light: bgColor.value
                        },
                        width: size,
                        margin: 2,
                        errorCorrectionLevel: 'H' // High error correction for better logo support
                    };
                    
                    // First generate the basic QR code
                    QRCode.toDataURL(content, options, function(error, url) {
                        if (error) {
                            console.error(error);
                            alert('Error generating QR code. Please try with different content or smaller image.');
                            resetGenerateButton();
                            return;
                        }
                        
                        // If no logo is uploaded, just display the QR code
                        if (!fileUpload.files[0]) {
                            displayQRCode(url);
                            return;
                        }
                        
                        // If logo is uploaded, combine it with the QR code
                        combineQRWithLogo(url);
                    });
                }, 500);
            }
            
            function combineQRWithLogo(qrUrl) {
                const logoFile = fileUpload.files[0];
                const logoSizePercentage = parseInt(logoSizeSlider.value) / 100;
                const qrSize = parseInt(document.getElementById('qr-size').value);
                
                // Create canvas for final QR code with logo
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = qrSize;
                canvas.height = qrSize;
                
                // Load QR code image
                const qrImage = new Image();
                qrImage.onload = function() {
                    // Draw QR code on canvas
                    ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);
                    
                    // Load logo image
                    const logoImage = new Image();
                    logoImage.onload = function() {
                        // Calculate logo size (percentage of QR code size)
                        const logoWidth = qrSize * logoSizePercentage;
                        const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
                        
                        // Calculate position to center the logo
                        const logoX = (qrSize - logoWidth) / 2;
                        const logoY = (qrSize - logoHeight) / 2;
                        
                        // Draw white background for logo
                        const padding = logoWidth * 0.1; // 10% padding
                        ctx.fillStyle = bgColor.value;
                        
                        // Draw background shape based on selection
                        if (selectedShape === 'circle') {
                            ctx.beginPath();
                            ctx.arc(
                                logoX + logoWidth/2, 
                                logoY + logoHeight/2, 
                                Math.max(logoWidth, logoHeight)/2 + padding/2, 
                                0, 
                                Math.PI * 2
                            );
                            ctx.fill();
                        } else if (selectedShape === 'rounded') {
                            const radius = 10;
                            ctx.beginPath();
                            ctx.moveTo(logoX - padding + radius, logoY - padding);
                            ctx.lineTo(logoX + logoWidth + padding - radius, logoY - padding);
                            ctx.quadraticCurveTo(
                                logoX + logoWidth + padding, 
                                logoY - padding, 
                                logoX + logoWidth + padding, 
                                logoY - padding + radius
                            );
                            ctx.lineTo(logoX + logoWidth + padding, logoY + logoHeight + padding - radius);
                            ctx.quadraticCurveTo(
                                logoX + logoWidth + padding, 
                                logoY + logoHeight + padding, 
                                logoX + logoWidth + padding - radius, 
                                logoY + logoHeight + padding
                            );
                            ctx.lineTo(logoX - padding + radius, logoY + logoHeight + padding);
                            ctx.quadraticCurveTo(
                                logoX - padding, 
                                logoY + logoHeight + padding, 
                                logoX - padding, 
                                logoY + logoHeight + padding - radius
                            );
                            ctx.lineTo(logoX - padding, logoY - padding + radius);
                            ctx.quadraticCurveTo(
                                logoX - padding, 
                                logoY - padding, 
                                logoX - padding + radius, 
                                logoY - padding
                            );
                            ctx.closePath();
                            ctx.fill();
                        } else { // square
                            ctx.fillRect(
                                logoX - padding, 
                                logoY - padding, 
                                logoWidth + padding * 2, 
                                logoHeight + padding * 2
                            );
                        }
                        
                        // Draw logo on canvas
                        ctx.save();
                        
                        // Apply shape mask to logo
                        if (selectedShape === 'circle') {
                            ctx.beginPath();
                            ctx.arc(
                                logoX + logoWidth/2, 
                                logoY + logoHeight/2, 
                                Math.max(logoWidth, logoHeight)/2, 
                                0, 
                                Math.PI * 2
                            );
                            ctx.closePath();
                            ctx.clip();
                        } else if (selectedShape === 'rounded') {
                            const radius = 8;
                            ctx.beginPath();
                            ctx.moveTo(logoX + radius, logoY);
                            ctx.lineTo(logoX + logoWidth - radius, logoY);
                            ctx.quadraticCurveTo(
                                logoX + logoWidth, 
                                logoY, 
                                logoX + logoWidth, 
                                logoY + radius
                            );
                            ctx.lineTo(logoX + logoWidth, logoY + logoHeight - radius);
                            ctx.quadraticCurveTo(
                                logoX + logoWidth, 
                                logoY + logoHeight, 
                                logoX + logoWidth - radius, 
                                logoY + logoHeight
                            );
                            ctx.lineTo(logoX + radius, logoY + logoHeight);
                            ctx.quadraticCurveTo(
                                logoX, 
                                logoY + logoHeight, 
                                logoX, 
                                logoY + logoHeight - radius
                            );
                            ctx.lineTo(logoX, logoY + radius);
                            ctx.quadraticCurveTo(
                                logoX, 
                                logoY, 
                                logoX + radius, 
                                logoY
                            );
                            ctx.closePath();
                            ctx.clip();
                        }
                        
                        ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);
                        ctx.restore();
                        
                        // Convert canvas to image and display
                        const finalUrl = canvas.toDataURL('image/png', 1.0); // Highest quality
                        displayQRCode(finalUrl);
                    };
                    
                    logoImage.src = URL.createObjectURL(logoFile);
                };
                
                qrImage.src = qrUrl;
            }
            
            function displayQRCode(url) {
                // Hide placeholder and show QR code
                qrPlaceholder.style.display = 'none';
                qrResult.src = url;
                qrResult.style.display = 'block';
                
                // Enable download and share buttons
                downloadBtn.disabled = false;
                shareBtn.disabled = false;
                resetGenerateButton();
                
                // Add animation
                qrResult.classList.add('fade-in');
                setTimeout(() => {
                    qrResult.classList.remove('fade-in');
                }, 500);
                
                // Add confetti effect
                createConfetti();
            }
            
            function resetGenerateButton() {
                generateBtn.innerHTML = '<i class="fas fa-qrcode"></i> Generate QR Code';
                generateBtn.disabled = false;
            }
            
            // Create confetti effect
            function createConfetti() {
                const colors = ['#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e', '#74b9ff'];
                
                for (let i = 0; i < 75; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.width = Math.random() * 12 + 6 + 'px';
                    confetti.style.height = Math.random() * 12 + 6 + 'px';
                    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
                    document.body.appendChild(confetti);
                    
                    // Remove confetti after animation
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }
            }
            
            // Download QR code
            downloadBtn.addEventListener('click', function() {
                if (!qrResult.src) return;
                
                const link = document.createElement('a');
                link.download = 'qr-code-' + Date.now() + '.png';
                link.href = qrResult.src;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Downloaded!';
                tooltip.style.position = 'fixed';
                tooltip.style.bottom = '30px';
                tooltip.style.right = '30px';
                tooltip.style.backgroundColor = 'var(--primary-color)';
                tooltip.style.color = 'white';
                tooltip.style.padding = '12px 24px';
                tooltip.style.borderRadius = '8px';
                tooltip.style.zIndex = '1000';
                tooltip.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => {
                        tooltip.remove();
                    }, 500);
                }, 2500);
            });
            
            // Share functionality
            const shareOptions = document.getElementById('share-options');
            const whatsappShare = document.getElementById('whatsapp-share');
            const facebookShare = document.getElementById('facebook-share');
            const twitterShare = document.getElementById('twitter-share');
            const emailShare = document.getElementById('email-share');
            const copyLink = document.getElementById('copy-link');
            
            // Show/hide share options on click
            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                shareOptions.style.display = shareOptions.style.display === 'block' ? 'none' : 'block';
            });
            
            // Close share options when clicking elsewhere
            document.addEventListener('click', function() {
                shareOptions.style.display = 'none';
            });
            
            // Share via different platforms
            whatsappShare.addEventListener('click', function(e) {
                e.preventDefault();
                if (!qrResult.src) return;
                shareQR('whatsapp');
            });
            
            facebookShare.addEventListener('click', function(e) {
                e.preventDefault();
                if (!qrResult.src) return;
                shareQR('facebook');
            });
            
            twitterShare.addEventListener('click', function(e) {
                e.preventDefault();
                if (!qrResult.src) return;
                shareQR('twitter');
            });
            
            emailShare.addEventListener('click', function(e) {
                e.preventDefault();
                if (!qrResult.src) return;
                shareQR('email');
            });
            
            copyLink.addEventListener('click', function(e) {
                e.preventDefault();
                if (!qrResult.src) return;
                copyToClipboard();
            });
            
            function shareQR(platform) {
                const text = "Check out this QR code I generated using QRGenX Ultra!";
                const url = qrResult.src;
                
                switch(platform) {
                    case 'whatsapp':
                        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
                        break;
                    case 'facebook':
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
                        break;
                    case 'twitter':
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                        break;
                    case 'email':
                        const subject = "QR Code I Generated with QRGenX Ultra";
                        const body = `${text}\n\n${url}`;
                        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        break;
                }
            }
            
            function copyToClipboard() {
                navigator.clipboard.writeText(qrResult.src)
                    .then(() => {
                        // Show tooltip
                        const tooltip = document.createElement('div');
                        tooltip.textContent = 'Copied to clipboard!';
                        tooltip.style.position = 'fixed';
                        tooltip.style.bottom = '30px';
                        tooltip.style.right = '30px';
                        tooltip.style.backgroundColor = 'var(--primary-color)';
                        tooltip.style.color = 'white';
                        tooltip.style.padding = '12px 24px';
                        tooltip.style.borderRadius = '8px';
                        tooltip.style.zIndex = '1000';
                        tooltip.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        document.body.appendChild(tooltip);
                        
                        setTimeout(() => {
                            tooltip.style.opacity = '0';
                            setTimeout(() => {
                                tooltip.remove();
                            }, 500);
                        }, 2500);
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        alert('Failed to copy link. Please try again.');
                    });
            }
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Scroll to generator when clicking start button
            document.getElementById('start-generating').addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector('.generator-section').scrollIntoView({
                    behavior: 'smooth'
                });
            });
            
            // Contact form submission
            document.getElementById('contact-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Here you would typically send the form data to a server
                // For this example, we'll just show a success message
                alert(`Thank you, ${name}! Your message has been sent. We'll contact you at ${email} soon.`);
                this.reset();
            });
            
            // Animate sections when scrolling
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.container, .hero-content, .hero-image, .feature-card, .step, .contact-form');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.classList.add('slide-up');
                    }
                });
            };
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Run once on page load
        });