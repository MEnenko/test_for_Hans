import mock from './mock';

const contacts = [
    {
        id: 1,
        first_name: "Alexandre",
        last_name: "Coveney",
        email: "acoveney0@delicious.com",
        telephone: "+49 193158 49"
    },
];

mock.onGet(/\/api\/c\/\d+\/customer\/\d+\/contact/).reply(200, {contacts});
mock.onPost(/\/api\/c\/\d+\/customer\/\d+\/contact/).reply(200, {contacts});
