/* Magic Mirror
* Module: MMM-HTMLSnippet
*
* By ulrichwisser
*/

Module.register("MMM-HTMLSnippet",{
	defaults: {
		html: "",
	},

	start: function() {
		let self = this;

		// send config to node helper
		this.sendSocketNotification("INIT", this.config)

		// Schedule update timer.
		this.scheduleUpdate(2000);
	},

	scheduleUpdate: function(delay) {
		let self = this
		let nextLoad = self.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		setTimeout(function() {
			self.updateDom();
			self.scheduleUpdate();
		}, nextLoad);
	},

	getDom: function() {
		let self = this
		var wrapper = document.createElement("div")
		wrapper.id = "HTMLSNIPPET-" + self.config.ident 
		wrapper.className = "htmlsnippet module"
		wrapper.style.width = self.config.width
		wrapper.style.height = self.config.height
		wrapper.style.border = "none"
		wrapper.style.display = "block"
		wrapper.style.overflow = "hidden"
		wrapper.style.margin = "0"
		wrapper.style.backgroundColor = self.config.backgroundColor
		wrapper.style.color = self.config.color
		wrapper.scrolling = "no"
		wrapper.innerHTML = self.config.html

		return wrapper
	},

	suspend: function() {
		var doms = document.getElementsByClassName("htmlsnippet")
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "none"
			}
		}
	},

	resume: function() {
		var doms = document.getElementsByClassName("htmlsnippet")
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "block"
			}
		}
	},

}
)
