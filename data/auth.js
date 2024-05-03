let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$OtCzg5Ws.U5fnj5A6JJ4.ONJyupja8OtB..TwJqOy2M5C3LMk12oO',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJSRyel4MCk8BAbI6gT_j4DBTEIcY0WW4WWfoklymsWA&s'
    },
    {
        id: '2',
        username: 'banana',
        password: '$2b$10$OtCzg5Ws.U5fnj5A6JJ4.ONJyupja8OtB..TwJqOy2M5C3LMk12oO',
        name: '반하나',
        email: 'banana@banana.com',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJSRyel4MCk8BAbI6gT_j4DBTEIcY0WW4WWfoklymsWA&s'
    }
];
// 아이디(username) 중복검사
export async function findByUsername(username){
    return users.find((user) => user.username === username);
}
// id 중복검사
export async function findById(id){
    return users.find((user) => user.id === id);
}
export async function createUser(user){
    const created = {id:'10', ...user }
    users.push(created);
    return created.username;
}
export async function login(username){
    const user = users.find((user) => user.username === username)
    return user;
}


