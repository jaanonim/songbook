function saveToken(token: string) {
    localStorage.setItem("authToken", token);
}

function getToken(): string | null {
    return localStorage.getItem("authToken");
}

function clearToken() {
    localStorage.removeItem("authToken");
}

export { saveToken, getToken, clearToken };
