//MSAL configuration
const msalConfig = {
    auth: {
        // live reactspa         
        //clientId: '141b84eb-947e-444b-ad7c-1ab68b24287',
        // graphsingletenant 
        //clientId: 'b6c0b527-b06f-4518-be8d-db7c546f73c',
        // casa
        clientId: 'cb9789d8-4496-4b9d-aaec-6a0eabf328e',
        // comment out if you use a multi-tenant AAD app 
        // https://login.microsoftonline.com/<your directory ID here>
        authority: 'https://login.microsoftonline.com/6c206ed4-984a-4473-993a-fc0b856b265',
        redirectUri: 'http://localhost:8080'
    }
};
const msalRequest = { scopes: [] };
function ensureScope (scope) {
    if (!msalRequest.scopes.some((s) => s.toLowerCase() === scope.toLowerCase())) {
        msalRequest.scopes.push(scope);
    }
}
//Initialize MSAL client
const msalClient = new msal.PublicClientApplication(msalConfig);

// Log the user in
async function signIn() {
    const authResult = await msalClient.loginPopup(msalRequest);
    sessionStorage.setItem('msalAccount', authResult.account.username);
}
//Get token from Graph
async function getToken() {
    let account = sessionStorage.getItem('msalAccount');
    if (!account) {
        throw new Error(
            'User info cleared from session. Please sign out and sign in again.');
    }
    try {
        // First, attempt to get the token silently
        const silentRequest = {
            scopes: msalRequest.scopes,
            account: msalClient.getAccountByUsername(account)
        };

        const silentResult = await msalClient.acquireTokenSilent(silentRequest);
        return silentResult.accessToken;
    } catch (silentError) {
        // If silent requests fails with InteractionRequiredAuthError,
        // attempt to get the token interactively
        if (silentError instanceof msal.InteractionRequiredAuthError) {
            const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
            return interactiveResult.accessToken;
        } else {
            throw silentError;
        }
    }
}
