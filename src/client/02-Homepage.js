import React from 'react'
import '../client_css/02-Homepage.css'

function Homepage() {
	return (
		<div>
			<section id="home">
				<div class="homeLogo"> 
					<img src="/images/logo.png" /> 
				</div>

				<div class="homeTitle">
					<h1><span>Quality.</span> <span>Style.</span> <span>Elegance.</span></h1>
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