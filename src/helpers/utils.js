
// Converts client date to server date and vice versa
export const formatDate = (dt,  client=true)=> {
    if (dt instanceof Date){
        let year = dt.getFullYear();
        let month = ('0' + (dt.getMonth() + 1)).slice(-2);
        let day = ('0' + dt.getDate()).slice(-2);
        let hours = ('0' + dt.getHours()).slice(-2);
        let minutes = ('0' + dt.getMinutes()).slice(-2);
        let seconds = ('0' + dt.getSeconds()).slice(-2);

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
    if (!dt)
        return ""
    // Parse the input date string
    const inputDate = new Date(dt);

    // Options for formatting
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    // Format the date using options
    return inputDate.toLocaleDateString('en-US', options);
}

// Returns the currently logged-in user
export const getUser = ()=> {
    // let user =  localStorage.getItem('user')
    const user = {"active":true,"confirm":"123","country_id":{"created_at":"2024-02-02 11:39:05","id":"f635b065-6ada-4f9b-90fa-2796e0213402","name":"Cambodia","updated_at":"2024-02-02 11:39:05"},"created_at":"2024-11-26 12:32:25","email":"fylyheng@gmail.com","id":"ebe9a4c4-412c-49e4-b8c6-f9c6f56be245","name":"liza","phone":"011122221","updated_at":"2024-11-26 12:32:25"}
    return user
}

// Returns the initials of the current user i.e JG if the user's name is John Gaitho
export const getInitials = ()=> {
    const user = getUser()
    if (!user)
        return ""
    const name = user.name
    const names = name.split(' ');
    const firstLetters = names.map(word => word.charAt(0));
    const initials = firstLetters.slice(0, 2).join('');
    return initials.toUpperCase();
}

export const CloudinaryImage = (url, width=450)=>{
    // Loads minified version of a cloudinary image by applying width
    return `https://res.cloudinary.com/da3jmmlpj/image/upload/f_auto,c_limit,w_${width},q_auto/` + url.split('image/upload/')[1]
}