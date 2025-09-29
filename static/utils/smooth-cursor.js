var smoothCursor = {
	isMobileView: function() {
		return window.matchMedia("(pointer: coarse)").matches;
	},
	settings: {
		indications: {
			fontSettings: {
				fontSize: 20
			}
		}
	},
	colors: {
		green: '#32a852',
		purple: '#b727e3',
		blue: '#1451ED',
		red: '#ed1826',
		orange: "#f07229",
		yellow: "#f0c829",
		pink: "#f55fe3",
		brown: "#7d3f1b",
		black: "#000",
		white: "#fff"
	},
	icons: {
		default: "hand-index-thumb",
		link: "arrow-up-left",
		close: "x-lg",
		arrows: {
			left:  "arrow-left",
			right: "arrow-right",
			up:    "arrow-up",
			down:  "arrow-down"
		},
		none: "",
		socials: {
			twitter: "twitter",
			x: "twitter-x",
			instagram: "instagram",
			threads: "threads",
			discord: "discord",
			youtube: "youtube",
			spotify: "spotify",
			apple: "apple",
			twitch: "twitch",
			github: "github",
			facebook: "facebook",
			messenger: "messenger",
			whatsapp: "whatsapp",
			meta: "meta",
			linkedin: "linkedin",
		}
	},
	indication: function(surfer, data) {
		const instance = surfer.instance;

		//Editables
		const icon = (data.icon === "none") ? "" : (data.icon || smoothCursor.icons.default);
		const iconSize   = (data.iconSize == 0) ? 0 : data.iconSize || 20;
		const size       = (data.size == 0) ? 0 : data.size || 10;

		const iconColor = data.iconColor || "#fff";
		const color     = data.color || "#000";

		//Events
		const enter = data.enter || null;
		const leave = data.leave || null;

		const click = data.click || null;

		document.querySelectorAll(data.interactibles).forEach(interactible => {
			if (click != null) {
				interactible.addEventListener('click', () => {
					data.click();
				})
			}

			interactible.addEventListener('mouseenter', () => {
				if (enter != null) {
					data.enter();
				}

				//Changes
				instance.querySelector('.status-icon sl-icon').setAttribute('name',icon);
				status_icon = instance.querySelector('.status-icon').style;
				status_icon.color = iconColor;

				instance.style.backgroundColor = color;
				document.documentElement.style.setProperty('--smooth-surfer-font-size', `${iconSize}px`);
				document.documentElement.style.setProperty('--smooth-surfer-size', `${size}px`);

				instance.querySelector('.status-icon sl-icon').classList.add('is-indicating');
			});

			interactible.addEventListener('mouseleave', () => {
				if (data.leave != null) {
					data.leave();
				}

				instance.querySelector('.status-icon sl-icon').setAttribute('name', smoothCursor.icons.none);

				instance.style.backgroundColor = surfer.color;
				document.documentElement.style.setProperty('--smooth-surfer-font-size', '20px');
				document.documentElement.style.setProperty('--smooth-surfer-size', '10px');

				instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
			});
		});
	},
	forceQuitIndication: function(instance) {
		document.querySelector(".ss-custom-cursor").querySelector('.status-icon sl-icon').classList.remove('is-indicating');
	},
	instantiate: function(data = {}) {
		function normalizedSpeed(speed, minSpeed = 1, maxSpeed = 100) {
            return (speed - minSpeed) / (maxSpeed - minSpeed);
        }

        function lerp(start, end, time) {
			return start + (end - start) * time;
		}

		//Cursor properties
		color = data.color      || "#000";
		size  = (data.size * 5) || 5;
		speed = normalizedSpeed(data.speed) || normalizedSpeed(17);
      
        enableMixBlendMode = data.enableMixBlendMode ? "mix-blend-mode: difference;" : "";
        
		disableOnScroll = data.disableOnScroll || false;

		syncWithLenis = data.syncWithLenis || false;

		document.documentElement.style.setProperty('--init-surfer-size', `${size}px`);

		document.documentElement.style.setProperty('--smooth-surfer-size', '10px');
		document.documentElement.style.setProperty('--smooth-surfer-font-size', '20px');

		const strictStyles = document.createElement('style');
        strictStyles.innerHTML = `
            *, *::before, *::after {
                cursor: none !important;
            }
            a, button, input, select, textarea, iframe {
                cursor: none !important;
            }
        `;
        document.head.appendChild(strictStyles);

        // MutationObserver to hide cursor on dynamically added elements
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        node.style.cursor = 'none';
                        node.querySelectorAll('*').forEach(el => el.style.cursor = 'none');
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

		//On callback, create "smoothCursorCursorPosition" item value to mosue position
		//If it doesn't already exist
		if (localStorage.getItem("smoothCursorCursorPosition") == null) {
			mouse = {
				x: innerWidth / 2,
				y: innerWidth / 2
			}
		} else {
			mouse = JSON.parse(localStorage.getItem("smoothCursorCursorPosition"));
		}

		localStorage.setItem("smoothCursorCursorPosition", JSON.stringify(mouse));

		target = {
			x: 0,
			y: 0
		}

		document.body.innerHTML += `
		<div class='ss-custom-cursor'>
			<div class='status-icon'>
				<sl-icon name='${smoothCursor.icons.default}'></sl-icon>
			</div>
		</div>
		`;

		// Instantiate custom styles to HEADER
		var styles = document.createElement('style');
		styles.innerHTML = `
		*, a, img, div, span, p, h1, h2, h3, h4, h5, h6, section, header, footer, aside, details, input {
			cursor: none;
		}

		a, button, input, select, textarea {
			cursor: none; /* Restore default cursor for interactive elements */
		}

		sl-input::part(base),
		sl-textarea::part(base),
		sl-select::part(base),
		sl-checkbox::part(base),
		sl-drawer::part(base),
		sl-drawer::part(close-button__base),
		sl-radio::part(base),
		sl-switch::part(base),
		sl-range::part(base),
		sl-copy-button::part(button),
		sl-date-picker::part(base),
		sl-time-picker::part(base),
		sl-color-picker::part(base),
		sl-input-group::part(base) { cursor: none; }

		.is-indicating {
			font-size: var(--smooth-surfer-font-size);
			padding: var(--smooth-surfer-size);
		}

		.ss-custom-cursor {
			background: ${color};
			display: none;
			justify-content: center;
			align-items: center;
			padding: var(--init-surfer-size);
			border-radius: 100%;
			box-shadow: 0px 0px 15px 0px rgba(255,255,255,0.3);
			position: absolute;
			z-index: 100000000000000;
			pointer-events: none; /* Ensure the custom cursor does not block interactions */
            ${enableMixBlendMode}
		}

		.ss-custom-cursor .status-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 0px;
			color: #fff;
		}

		.ss-custom-cursor .status-icon sl-icon {
			transition: all 250ms ease-in-out;
		}
		`;

		document.head.appendChild(styles);

		document.body.addEventListener('mousemove', (event) => {
			mouse.x = event.clientX;
			mouse.y = event.clientY;

			localStorage.setItem("smoothCursorCursorPosition", JSON.stringify(mouse));
		});

		instance  = document.querySelector('.ss-custom-cursor');

		data = {
			color: color,
			size: size,
			speed: speed,
			disableOnScroll: disableOnScroll,
			instance: instance,
			syncWithLenis: syncWithLenis,
			enableMixBlendMode: enableMixBlendMode,
		}

		if (disableOnScroll) {
			document.addEventListener('scroll',() => {
				console.log("SUP");
				instance.style.display = '!important none';
			});

			document.addEventListener('scrollend',() => {
				instance.style.display = 'flex';
			});
		}

		let isScrolling;
		let hasScrolled = false;

		document.addEventListener('scroll',() => {
			if (!hasScrolled) {
                hasScrolled = true;
                instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
            }

            // Clear our timeout throughout the scroll
            window.clearTimeout(isScrolling);

            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(() => {
                hasScrolled = false;
            }, 100); // Adjust the timeout as needed
		});

		// Hide cursor if not in body
		document.body.addEventListener('mouseenter', () => {
			instance.style.display = 'flex';
		});

		document.body.addEventListener('mouseleave', () => {
		    // Remove the 'is-indicating' class when the mouse leaves the body
		    instance.style.backgroundColor = color;
		    instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
		});

		function update_cursor_position() {
			localStorage.setItem("smoothCursorCursorPosition", JSON.stringify(mouse));

			// Offset the position to center the cursor
			const cursorWidth  = instance.offsetWidth;
			const cursorHeight = instance.offsetHeight;

			const scrollX = window.scrollX || window.pageXOffset;
    		const scrollY = window.scrollY || window.pageYOffset;

    		const mouseX = mouse.x + scrollX;
    		const mouseY = mouse.y + scrollY;

    		target.x = lerp(target.x, mouseX, speed);
			target.y = lerp(target.y, mouseY, speed);

			instance.style.top  = `${target.y - cursorHeight / 2}px`;
			instance.style.left = `${target.x - cursorWidth / 2}px`;

			if (!syncWithLenis) {
				requestAnimationFrame(update_cursor_position);
			}
		}

		// Hover effect
		document.querySelectorAll('[pointer-indicator]').forEach(trigger => {
			trigger.addEventListener('mouseenter', () => {
				instance.querySelector('.status-icon sl-icon').setAttribute('name',smoothCursor.icons.default);
				instance.querySelector('.status-icon sl-icon').classList.add('is-indicating');
			});

			trigger.addEventListener('mouseleave', () => {
				instance.style.backgroundColor = color;
				instance.querySelector('.status-icon sl-icon').classList.remove('is-indicating');
			});
		});

		// 👇 Hook into Lenis if enabled
		if (syncWithLenis && window.lenis) {
			window.lenis.on('scroll', () => {
				update_cursor_position();
			});
			// also run once immediately
			update_cursor_position();
		} else {
			requestAnimationFrame(update_cursor_position);
		}

		return data;
	}
};