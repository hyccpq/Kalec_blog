export const scrollAnimate = (total, current) => {
	let detal = total - current
	
	return new Promise(resolve => {
		let curr = current
		function render () {
			let diff = total - curr
			curr += diff / 3
			setScrollTop(curr)
			if(detal > 0 ? diff > 30 : diff < -30){
				
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

