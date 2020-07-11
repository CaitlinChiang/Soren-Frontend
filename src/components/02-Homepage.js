import React from 'react'
import { Link } from 'react-router-dom'


function Homepage() {
	return (
		<div>

			<section id="home">
				<div class="mainLogo"> <img src="/images/Soren_Logo.png" /> </div>

				<div class="desktopTitlePage">
					<h1>Quality. Style. Elegance.</h1>
				</div>

				<div class="mobileTitlePage">
					<h1>Quality.</h1>
					<h1>Style.</h1>
					<h1>Elegance.</h1>
				</div>
			</section>

			<section id="about">
				<div class="aboutTitle">
					<h1>ABOUT SOREN</h1>
				</div>

				<div class="aboutDescription">
					<p>Here at Soren, we grant people with a means to express their individuality, through providing high-quality clothing at a reasonable price.</p>
				</div>
			</section>

			<footer>&#169; 2020 by Soren.</footer>
		</div>
	)
}

export default Homepage