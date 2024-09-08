//API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES={
    loading:{
        title: 'Loading...',
        message:'Data is being Loaded, Please Wait'
    },
    success:{
        title:'Success',
        message:'Data successfully loaded.'
    },
    responseFailure:{
        title: 'Error',
        message:'An error occurred while fetching from server. Please try again.'
    },
    requestFailure:{
        title: 'Request Error',
        message:'There was an issue with your request.'
    },
    newtorkError:{
        title:'Error',
        message:'Unable to connect with the server. Please check internet connectivity and try again.'
    }
}

//API SERVICE CALL

export const SERVICE_URLS={
    userSignup:{url:'/signup', method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    uploadFile: {url:'/file/upload', method: 'POST'},
    createPost: {url:'create', method:'POST'},
    getAllPosts:{url:'/posts', method:'GET', params:true},
    getPostById:{url:'/post', method:'GET', query:true},
    updatePost:{url:'/update', method:'PUT', query:true},
    deletePost:{url:'delete', method:'DELETE', query:true},
    newComment:{url:'/comment/new', method: 'POST'},
    getAllComments:{url:'comments', method: 'GET', query:true},
    deleteComment:{url:'comment/delete', method: "DELETE", query:true}
}