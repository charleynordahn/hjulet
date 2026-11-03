
import { focusAreas } from '../data/data.js';
import { icons } from '../assets/icons/icon.js';

const container = document.querySelector('#focus-areas-container');

// Accordion functionality
const setupAccordion = () => {
	const wrappers = document.querySelectorAll('.accordion-wrapper');

	wrappers.forEach(wrapper => {
		const button = wrapper.previousElementSibling;

		button.addEventListener('click', () => {
			const isOpen = wrapper.classList.contains('open');

			// Close all wrappers and remove active classes
			wrappers.forEach(item => {
				item.classList.remove('open');
				item.previousElementSibling.classList.remove('active');
			});

			// Open clicked wrapper if it wasn't already open
			if (!isOpen) {
				wrapper.classList.add('open');
				button.classList.add('active');
			}
		});
	});
};

// Render focus areas
const renderFocusAreas = () => {
	container.innerHTML = focusAreas.map(focusArea => `
		<section id="${focusArea.id}" class="focus-area-wrapper">
			<button class="focus-area-button">
				<div class="focus-area-icon">
					${icons[focusArea.icon]}
				</div>

				<div class="focus-area-title">
					${focusArea.title}
				</div>

				<span class="accordion-icon">
					${icons.chevronDown}
				</span>
			</button>

			<div class="accordion-wrapper">
				<hr>
				<div class="accordion-container">
				
					<ul>
						${focusArea.items.map(item => `
							<li>${item}</li>
						`).join('')}
					</ul>
				</div>
			</div>
		</section>
	`).join('');

	setupAccordion();
};


renderFocusAreas();

// ========================================
// DARK MODE
// ========================================

const darkModeToggle = document.querySelector('#darkmode-toggle');

// Load saved theme (light mode is default)
const savedTheme = localStorage.getItem('hjulet-theme') || 'light';

document.documentElement.dataset.theme = savedTheme;

// Update toggle icon
const updateToggleIcon = (theme) => {
	const isDark = theme === 'dark';

	darkModeToggle.innerHTML = isDark ? icons.toggleRight : icons.toggleLeft;
	darkModeToggle.setAttribute('aria-pressed', isDark);
	darkModeToggle.setAttribute(
		'aria-label',
		isDark ? 'Skift til light mode' : 'Skift til dark mode'
	);
};

// Set initial icon
updateToggleIcon(savedTheme);

// Toggle theme when clicked
darkModeToggle.addEventListener('click', () => {
	const isDark = document.documentElement.dataset.theme !== 'dark';
	const newTheme = isDark ? 'dark' : 'light';

	document.documentElement.dataset.theme = newTheme;
	localStorage.setItem('hjulet-theme', newTheme);

	updateToggleIcon(newTheme);
});
