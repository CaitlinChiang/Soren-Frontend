import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Client from './client'
import Admin from './admin'

function App() {
	return (
		<Router>
			<Route path="/" component={Client} />
			<Route path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ" component={Admin} />
		</Router>
	)
}

export default App