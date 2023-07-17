/*
	Photon by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
			loadTexts("eng")
		});

	// Scrolly.
		$('.scrolly').scrolly();

})(jQuery);

function translateTexts(language) {
	loadTexts(language)
}

function loadTexts(language) {
	fetch(`./assets/js/texts-${language}.json`)
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("hello-header").textContent = data.introHeader
			document.getElementById("intro-text").textContent = data.introText

			document.getElementById("career-header").textContent = data.careerHeader
			var timelineString = ""
			for (index in data.experiences) {
				var experience = data.experiences[index]
				timelineString += `
				<li>
					<div class="panel">
						<p class="experience-date">${experience.date}</p>
						<div class="experience-content">
							<h3 class="subsection-title">${experience.name}</h3>
							<a href="${experience.link}" target="_blank">
								${experience.link}
							</a>
							<p>${experience.description}</p>
						</div>
					</div>
				</li>`
			}
			document.getElementById("timeline").innerHTML = timelineString

			document.getElementById("projects-header").textContent = data.projectsHeader
			var projectsString = ""
			for (index in data.projects) {
				var project = data.projects[index]
				projectsString += `
					<div class="col-6 col-12-medium">
						<span class="image fit"><img src="${project.image}" alt="" /></span>
						<h3 class="subsection-title">${project.name}</h3>
						<p><strong>${project.date}</strong></p>
						<p>${project.description}</p>
						<a href="${project.link}" target="_blank" class="store-button">
							${project.linkHTML}
						</a>
					</div>`
			}
			document.getElementById("projectsSection").innerHTML = projectsString
		})
}