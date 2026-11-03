
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
