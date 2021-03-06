const api = 'http://localhost:4000/api';

 /* POST_LIST */
const Post = Object.freeze({   
    POST_LIST_GET: api + '/post/getData',
    POST_DETAIL_INFO: api + '/post/detail/',
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

/* CATEGORY_LIST */
const Category = Object.freeze({   
    CATEGORY_LIST: api + '/category/list',
    CATEGORY_ADD: api + '/category/add'
});

export {
    Post,
    Notificate,
    User,
    Category
};