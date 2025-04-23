"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
// Enumération des types d'utilisateur
var UserType;
(function (UserType) {
    UserType[UserType["ADMIN"] = 1] = "ADMIN";
    UserType[UserType["MANAGER"] = 2] = "MANAGER";
    UserType[UserType["USER"] = 3] = "USER";
})(UserType || (exports.UserType = UserType = {}));
