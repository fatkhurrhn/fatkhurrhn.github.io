"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const pass = new PasswordForm("form");
});
class PasswordForm {
    /**
     * @param el CSS selector of the form
     */
    constructor(el) {
        var _a;
        /** Minimum password length */
        this.minLength = 6;
        this._invalid = false;
        this._message = "";
        this.el = document.querySelector(el);
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", this.validate.bind(this));
        this.minLengthDisplay();
    }
    get invalid() {
        return this._invalid;
    }
    set invalid(value) {
        this._invalid = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    /** Display the minimum characters required. */
    minLengthDisplay() {
        var _a;
        const reqEl = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("[data-req]");
        if (reqEl) {
            reqEl.textContent = `${this.minLength}`;
        }
    }
    /**
     * Check the input.
     * @param e Submit event
     */
    validate(e) {
        var _a, _b, _c, _d;
        e.preventDefault();
        this.invalid = ((_a = this.el) === null || _a === void 0 ? void 0 : _a.pass.value.length) < this.minLength;
        (_b = this.el) === null || _b === void 0 ? void 0 : _b.pass.setAttribute("aria-invalid", this.invalid);
        if (this.invalid) {
            this.message = Message.TooShort;
        }
        else {
            this.message = "";
            (_c = this.el) === null || _c === void 0 ? void 0 : _c.pass.blur();
        }
        const errorEl = (_d = this.el) === null || _d === void 0 ? void 0 : _d.querySelector("[data-error]");
        if (errorEl) {
            errorEl.textContent = this.message;
        }
    }
}
var Message;
(function (Message) {
    Message["TooShort"] = "Too short!";
})(Message || (Message = {}));