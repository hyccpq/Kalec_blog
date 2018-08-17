export const scrollAnimate = (total, current) => {
	let detal = total - current
	let prew, curr
	
	return new Promise(resolve => {
		function render () {
			prew = document.documentElement.scrollTop
			curr = prew + (total - prew)/4
			document.documentElement.scrollTop = curr
			// console.log(document.documentElement.scrollTop, detal);
			if(document.documentElement.scrollTop !== prew && detal > 0 ? curr <= total : curr > total){
				
				window.requestAnimationFrame(render)
			} else {
				document.documentElement.scrollTop = total
				resolve(total)
			}
			
		}
		
		window.requestAnimationFrame(render)
	})
	
}

