import config from "../Config/config";

export default async function processRequest(
    url: string,
    args?: any,
    isBlob = false,
    passErrors = false,
    gotRefreshed = false
) {
    if (!args) {
        args = {};
    }
    const authToken = localStorage.getItem("authToken");
    if (authToken !== null) {
        args.headers = args.headers || {};
        args.headers["Authorization"] = `Bearer ${authToken}`;
        args.credentials = "include";
    }
    try {
        const res = await fetch(url, args);

        let data;
        if (isBlob) {
            data = await res.blob();
        } else {
            const isJson = res.headers
                .get("content-type")
                ?.includes("application/json");
            data = isJson ? await res.json() : null;
        }

        if (!res.ok) {
            if (!passErrors && res.status === 401) {
                throw new Error("Need to login!");
            }
            if (!passErrors && res.status === 403) {
                if (gotRefreshed) throw new Error("Need to login!");
                try {
                    await refreshToken();
                    return processRequest(url, args, isBlob, passErrors, true);
                } catch {
                    throw new Error("You have been logout, need to re-login!");
                }
            }
            const error = (data && data.message) || res.status;
            throw new Error(error);
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function refreshToken(): Promise<void> {
    const url = `${config.apiUrl}/auth/refresh`;
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        throw new Error("No auth token found");
    }
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Failed to refresh token");
    }
    const data = await res.json();
    localStorage.setItem("authToken", data.accessToken);
}
