const api = 'http://localhost:4000/api';

 /* POST_LIST */
const Post = Object.freeze({   
    POST_LIST_GET: api + '/post/getData',
    POST_LIST_CREATE: api + '/post/insertData',
    POST_LIST_UPDATE: api + '/post/updateData/',
    POST_LIST_DELETE: api + '/post/deleteData/'
});

 /* NOTIFICATE_LIST */
const Notificate = Object.freeze({   
    NOTIFICATE_LIST_GET: api + '/noti/getData',
    NOTIFICATE_LIST_CREATE: api + '/noti/insertData',
    NOTIFICATE_LIST_UPDATE: api + '/noti/updateData/',
    NOTIFICATE_LIST_DELETE: api + '/noti/deleteData/'
});

 /* USER_LIST */
 const User = Object.freeze({   
    USER_INFO: api + '/user/login',
    USER_JOIN: api + '/user/join'
});

export {
    Post,
    Notificate,
    User
};