/* Magic Mirror
 * Module: MMM-HTMLSnippet
 *
 * By ulrichwisser
 */

Module.register("MMM-HTMLSnippet", {

    start: function() {
        // send config to node helper
        this.sendSocketNotification("INIT", this.config)
    },

    scheduleUpdate: function(delay) {
        let self = this;
        let nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }
        if (nextLoad == 0) {
            return;
        }
        setTimeout(function() {
            self.updateDom();
            self.scheduleUpdate();
        }, nextLoad);
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.setAttribute("timestamp", new Date().getTime()); // make element unique so mm doesn't ignore our update

        if (!this.loaded) {
            wrapper.innerHTML = "Loading connections ...";
            wrapper.className = "dimmed light small";
            return wrapper;
        }

		// add html snippets
        for (var i = 0; i < this.config.frames.length; i++) {
            // initialize iframe
            var div = document.createElement("div")
            div.id = "HTMLSNIPPET-" + this.config.ident + "-" + i;
            div.className = "htmlsnippet module";
            div.style.width = this.config.width;
            div.style.height = this.config.height;
            div.style.border = "none";
            div.style.overflow = "hidden";
            div.style.backgroundColor = this.config.backgroundColor;
            div.style.color = this.config.color;
            div.scrolling = "no";

            div.innerHTML = this.config.frames[i].html;
            wrapper.appendChild(div);
        }
        // done
        return wrapper;
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

    socketNotificationReceived: function(notification, payload) {
        if (notification === "INIT_DONE") {
            this.loaded = true;
            this.updateDom(); // update page
            this.scheduleUpdate(); // start update schedule
        }
    }
})
