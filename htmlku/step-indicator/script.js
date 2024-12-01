"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const steps = new StepIndicator(".steps");
});
class StepIndicator {
    /**
     * @param el CSS selector of the step indicator element
     */
    constructor(el) {
        /** Number of steps */
        this.steps = 5;
        this._step = 0;
        this.el = document.querySelector(el);
        document.addEventListener("click", this.clickAction.bind(this));
        this.displayStep(this.step);
        this.checkExtremes();
    }
    get step() {
        return this._step;
    }
    set step(value) {
        this.displayStep(value);
        this._step = value;
        this.checkExtremes();
    }
    /**
     * @param e Click event
     */
    clickAction(e) {
        const button = e.target;
        const actionName = button === null || button === void 0 ? void 0 : button.getAttribute("data-action");
        if (actionName === "prev") {
            this.prev();
        }
        else if (actionName === "next") {
            this.next();
        }
    }
    /** Go to the previous step. */
    prev() {
        if (this.step > 0) {
            --this.step;
        }
    }
    /** Go to the next step. */
    next() {
        if (this.step < this.steps - 1) {
            ++this.step;
        }
    }
    /** Disable the Previous or Next button if hitting the first or last step. */
    checkExtremes() {
        const prevBtnEl = document.querySelector(`[data-action="prev"]`);
        const nextBtnEl = document.querySelector(`[data-action="next"]`);
        if (prevBtnEl) {
            prevBtnEl.disabled = this.step <= 0;
        }
        if (nextBtnEl) {
            nextBtnEl.disabled = this.step >= this.steps - 1;
        }
    }
    /**
     * Update the indicator for a targeted step.
     * @param targetStep Index of the step
     */
    displayStep(targetStep) {
        var _a;
        const current = "steps__step--current";
        const done = "steps__step--done";
        for (let s = 0; s < this.steps; ++s) {
            const stepEl = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-step="${s}"]`);
            stepEl === null || stepEl === void 0 ? void 0 : stepEl.classList.remove(current, done);
            if (s < targetStep) {
                stepEl === null || stepEl === void 0 ? void 0 : stepEl.classList.add(done);
            }
            else if (s === targetStep) {
                stepEl === null || stepEl === void 0 ? void 0 : stepEl.classList.add(current);
            }
        }
    }
}