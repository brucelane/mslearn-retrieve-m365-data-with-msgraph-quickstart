async function displayUI() {
    await signIn();

    // Display info from user profile
    const user = await getUser();
    var userName = document.getElementById('userName');
    userName.innerText = user.id + user.displayName + user.lastPasswordChangeDateTime;
    console.log(user.displayName);
    // Hide login button and initial UI
    var signInButton = document.getElementById('signin');
    signInButton.style = "display: none";
    var content = document.getElementById('content');
    content.style = "display: block";
    var showPhotoButton = document.getElementById('showProfilePhoto');
    showPhotoButton.style = "display: block";
}
async function displayProfilePhoto() {
    // const userPwdDate = await getPwdDate();
    // if (userPwdDate) {
    //     console.log(userPwdDate);
    // }
     const userFiles = await getFiles();
     if (userFiles) {
         console.log(userFiles);
     }    
    const userPhoto = await getUserPhoto();
    if (!userPhoto) {
        return;
    }

    //convert blob to a local URL
    const urlObject = URL.createObjectURL(userPhoto);
    // show user photo  
    const userPhotoElement = document.getElementById('userPhoto');
    userPhotoElement.src = urlObject;
    var showPhotoButton = document.getElementById('showProfilePhoto');
    showPhotoButton.style = "display: none";
    var imgPhoto = document.getElementById('userPhoto');
    imgPhoto.style = "display: block";

}