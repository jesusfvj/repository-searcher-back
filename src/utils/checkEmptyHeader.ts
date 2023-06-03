export const extractToken = (authHeader: any): string | boolean => {
    const bearerRegex = /^Bearer\s+(.+)/;
    const match = bearerRegex.exec(authHeader);

    if (match && match[1]) {
        return true;
    }

    return false;
}