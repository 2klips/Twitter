let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$SwtnnOxWHHbmvMWx3E3oHugUTBQp5sfhOHJreTifnv6LVhcBhrcQ6',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://img.hankyung.com/photo/202403/AA.36104679.1.jpg'
    },
];



export async function createUser(username, password, name, email) {
    const user = {
        id: '10',
        username,
        password,
        name,
        email,
        url: 'https://www.sisajournal.com/news/photo/202105/216731_124666_4150.jpg'
    }
    users = [user, ...users]
    return users;
}

export async function login(username){
    const user = users.find((user) => user.username === username)
    return user;
}



