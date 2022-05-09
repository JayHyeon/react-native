import SQLite from 'react-native-sqlite-storage';

const DB = SQLite.openDatabase(
    {
        name: 'MyPetDiary.db',
        location: 'default',
        createFromLocation: 1,
    },
    () => {},
    (error) => {
        console.log('에러발생: ', error);
    });
export {
    DB   
}