const SPEEDS = 120

export const scrollAnimate = (total, current) => {
	let detal = total - current
    let currentSpeed, targetLocationDeviation
    let direction = detal > 0
	if(direction) {
	    currentSpeed = SPEEDS
        targetLocationDeviation = total - SPEEDS
    } else {
	    currentSpeed = -SPEEDS
        targetLocationDeviation = total + SPEEDS
    }

	return new Promise(resolve => {
		let curr = current
		function render () {
			curr += currentSpeed
			setScrollTop(curr)
			if(direction ? curr < targetLocationDeviation : curr > targetLocationDeviation){

				window.requestAnimationFrame(render)
			} else {
				// document.body.scrollTop = total
				setScrollTop(total)
				resolve(total)
			}

		}

		render();

		function setScrollTop (curr) {
			if(document.body.scrollTop) {
				document.body.scrollTop = curr
			} else {
				document.documentElement.scrollTop = curr
			}
		}
	})

}

