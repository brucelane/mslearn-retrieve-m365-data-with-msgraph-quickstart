// Create an authentication provider
const authProvider = {
    getAccessToken: async () => {
        // Call getToken in auth.js
        return await getToken();
    }
};
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
//Get user info from Graph
async function getUser() {
    ensureScope('user.read');
    return await graphClient
        .api('/me')
        .select('id,displayName,lastPasswordChangeDateTime')
        .get();
}
async function getUserPhoto() {
    ensureScope('user.readbasic.all'); 
     return await graphClient  
         .api('/me/photo/$value')  
         .get(); 
 } 
 async function getPwdDate() {
    ensureScope('user.readbasic.all'); 
     return await graphClient  
         .api('/me/$lastPasswordChangeDateTime')  
         .get(); 
 }
 async function getFiles() {
    ensureScope('files.read'); 
     return await graphClient  
         .api('/me/drive/root/children')  
         .get(); 
 }  
